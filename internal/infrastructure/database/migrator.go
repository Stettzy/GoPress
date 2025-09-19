package database

import (
	"database/sql"
	"fmt"
	"os"
	"strings"
)

type Migrator struct {
	db *sql.DB
}

func NewMigrator(db *sql.DB) *Migrator {
	return &Migrator{db: db}
}

func (m *Migrator) ensureSchemaMigrationsTable() error {
	_, err := m.db.Exec("CREATE TABLE IF NOT EXISTS schema_migrations (id SERIAL PRIMARY KEY, version INT NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
	return err
}

func (m *Migrator) Migrate() error {
	err := m.ensureSchemaMigrationsTable()
	if err != nil {
		return err
	}

	err = m.MigrateUp()
	if err != nil {
		return err
	}

	return nil
}

func (m *Migrator) MigrateUp() error {
	files, err := os.ReadDir("migrations")
	if err != nil {
		return err
	}

	for _, file := range files {
		if file.IsDir() {
			continue
		}

		if strings.HasSuffix(file.Name(), "_up.sql") {
			version := extractVersion(file.Name())
			isApplied, err := m.isApplied(version)
			if err != nil {
				return err
			}
			if isApplied {
				continue
			}

			query, err := os.ReadFile(fmt.Sprintf("migrations/%s", file.Name()))
			if err != nil {
				return err
			}

			_, err = m.db.Exec(string(query))
			if err != nil {
				return err
			}

			if err := m.recordMigration(version); err != nil {
				return err
			}
		}
	}

	return nil
}

func (m *Migrator) MigrateDown() error {
	files, err := os.ReadDir("migrations")
	if err != nil {
		return err
	}

	for _, file := range files {
		if file.IsDir() {
			continue
		}

		if strings.HasSuffix(file.Name(), "_down.sql") {
			query, err := os.ReadFile(fmt.Sprintf("migrations/%s", file.Name()))
			if err != nil {
				return err
			}

			_, err = m.db.Exec(string(query))
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func (m *Migrator) recordMigration(version string) error {
	_, err := m.db.Exec("INSERT INTO schema_migrations (version) VALUES ($1)", version)
	return err
}

func (m *Migrator) isApplied(version string) (bool, error) {
	var count int
	err := m.db.QueryRow("SELECT COUNT(*) FROM schema_migrations WHERE version = $1", version).Scan(&count)
	return count > 0, err
}

func extractVersion(filename string) string {
	parts := strings.Split(filename, "_")
	return parts[0]
}
