package article

import (
	"context"
	"time"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) CreateArticle(ctx context.Context, title, body string) error {
	authorId := ctx.Value("user_id").(int)
	article := NewArticle(title, body, authorId)
	return s.repo.Create(ctx, article)
}

func (s *Service) UpdateArticle(ctx context.Context, id int, title string, tagIds []int, categoryIds []int, body string) error {
	article, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}

	article.Title = title
	article.Body = body
	article.UpdatedAt = time.Now()

	return s.repo.Update(ctx, article, categoryIds, tagIds)
}
