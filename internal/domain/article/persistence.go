package article

import (
	"context"
	"database/sql"
)

type Executor interface {
	ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error)
	QueryContext(ctx context.Context, query string, args ...interface{}) (*sql.Rows, error)
	QueryRowContext(ctx context.Context, query string, args ...interface{}) *sql.Row
}

type Persistence struct {
	db *sql.DB
}

func NewPersistence(db *sql.DB) *Persistence {
	return &Persistence{db: db}
}

/* **** Articles operations **** */

func (p *Persistence) Create(ctx context.Context, article *Article) error {
	query := `INSERT INTO articles (title, body, author_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)`
	_, err := p.db.ExecContext(ctx, query, article.Title, article.Body, article.AuthorID, article.CreatedAt, article.UpdatedAt)
	return err
}

func (p *Persistence) Update(ctx context.Context, article *Article, categoryIds []int, tagIds []int) error {
	tx, err := p.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	query := `UPDATE articles SET title = $1, body = $2, author_id = $3, updated_at = $4 WHERE id = $5`
	_, err = tx.ExecContext(ctx, query,
		article.Title, article.Body, article.AuthorID, article.UpdatedAt, article.ID)
	if err != nil {
		return err
	}

	// Remove existing categories for the article
	_, err = tx.ExecContext(ctx, `DELETE FROM article_categories WHERE article_id = $1`, article.ID)
	if err != nil {
		return err
	}

	// Remove existing tags for the article
	_, err = tx.ExecContext(ctx, `DELETE FROM article_tags WHERE article_id = $1`, article.ID)
	if err != nil {
		return err
	}

	// Add new categories for the article
	for _, categoryId := range categoryIds {
		err = p.AddArticleToCategory(ctx, article.ID, categoryId)
		if err != nil {
			return err
		}
	}

	// Add new tags for the article
	for _, tagID := range tagIds {
		err = p.addTagToArticle(ctx, tx, article.ID, tagID)
		if err != nil {
			return err
		}
	}

	return tx.Commit()
}

func (p *Persistence) Delete(ctx context.Context, articleId int) error {
	query := `DELETE FROM articles WHERE id = $1`
	_, err := p.db.ExecContext(ctx, query, articleId)
	return err
}

func (p *Persistence) AssignToAuthor(ctx context.Context, id, authorId int) error {
	query := `UPDATE articles SET author_id = $1 WHERE id = $2`
	_, err := p.db.ExecContext(ctx, query, authorId, id)
	return err
}

func (p *Persistence) FindByID(ctx context.Context, id int) (*Article, error) {
	query := `SELECT title, body, author_id, created_at, updated_at FROM articles WHERE id = $1`

	var article Article

	err := p.db.QueryRowContext(ctx, query, id).Scan(&article.Title, &article.Body, &article.Author.ID, &article.CreatedAt, &article.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return &article, nil
}

func (p *Persistence) GetAll(ctx context.Context) ([]*Article, error) {
	query := `SELECT id, title, body, author_id, created_at, updated_at FROM articles`

	rows, err := p.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var articles []*Article

	for rows.Next() {
		var article Article

		err := rows.Scan(&article.ID, &article.Title, &article.Body, &article.AuthorID, &article.CreatedAt, &article.UpdatedAt)
		if err != nil {
			return nil, err
		}

		articles = append(articles, &article)
	}

	return articles, nil
}

func (p *Persistence) addTagToArticle(ctx context.Context, exec Executor, articleID, tagId int) error {
	query := `INSERT INTO article_tags (article_id, tag_id) VALUES ($1, $2)`
	_, err := exec.ExecContext(ctx, query, articleID, tagId)
	return err
}

func (p *Persistence) RemoveTagFromArticle(ctx context.Context, articleId int, tagId int) error {
	query := `DELETE FROM article_tags WHERE tag_id = $1 AND article_id = $2`
	_, err := p.db.ExecContext(ctx, query, tagId, articleId)
	return err
}

func (p *Persistence) AddArticleToCategory(ctx context.Context, articleId int, categoryId int) error {
	query := `INSERT INTO article_categories (article_id, category_id) VALUES ($1, $2)`
	_, err := p.db.ExecContext(ctx, query, articleId, categoryId)
	return err
}

func (p *Persistence) RemoveCategoryFromArticle(ctx context.Context, articleId int, categoryId int) error {
	query := `DELETE FROM article_categories WHERE category_id = $1 AND article_id = $2`
	_, err := p.db.ExecContext(ctx, query, categoryId, articleId)
	return err
}

/* **** Tags operations **** */

func (p *Persistence) CreateTag(ctx context.Context, tag *Tag) error {
	query := `INSERT INTO tags ('name', 'slug') VALUES ($1, $2)`
	_, err := p.db.ExecContext(ctx, query, tag.Name, tag.Slug)
	return err
}

func (p *Persistence) UpdateTag(ctx context.Context, tag *Tag) error {
	query := `UPDATE tags SET name = $1, slug = $2 WHERE id=$3`
	_, err := p.db.ExecContext(ctx, query, tag.Name, tag.Slug, tag.ID)
	return err
}

func (p *Persistence) DeleteTag(ctx context.Context, id int) error {
	query := `DELETE FROM tags WHERE id = $1`
	_, err := p.db.ExecContext(ctx, query, id)
	return err
}

/* **** Categories operations **** */

func (p *Persistence) CreateCategory(ctx context.Context, category *Category) error {
	query := `INSERT INTO categories (name, slug) VALUES ($1, $2)`
	_, err := p.db.ExecContext(ctx, query, category.Name, category.Slug)
	return err
}

func (p *Persistence) UpdateCategory(ctx context.Context, category *Category) error {
	query := `UPDATE categories SET name = $1, slug = $2 WHERE id=$3`
	_, err := p.db.ExecContext(ctx, query, category.Name, category.Slug, category.ID)
	return err
}

func (p *Persistence) DeleteCategory(ctx context.Context, category *Category) error {
	query := `DELETE FROM categories WHERE id = $1`
	_, err := p.db.ExecContext(ctx, query, category.ID)
	return err
}
