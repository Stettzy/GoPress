package middleware

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/Stettzy/GoPress/internal/domain/user"
)

type contextKey string

const UserContextKey contextKey = "user"

type AuthMiddleware struct {
	userService *user.Service
	jwtSecret   string
}

func NewAuthMiddleware(us *user.Service, jwtSecret string) *AuthMiddleware {
	return &AuthMiddleware{userService: us, jwtSecret: jwtSecret}
}

func (a *AuthMiddleware) Middleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			token := r.Header.Get("Authorization")
			if token == "" {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			user, err := a.GetUserByToken(r.Context(), token)
			if err != nil {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), UserContextKey, user)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func GetUserFromContext(ctx context.Context) (*user.User, error) {
	user, ok := ctx.Value(UserContextKey).(*user.User)
	if !ok || user == nil {
		return nil, errors.New("user in context not found")
	}
	return user, nil
}

func (a *AuthMiddleware) GetUserByToken(ctx context.Context, token string) (*user.User, error) {
	token = strings.TrimPrefix(token, "Bearer ")

	claims, err := a.DecodeJWT(token)
	if err != nil {
		return nil, err
	}

	userId, ok := claims["userId"].(float64)
	if !ok {
		return nil, errors.New("invalid token")
	}

	userIdInt := int(userId)

	user, err := a.userService.FindById(ctx, userIdInt)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (a *AuthMiddleware) DecodeJWT(token string) (map[string]interface{}, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, errors.New("invalid token")
	}

	payload, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, err
	}

	var claims map[string]interface{}
	if err := json.Unmarshal(payload, &claims); err != nil {
		return nil, err
	}

	if !a.VerifyJWT(parts[0], parts[1], parts[2]) {
		return nil, errors.New("invalid token")
	}

	if expiresAt, ok := claims["exp"].(float64); ok && time.Now().Unix() > int64(expiresAt) {
		return nil, errors.New("token expired")
	}

	return claims, nil
}

func (a *AuthMiddleware) VerifyJWT(header, payload, signature string) bool {
	h := hmac.New(sha256.New, []byte(a.jwtSecret))
	h.Write([]byte(header + "." + payload))
	expectedSignature := base64.RawURLEncoding.EncodeToString(h.Sum(nil))

	return hmac.Equal([]byte(expectedSignature), []byte(signature))
}

func CreateJWT(userId int, role string, secret string) (string, error) {
	header := map[string]interface{}{
		"alg": "HS256",
		"typ": "JWT",
	}

	payload := map[string]interface{}{
		"userId": userId,
		"role":   role,
		"exp":    time.Now().Add(time.Hour * 24).Unix(),
		"iat":    time.Now().Unix(),
	}

	headerJSON, _ := json.Marshal(header)
	headerBase64 := base64.RawURLEncoding.EncodeToString(headerJSON)

	payloadJSON, _ := json.Marshal(payload)
	payloadBase64 := base64.RawURLEncoding.EncodeToString(payloadJSON)

	signature := hmac.New(sha256.New, []byte(secret))
	signature.Write([]byte(headerBase64 + "." + payloadBase64))
	signatureString := base64.RawURLEncoding.EncodeToString(signature.Sum(nil))

	return headerBase64 + "." + payloadBase64 + "." + signatureString, nil
}
