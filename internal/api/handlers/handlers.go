package handlers

type Handlers struct {
	UserHandler    *UserHandler
	ArticleHandler *ArticleHandler
	ConfigHandler  *ConfigHandler
	AuthHandler    *AuthHandler
}

func NewHandlers(userHandler *UserHandler, articleHandler *ArticleHandler, configHandler *ConfigHandler, authHandler *AuthHandler) *Handlers {
	return &Handlers{UserHandler: userHandler, ArticleHandler: articleHandler, ConfigHandler: configHandler, AuthHandler: authHandler}
}
