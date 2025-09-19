package user

import "context"

type Service struct {
	repo Repository
}

func NewService(r Repository) *Service {
	return &Service{repo: r}
}

func (s *Service) CreateUser(ctx context.Context, username, email, password string, role Role) (*User, error) {
	user, err := NewUser(username, email, password, role)
	if err != nil {
		return nil, err
	}

	if err := s.repo.Create(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *Service) UpdateUser(ctx context.Context, id int, username, email, password string, role string) error {
	user, err := s.repo.FindById(ctx, id)
	if err != nil {
		return err
	}

	user.Username = username
	user.Email = email
	user.Password = password
	user.Role = role

	return s.repo.Update(ctx, user)
}

func (s *Service) FindById(ctx context.Context, id int) (*User, error) {
	return s.repo.FindById(ctx, id)
}

func (s *Service) Delete(ctx context.Context, user *User) error {
	return s.repo.Delete(ctx, user)
}

func (s *Service) GetAll(ctx context.Context) ([]*User, error) {
	return s.repo.GetAll(ctx)
}
