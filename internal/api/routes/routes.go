package routes

import (
	"net/http"

	"github.com/Stettzy/GoPress/internal/api/handlers"
	"github.com/Stettzy/GoPress/internal/api/middleware"
)

func SetupRoutes(handlers *handlers.Handlers, authMiddleware *middleware.AuthMiddleware) *http.ServeMux {
	r := http.NewServeMux()
	// Auth
	r = setupAuthRoutes(r, handlers)
	// Users
	r = setupUsersRoutes(r, handlers, authMiddleware)
	// Articles
	r = setupArticlesRoutes(r, handlers, authMiddleware)
	return r
}
