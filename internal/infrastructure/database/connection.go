package database

import (
	"bufio"
	"database/sql"
	"fmt"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

func NewConnection() (*sql.DB, error) {
	env, err := loadEnv()
	if err != nil {
		return nil, err
	}

	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", env["DB_USER"], env["DB_PASSWORD"], env["DB_HOST"], env["DB_PORT"], env["DB_NAME"]))
	if err != nil {
		return nil, err
	}

	return db, nil
}

func loadEnv() (map[string]string, error) {
	file, err := os.Open(".env")
	if err != nil {
		return nil, err
	}
	defer file.Close()

	env := make(map[string]string)
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 {
			continue
		}

		env[parts[0]] = parts[1]
	}

	return env, scanner.Err()
}
