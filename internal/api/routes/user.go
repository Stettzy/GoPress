package routes

import (
	"net/http"

	"github.com/Stettzy/GoPress/internal/api/handlers"
	"github.com/Stettzy/GoPress/internal/api/middleware"
	"github.com/Stettzy/GoPress/internal/domain/user"
)

func setupUsersRoutes(r *http.ServeMux, handlers *handlers.Handlers, authMiddleware *middleware.AuthMiddleware) *http.ServeMux {
	// Create
	r.Handle("POST /api/users", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanCreateUsers() })(
			http.HandlerFunc(handlers.UserHandler.Create))))
	// Update
	r.Handle("PUT /api/users/{id}", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanEditUsers() })(
			http.HandlerFunc(handlers.UserHandler.Update))))
	// Delete
	r.Handle("DELETE /api/users/{id}", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanDeleteUsers() })(
			http.HandlerFunc(handlers.UserHandler.Delete))))
	// Find by id
	r.Handle("GET /api/users/{id}", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanReadUsers() })(
			http.HandlerFunc(handlers.UserHandler.FindById))))
	// Get all
	r.Handle("GET /api/users", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanReadUsers() })(
			http.HandlerFunc(handlers.UserHandler.GetAll))))

	return r
}
