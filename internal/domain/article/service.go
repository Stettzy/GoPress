package article

import (
	"context"
	"time"
)

type Service struct {
	repo Repository
}

func NewService(r Repository) *Service {
	return &Service{repo: r}
}

func (s *Service) Create(ctx context.Context, title, body string) error {
	authorId := ctx.Value("user_id").(int)
	article := NewArticle(title, body, authorId)
	return s.repo.Create(ctx, article)
}

func (s *Service) Update(ctx context.Context, id int, title string, tagIds []int, categoryIds []int, body string) error {
	article, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}

	article.Title = title
	article.Body = body
	article.UpdatedAt = time.Now()

	return s.repo.Update(ctx, article, categoryIds, tagIds)
}

func (s *Service) Delete(ctx context.Context, id int) error {
	return s.repo.Delete(ctx, id)
}

func (s *Service) FindById(ctx context.Context, id int) (*Article, error) {
	return s.repo.FindByID(ctx, id)
}

func (s *Service) GetAll(ctx context.Context) ([]*Article, error) {
	return s.repo.GetAll(ctx)
}
