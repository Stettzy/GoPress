package article

import (
	"context"
	"errors"
)

type Tag struct {
	ID   int    `json:"id"`
	Name string `json:"title"`
	Slug string `json:"slug"`
}

func NewTag(ctx context.Context, name string, slug string) (*Tag, error) {
	if slug == "" {
		return nil, errors.New("slug is required")
	}

	if name == "" {
		return nil, errors.New("name is required")
	}

	return &Tag{
		Name: name,
		Slug: slug,
	}, nil
}
