package handlers

import (
	"encoding/json"
	"github.com/Stettzy/GoPress/internal/domain/article"
	"net/http"
)

type ArticleHandler struct {
	articleService article.Service
}

func NewArticleHandler(as article.Service) *ArticleHandler {
	return &ArticleHandler{articleService: as}
}

func (h *ArticleHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Title string `json:"title"`
		Body  string `json:"body"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_ = h.articleService.CreateArticle(r.Context(), req.Title, req.Body)

	return
}
