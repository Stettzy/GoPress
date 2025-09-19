package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Stettzy/GoPress/internal/domain/article"
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

	err = h.articleService.CreateArticle(r.Context(), req.Title, req.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Article created successfully"))
}
