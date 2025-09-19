package config

import (
	"bufio"
	"database/sql"
	"fmt"
	"os"
	"strings"
)

type Persistence struct {
	db *sql.DB
}

func NewPersistence(db *sql.DB) *Persistence {
	return &Persistence{db: db}
}

func (p *Persistence) SaveAndTestDatabaseConnection(dbHost, dbPort, dbUser, dbPassword, dbName string) error {
	config := NewConfig(dbHost, dbPort, dbUser, dbPassword, dbName)

	envFile := ".env"
	_, err := os.Stat(envFile)

	var file *os.File

	if os.IsNotExist(err) {
		file, err = os.Create(envFile)
		if err != nil {
			return err
		}
		defer file.Close()
	} else {
		file, err = os.OpenFile(envFile, os.O_RDWR, 0644)
		if err != nil {
			return err
		}
		defer file.Close()
	}

	scanner := bufio.NewScanner(file)
	lines := []string{}

	foundLines := map[string]bool{
		"DB_HOST":     false,
		"DB_USER":     false,
		"DB_PASSWORD": false,
		"DB_PORT":     false,
		"DB_NAME":     false,
	}

	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "DB_HOST") {
			line = fmt.Sprintf("DB_HOST=%s", config.DB_HOST)
			foundLines["DB_HOST"] = true
		}
		if strings.HasPrefix(line, "DB_USER") {
			line = fmt.Sprintf("DB_USER=%s", config.DB_USER)
			foundLines["DB_USER"] = true
		}
		if strings.HasPrefix(line, "DB_PASSWORD") {
			line = fmt.Sprintf("DB_PASSWORD=%s", config.DB_PASSWORD)
			foundLines["DB_PASSWORD"] = true
		}
		if strings.HasPrefix(line, "DB_PORT") {
			line = fmt.Sprintf("DB_PORT=%s", config.DB_PORT)
			foundLines["DB_PORT"] = true
		}
		if strings.HasPrefix(line, "DB_NAME") {
			line = fmt.Sprintf("DB_NAME=%s", config.DB_NAME)
			foundLines["DB_NAME"] = true
		}
		lines = append(lines, line)
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	for key, found := range foundLines {
		if !found {
			switch key {
			case "DB_HOST":
				lines = append(lines, fmt.Sprintf("DB_HOST=%s", config.DB_HOST))
			case "DB_USER":
				lines = append(lines, fmt.Sprintf("DB_USER=%s", config.DB_USER))
			case "DB_PASSWORD":
				lines = append(lines, fmt.Sprintf("DB_PASSWORD=%s", config.DB_PASSWORD))
			case "DB_PORT":
				lines = append(lines, fmt.Sprintf("DB_PORT=%s", config.DB_PORT))
			case "DB_NAME":
				lines = append(lines, fmt.Sprintf("DB_NAME=%s", config.DB_NAME))
			}
		}
	}

	file.Seek(0, 0)
	file.Truncate(0)
	file.WriteString(strings.Join(lines, "\n"))

	return p.testDatabaseConnection(config)
}

func (p *Persistence) testDatabaseConnection(config *Config) error {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", config.DB_USER, config.DB_PASSWORD, config.DB_HOST, config.DB_PORT, config.DB_NAME))
	if err != nil {
		return err
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		return err
	}

	return nil
}
