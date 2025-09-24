package routes

import (
	"net/http"

	"github.com/Stettzy/GoPress/internal/api/handlers"
	"github.com/Stettzy/GoPress/internal/api/middleware"
	"github.com/Stettzy/GoPress/internal/domain/user"
)

func setupPagesRoutes(r *http.ServeMux, handlers *handlers.Handlers, authMiddleware *middleware.AuthMiddleware) *http.ServeMux {
	// Create
	r.Handle("POST /api/pages", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanCreatePages() })(
			http.HandlerFunc(handlers.PageHandler.Create))))
	// Update
	r.Handle("PUT /api/pages/{id}", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanEditPages() })(
			http.HandlerFunc(handlers.PageHandler.Update))))
	// Delete
	r.Handle("DELETE /api/pages/{id}", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanDeletePages() })(
			http.HandlerFunc(handlers.PageHandler.Delete))))
	// Find by id
	r.Handle("GET /api/pages/{id}", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanReadPages() })(
			http.HandlerFunc(handlers.PageHandler.FindById))))
	// Get all
	r.Handle("GET /api/pages", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanReadPages() })(
			http.HandlerFunc(handlers.PageHandler.GetAll))))

	return r
}
