package config

type Repository interface {
	SaveAndTestDatabaseConnection(dbHost, dbPort, dbUser, dbPassword, dbName string) error
}
