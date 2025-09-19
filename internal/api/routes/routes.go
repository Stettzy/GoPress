package routes

import (
	"net/http"

	"github.com/Stettzy/GoPress/internal/api/handlers"
	"github.com/Stettzy/GoPress/internal/api/middleware"
)

func SetupRoutes(handlers *handlers.Handlers, authMiddleware *middleware.AuthMiddleware) *http.ServeMux {
	r := http.NewServeMux()

	// Setup
	r.HandleFunc("POST /api/config/database", handlers.ConfigHandler.SetupDatabaseConnection)

	// Users
	r.Handle("POST /api/users", authMiddleware.Middleware()(http.HandlerFunc(handlers.UserHandler.Create)))
	r.Handle("PUT /api/users/:id", authMiddleware.Middleware()(http.HandlerFunc(handlers.UserHandler.Update)))
	r.Handle("DELETE /api/users/:id", authMiddleware.Middleware()(http.HandlerFunc(handlers.UserHandler.Delete)))
	r.Handle("GET /api/users/:id", authMiddleware.Middleware()(http.HandlerFunc(handlers.UserHandler.FindById)))
	r.Handle("GET /api/users", authMiddleware.Middleware()(http.HandlerFunc(handlers.UserHandler.GetAll)))

	// Articles

	return r
}
