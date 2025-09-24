package handlers

type Handlers struct {
	UserHandler    *UserHandler
	ArticleHandler *ArticleHandler
	ConfigHandler  *ConfigHandler
	AuthHandler    *AuthHandler
	PageHandler    *PageHandler
}

func NewHandlers(userHandler *UserHandler, articleHandler *ArticleHandler, configHandler *ConfigHandler, authHandler *AuthHandler, pageHandler *PageHandler) *Handlers {
	return &Handlers{
		UserHandler:    userHandler,
		ArticleHandler: articleHandler,
		ConfigHandler:  configHandler,
		AuthHandler:    authHandler,
		PageHandler:    pageHandler,
	}
}
