package user

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"-"`
	Role      string `json:"role"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
	DeletedAt string `json:"deleted_at"`
}

type Role string

const (
	RoleAdmin  Role = "admin"
	RoleEditor Role = "editor"
	RoleViewer Role = "viewer"
)

func NewUser(username string, email string, password string, role Role) (*User, error) {
	if username == "" {
		return nil, errors.New("username cannot be empty")
	}

	if email == "" {
		return nil, errors.New("email cannot be empty")
	}

	if password == "" {
		return nil, errors.New("password cannot be empty")
	}

	if len(password) < 8 {
		return nil, errors.New("password must be at least 8 characters")
	}

	user := &User{
		Username: username,
		Password: password,
		Email:    email,
		Role:     string(role),
	}

	if err := user.HashPassword(); err != nil {
		return nil, err
	}

	return user, nil
}

func (u *User) isAdmin() bool {
	return u.Role == string(RoleAdmin)
}

func (u *User) isEditor() bool {
	return u.Role == string(RoleEditor)
}

func (u *User) isViewer() bool {
	return u.Role == string(RoleViewer)
}

func (u *User) HashPassword() error {
	if u.Password == "" {
		return errors.New("password cannot be empty")
	}

	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	u.Password = string(hashedBytes)
	return nil
}
