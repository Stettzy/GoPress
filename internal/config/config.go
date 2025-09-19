package config

type Config struct {
	DB_HOST     string `json:"db_host"`
	DB_PORT     string `json:"db_port"`
	DB_USER     string `json:"db_user"`
	DB_PASSWORD string `json:"db_password"`
	DB_NAME     string `json:"db_name"`
}

func NewConfig(dbHost, dbPort, dbUser, dbPassword, dbName string) *Config {
	return &Config{DB_HOST: dbHost, DB_PORT: dbPort, DB_USER: dbUser, DB_PASSWORD: dbPassword, DB_NAME: dbName}
}
