package article

import "context"

type Repository interface {
	// Articles operations
	Create(ctx context.Context, article *Article) error
	Update(ctx context.Context, article *Article, categoryIds []int, tagIds []int) error
	Delete(ctx context.Context, articleId int) error
	AssignToAuthor(ctx context.Context, id int, authorId int) error
	FindByID(ctx context.Context, id int) (*Article, error)
	GetAll(ctx context.Context) ([]*Article, error)
	AddTagToArticle(ctx context.Context, articleId int, tagId int) error
	RemoveTagFromArticle(ctx context.Context, articleId int, tagId int) error
	AddArticleToCategory(ctx context.Context, articleId int, categoryId int) error
	// Tags operations
	CreateTag(ctx context.Context, tag *Tag) error
	UpdateTag(ctx context.Context, tag *Tag) error
	DeleteTag(ctx context.Context, id int) error
	// Categories operations
	CreateCategory(ctx context.Context, category *Category) error
	UpdateCategory(ctx context.Context, category *Category) error
	DeleteCategory(ctx context.Context, id string) error
}
