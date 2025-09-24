package routes

import (
	"net/http"

	"github.com/Stettzy/GoPress/internal/api/handlers"
	"github.com/Stettzy/GoPress/internal/api/middleware"
	"github.com/Stettzy/GoPress/internal/domain/user"
)

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
