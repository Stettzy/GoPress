package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/Stettzy/GoPress/internal/api/handlers"
	"github.com/Stettzy/GoPress/internal/api/middleware"
	"github.com/Stettzy/GoPress/internal/api/routes"
	"github.com/Stettzy/GoPress/internal/config"
	"github.com/Stettzy/GoPress/internal/domain/article"
	"github.com/Stettzy/GoPress/internal/domain/page"
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

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func startNormalMode() {
	fmt.Println("Starting normal mode")
	jwtSecret := "a8f5f167f44f4964e6c998dee827110c6c998dee827110ca8f5f167f44f4964e" // TODO: Get from env or config
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
	pageRepo := page.NewPersistence(db)

	// 4. Initialize services
	userService := user.NewService(userRepo)
	articleService := article.NewService(articleRepo)
	configService := config.NewService(configRepo)
	pageService := page.NewService(pageRepo)

	// 5. Initialize handlers
	userHandler := handlers.NewUserHandler(userService)
	articleHandler := handlers.NewArticleHandler(articleService)
	configHandler := handlers.NewConfigHandler(configService)
	authHandler := handlers.NewAuthHandler(userService, jwtSecret)
	pageHandler := handlers.NewPageHandler(pageService)
	allHandlers := handlers.NewHandlers(userHandler, articleHandler, configHandler, authHandler, pageHandler)

	// 6. Initialize authentication middleware

	authMiddleware := middleware.NewAuthMiddleware(userService, jwtSecret)

	// 7. Setup routes
	r := routes.SetupRoutes(allHandlers, authMiddleware)

	// 8. Start server
	server := &http.Server{
		Addr:    ":8080",
		Handler: corsMiddleware(r),
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
	r.HandleFunc("POST /api/setup/database", configHandler.SetupDatabaseConnection)

	// User creation - handle dynamically
	r.HandleFunc("POST /api/setup/admin", handleSetupAdmin)

	server := &http.Server{
		Addr:    ":8080",
		Handler: corsMiddleware(r),
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

	migrator := database.NewMigrator(db)
	err = migrator.Migrate()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	userRepo := user.NewPersistence(db)
	userService := user.NewService(userRepo)

	var req struct {
		Username string    `json:"username"`
		Email    string    `json:"email"`
		Password string    `json:"password"`
		Role     user.Role `json:"role"`
	}

	err = json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = userService.CreateUser(r.Context(), req.Username, req.Email, req.Password, req.Role)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Admin user created successfully"})
}
