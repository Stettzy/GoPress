package routes

import (
	"net/http"

	"github.com/Stettzy/GoPress/internal/api/handlers"
)

func setupAuthRoutes(r *http.ServeMux, handlers *handlers.Handlers) *http.ServeMux {
	// Login
	r.Handle("POST /api/auth/login", http.HandlerFunc(handlers.AuthHandler.Login))
	// Logout
	r.Handle("POST /api/auth/logout", http.HandlerFunc(handlers.AuthHandler.Logout))

	return r
}
