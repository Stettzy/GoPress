package article

import (
	"errors"
	"github.com/Stettzy/GoPress/internal/domain/user"
	"time"
)

type Article struct {
	ID          int        `json:"id"`
	Title       string     `json:"title"`
	Body        string     `json:"body"`
	Author      user.User  `json:"author"`
	AuthorID    int        `json:"author_id"`
	Categories  []Category `json:"category"`
	Tags        []Tag      `json:"tags"`
	PublishedAt *time.Time `json:"published_at"`
	Revisions   int        `json:"revisions"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

func (a *Article) Publish() error {
	if a.PublishedAt != nil {
		return errors.New("already published")
	}

	timeNow := time.Now()

	a.PublishedAt = &timeNow
	a.UpdatedAt = timeNow

	return nil
}

func NewArticle(title, body string, authorId int) *Article {
	return &Article{
		Title:     title,
		Body:      body,
		AuthorID:  authorId,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}
