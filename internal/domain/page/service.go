package page

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

func (s *Service) Create(ctx context.Context, title, slug, content string, authorId int) error {
	page := NewPage(title, slug, content, authorId)
	return s.repo.Create(ctx, page)
}

func (s *Service) Update(ctx context.Context, id int, title, slug, content string) error {
	page, err := s.repo.FindById(ctx, id)
	if err != nil {
		return err
	}

	authorId := ctx.Value("user_id").(int)

	page.Title = title
	page.Slug = slug
	page.Content = content
	page.UpdatedAt = time.Now()
	page.AuthorID = authorId

	return s.repo.Update(ctx, page)
}

func (s *Service) Delete(ctx context.Context, id int) error {
	return s.repo.Delete(ctx, id)
}

func (s *Service) FindById(ctx context.Context, id int) (*Page, error) {
	return s.repo.FindById(ctx, id)
}

func (s *Service) GetAll(ctx context.Context) ([]*Page, error) {
	return s.repo.GetAll(ctx)
}

func (s *Service) FindBySlug(ctx context.Context, slug string) (*Page, error) {
	return s.repo.FindBySlug(ctx, slug)
}
