package article

import (
	"errors"
)

type Category struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Slug string `json:"slug"`
}

func NewCategory(name, slug string) (*Category, error) {
	if name == "" {
		return nil, errors.New("category name cannot be empty")
	}
	if slug == "" {
		return nil, errors.New("category slug cannot be empty")
	}

	return &Category{
		Name: name,
		Slug: slug,
	}, nil
}
