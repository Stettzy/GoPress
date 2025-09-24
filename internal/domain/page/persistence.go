package page

import (
	"context"
	"database/sql"
)

type Persistence struct {
	db *sql.DB
}

func NewPersistence(db *sql.DB) *Persistence {
	return &Persistence{db: db}
}

func (p *Persistence) Create(ctx context.Context, page *Page) error {
	query := `INSERT INTO pages (title, slug, content, author_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`
	_, err := p.db.ExecContext(ctx, query, page.Title, page.Slug, page.Content, page.AuthorID, page.CreatedAt, page.UpdatedAt)
	return err
}

func (p *Persistence) Update(ctx context.Context, page *Page) error {
	query := `UPDATE pages SET title = ?, slug = ?, content = ?, author_id = ?, updated_at = ? WHERE id = ?`
	_, err := p.db.ExecContext(ctx, query, page.Title, page.Slug, page.Content, page.AuthorID, page.UpdatedAt, page.ID)
	return err
}

func (p *Persistence) Delete(ctx context.Context, id int) error {
	query := `DELETE FROM pages WHERE id = ?`
	_, err := p.db.ExecContext(ctx, query, id)
	return err
}

func (p *Persistence) FindById(ctx context.Context, id int) (*Page, error) {
	query := `SELECT title, slug, content, author_id, created_at, updated_at FROM pages WHERE id = ?`
	var page Page
	err := p.db.QueryRowContext(ctx, query, id).Scan(&page.Title, &page.Slug, &page.Content, &page.AuthorID, &page.CreatedAt, &page.UpdatedAt)
	return &page, err
}

func (p *Persistence) GetAll(ctx context.Context) ([]*Page, error) {
	query := `SELECT title, slug, content, author_id, created_at, updated_at FROM pages`
	rows, err := p.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var pages []*Page
	for rows.Next() {
		var page Page
		err := rows.Scan(&page.Title, &page.Slug, &page.Content, &page.AuthorID, &page.CreatedAt, &page.UpdatedAt)
		if err != nil {
			return nil, err
		}

		pages = append(pages, &page)
	}

	return pages, nil
}

func (p *Persistence) FindBySlug(ctx context.Context, slug string) (*Page, error) {
	query := `SELECT title, slug, content, author_id, created_at, updated_at FROM pages WHERE slug = ?`
	var page Page
	err := p.db.QueryRowContext(ctx, query, slug).Scan(&page.Title, &page.Slug, &page.Content, &page.AuthorID, &page.CreatedAt, &page.UpdatedAt)
	return &page, err
}
