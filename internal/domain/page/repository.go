package page

import "context"

type Repository interface {
	Create(ctx context.Context, page *Page) error
	Update(ctx context.Context, page *Page) error
	Delete(ctx context.Context, id int) error
	FindById(ctx context.Context, id int) (*Page, error)
	GetAll(ctx context.Context) ([]*Page, error)
	FindBySlug(ctx context.Context, slug string) (*Page, error)
}
