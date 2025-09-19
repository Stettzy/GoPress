package handlers

type Handlers struct {
	UserHandler    *UserHandler
	ArticleHandler *ArticleHandler
	ConfigHandler  *ConfigHandler
}

func NewHandlers(userHandler *UserHandler, articleHandler *ArticleHandler, configHandler *ConfigHandler) *Handlers {
	return &Handlers{UserHandler: userHandler, ArticleHandler: articleHandler, ConfigHandler: configHandler}
}
