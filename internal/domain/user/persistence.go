package user

import (
	"context"
	"database/sql"
	"time"
)

type Persistence struct {
	db *sql.DB
}

func NewPersistence(db *sql.DB) *Persistence {
	return &Persistence{db: db}
}

func (p *Persistence) Create(ctx context.Context, user *User) error {
	query := `INSERT INTO users (username, password, email, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)`

	_, err := p.db.ExecContext(ctx, query,
		user.Username,
		user.Password,
		user.Email,
		user.Role,
		user.CreatedAt,
		user.UpdatedAt,
	)
	if err != nil {
		return err
	}

	return nil
}

func (p *Persistence) Update(ctx context.Context, user *User) error {
	query := `UPDATE users SET username = $1, password = $2, email = $3, role = $4, updated_at = $5 WHERE id = $6`
	_, err := p.db.ExecContext(ctx, query,
		user.Username,
		user.Password,
		user.Email,
		user.Role,
		time.Now(),
		user.ID,
	)
	if err != nil {
		return err
	}

	return nil
}

func (p *Persistence) Delete(ctx context.Context, user *User) error {
	query := `DELETE FROM users WHERE id = $1`

	_, err := p.db.ExecContext(ctx, query, user.ID)
	if err != nil {
		return err
	}

	return nil
}

func (p *Persistence) FindById(ctx context.Context, id int) (*User, error) {
	query := `SELECT username, email, role FROM users WHERE id = $1`

	var user User

	err := p.db.QueryRowContext(ctx, query, id).Scan(&user.Username, &user.Email, &user.Role)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (p *Persistence) FindByUsername(ctx context.Context, username string) (*User, error) {
	query := `SELECT username, email, role FROM users WHERE username = $1`

	var user User

	err := p.db.QueryRowContext(ctx, query, username).Scan(&user.Username, &user.Email, &user.Role)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (p *Persistence) FindByEmail(ctx context.Context, email string) (*User, error) {
	query := `SELECT username, email, role FROM users WHERE email = $1`

	var user User

	err := p.db.QueryRowContext(ctx, query, email).Scan(&user.Username, &user.Email, &user.Role)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (p *Persistence) GetAll(ctx context.Context) ([]*User, error) {
	query := `SELECT username, email, role FROM users`

	rows, err := p.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var users []*User

	for rows.Next() {
		var user User

		err := rows.Scan(&user.Username, &user.Email, &user.Role)
		if err != nil {
			return nil, err
		}

		users = append(users, &user)
	}

	return users, nil
}
