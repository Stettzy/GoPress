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
		DB_HOST     string `json:"db_host"`
		DB_PORT     string `json:"db_port"`
		DB_USER     string `json:"db_user"`
		DB_PASSWORD string `json:"db_password"`
		DB_NAME     string `json:"db_name"`
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

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Database connection setup successfully"))
}
