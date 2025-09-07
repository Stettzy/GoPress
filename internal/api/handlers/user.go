package handlers

import (
	"encoding/json"
	"github.com/Stettzy/GoPress/internal/domain/user"
	"net/http"
)

type UserHandler struct {
	userService *user.Service
}

func NewUserHandler(us *user.Service) *UserHandler {
	return &UserHandler{us}
}

func (h *UserHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Username string    `json:"username"`
		Email    string    `json:"email"`
		Password string    `json:"password"`
		Role     user.Role `json:"role"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = h.userService.CreateUser(r.Context(), req.Username, req.Email, req.Password, req.Role)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
