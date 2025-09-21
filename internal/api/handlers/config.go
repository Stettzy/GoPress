package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Stettzy/GoPress/internal/config"
)

type ConfigHandler struct {
	configService *config.Service
}

func NewConfigHandler(cs *config.Service) *ConfigHandler {
	return &ConfigHandler{configService: cs}
}

func (h *ConfigHandler) SetupDatabaseConnection(w http.ResponseWriter, r *http.Request) {
	var req struct {
		DB_HOST     string `json:"dbHost"`
		DB_PORT     string `json:"dbPort"`
		DB_USER     string `json:"dbUser"`
		DB_PASSWORD string `json:"dbPassword"`
		DB_NAME     string `json:"dbName"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = h.configService.SetupDatabaseConnection(req.DB_HOST, req.DB_PORT, req.DB_USER, req.DB_PASSWORD, req.DB_NAME)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "db_setup_complete",
		Value:    "true",
		Path:     "/",
		HttpOnly: true,
	})

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]string{"message": "Database connection setup successfully"})
}
