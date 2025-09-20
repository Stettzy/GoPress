package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/Stettzy/GoPress/internal/api/handlers"
	"github.com/Stettzy/GoPress/internal/api/middleware"
	"github.com/Stettzy/GoPress/internal/api/routes"
	"github.com/Stettzy/GoPress/internal/config"
	"github.com/Stettzy/GoPress/internal/domain/article"
	"github.com/Stettzy/GoPress/internal/domain/user"
	"github.com/Stettzy/GoPress/internal/infrastructure/database"
)

func main() {
	if _, err := os.Stat(".env"); os.IsNotExist(err) {
		fmt.Println("Environment file not found")
		startSetupMode()
	} else {
		fmt.Println("Environment file found")
		startNormalMode()
	}
}

func startNormalMode() {
	fmt.Println("Starting normal mode")

	// 1. Initialize database connection
	db, err := database.NewConnection()
	if err != nil {
		fmt.Printf("Error connecting to database: %v\n", err)
		return
	}
	defer db.Close()

	// 2. Run migrations
	migrator := database.NewMigrator(db)
	if err := migrator.Migrate(); err != nil {
		fmt.Printf("Error running migrations: %v\n", err)
		return
	}

	// 3. Initialize repositories
	userRepo := user.NewPersistence(db)
	articleRepo := article.NewPersistence(db)
	configRepo := config.NewPersistence(db)

	// 4. Initialize services
	userService := user.NewService(userRepo)
	articleService := article.NewService(articleRepo)
	configService := config.NewService(configRepo)

	// 5. Initialize handlers
	userHandler := handlers.NewUserHandler(userService)
	articleHandler := handlers.NewArticleHandler(articleService)
	configHandler := handlers.NewConfigHandler(configService)
	allHandlers := handlers.NewHandlers(userHandler, articleHandler, configHandler)

	// 6. Initialize authentication middleware
	jwtSecret := "a8f5f167f44f4964e6c998dee827110c6c998dee827110ca8f5f167f44f4964e" // TODO: Get from env or config
	authMiddleware := middleware.NewAuthMiddleware(userService, jwtSecret)

	// 7. Setup routes
	router := routes.SetupRoutes(allHandlers, authMiddleware)

	// 8. Start server
	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	fmt.Println("Server starting on :8080")
	if err := server.ListenAndServe(); err != nil {
		fmt.Printf("Server failed to start: %v\n", err)
	}
}

func startSetupMode() {
	fmt.Println("Starting setup mode")

	r := http.NewServeMux()

	// Config setup - works with nil repo
	configRepo := config.NewPersistence(nil)
	configService := config.NewService(configRepo)
	configHandler := handlers.NewConfigHandler(configService)
	r.HandleFunc("POST /api/config/database", configHandler.SetupDatabaseConnection)

	// User creation - handle dynamically
	r.HandleFunc("POST /api/setup/admin", handleSetupAdmin)

	server := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}
	server.ListenAndServe()
}

func handleSetupAdmin(w http.ResponseWriter, r *http.Request) {
	db, err := database.NewConnection()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close()

	// Run migrations
	migrator := database.NewMigrator(db)
	migrator.Migrate()

	// Create user services
	userRepo := user.NewPersistence(db)
	userService := user.NewService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	userHandler.Create(w, r)
}
