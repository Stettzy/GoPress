package config

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) SetupDatabaseConnection(dbHost, dbPort, dbUser, dbPassword, dbName string) error {
	return s.repo.SaveAndTestDatabaseConnection(dbHost, dbPort, dbUser, dbPassword, dbName)
}
