package page

import "time"

type Page struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Slug      string    `json:"slug"`
	Content   string    `json:"content"`
	AuthorID  int       `json:"author_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func NewPage(title, slug, content string, authorId int) *Page {
	return &Page{
		Title:     title,
		Slug:      slug,
		Content:   content,
		AuthorID:  authorId,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}
