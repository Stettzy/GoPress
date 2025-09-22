package routes

import (
	"net/http"

	"github.com/Stettzy/GoPress/internal/api/handlers"
	"github.com/Stettzy/GoPress/internal/api/middleware"
	"github.com/Stettzy/GoPress/internal/domain/user"
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

func setupAuthRoutes(r *http.ServeMux, handlers *handlers.Handlers) *http.ServeMux {
	// Login
	r.Handle("POST /api/auth/login", http.HandlerFunc(handlers.AuthHandler.Login))
	// Logout
	r.Handle("POST /api/auth/logout", http.HandlerFunc(handlers.AuthHandler.Logout))

	return r
}

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

func setupArticlesRoutes(r *http.ServeMux, handlers *handlers.Handlers, authMiddleware *middleware.AuthMiddleware) *http.ServeMux {
	// Create
	r.Handle("POST /api/articles", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanCreateArticles() })(
			http.HandlerFunc(handlers.ArticleHandler.Create))))
	// Update
	r.Handle("PUT /api/articles/{id}", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanEditArticles() })(
			http.HandlerFunc(handlers.ArticleHandler.Update))))
	// Delete
	r.Handle("DELETE /api/articles/{id}", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanDeleteArticles() })(
			http.HandlerFunc(handlers.ArticleHandler.Delete))))
	// Find by id
	r.Handle("GET /api/articles/{id}", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanReadArticles() })(
			http.HandlerFunc(handlers.ArticleHandler.FindById))))
	// Get all
	r.Handle("GET /api/articles", authMiddleware.Middleware()(
		authMiddleware.RequirePermission(func(u *user.User) bool { return u.CanReadArticles() })(
			http.HandlerFunc(handlers.ArticleHandler.GetAll))))

	return r
}
