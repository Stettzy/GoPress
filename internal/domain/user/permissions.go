package user

func (u *User) CanReadArticles() bool {
	return u.isAdmin() || u.isEditor() || u.isViewer()
}

func (u *User) CanCreateArticles() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanEditArticles() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanDeleteArticles() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanReadUsers() bool {
	return u.isAdmin() || u.isEditor() || u.isViewer()
}

func (u *User) CanCreateUsers() bool {
	return u.isAdmin()
}

func (u *User) CanEditUsers() bool {
	return u.isAdmin()
}

func (u *User) CanDeleteUsers() bool {
	return u.isAdmin()
}

func (u *User) CanReadCategories() bool {
	return u.isAdmin() || u.isEditor() || u.isViewer()
}

func (u *User) CanCreateCategories() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanEditCategories() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanDeleteCategories() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanReadTags() bool {
	return u.isAdmin() || u.isEditor() || u.isViewer()
}

func (u *User) CanCreateTags() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanEditTags() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanDeleteTags() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanReadPages() bool {
	return u.isAdmin() || u.isEditor() || u.isViewer()
}

func (u *User) CanCreatePages() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanEditPages() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanDeletePages() bool {
	return u.isAdmin() || u.isEditor()
}

func (u *User) CanReadPageBySlug() bool {
	return u.isAdmin() || u.isEditor() || u.isViewer()
}
