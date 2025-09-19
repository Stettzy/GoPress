package authorization

type ArticleAuthorization interface {
	CanReadArticles() bool
	CanCreateArticles() bool
	CanEditArticles() bool
	CanDeleteArticles() bool
}

type UserAuthorization interface {
	CanReadUsers() bool
	CanCreateUsers() bool
	CanEditUsers() bool
	CanDeleteUsers() bool
}

type CategoryAuthorization interface {
	CanReadCategories() bool
	CanCreateCategories() bool
	CanEditCategories() bool
	CanDeleteCategories() bool
}

type TagAuthorization interface {
	CanReadTags() bool
	CanCreateTags() bool
	CanEditTags() bool
	CanDeleteTags() bool
}
