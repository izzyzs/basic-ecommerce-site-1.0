package mysql

import (
	"api/pkg/models"
	"database/sql"
	"errors"
)

type UserModel struct {
	DB *sql.DB
}

func (m *UserModel) Insert(user *models.User) (int, error) {
	stmt := `INSERT INTO users (email, password_hash, username) 
			 VALUES (?, ?, ?)`

	result, err := m.DB.Exec(stmt, user.Email, user.PasswordHash, user.Username)
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (m *UserModel) GetByID(id int) (*models.User, error) {
	stmt := `SELECT id, email, password_hash, username FROM users WHERE id = ?`

	user := &models.User{}
	err := m.DB.QueryRow(stmt, id).Scan(&user.ID, &user.Email, &user.PasswordHash, &user.Username)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("no user found with that ID")
		}
		return nil, err
	}

	return user, nil
}

func (m *UserModel) GetByUsername(username string) (*models.User, error) {
	stmt := `SELECT id, email, password_hash, username FROM users WHERE username = ?`

	user := &models.User{}
	err := m.DB.QueryRow(stmt, username).Scan(&user.ID, &user.Email, &user.PasswordHash, &user.Username)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("no user found with that username")
		}
		return nil, err
	}

	return user, nil
}

func (m *UserModel) Update(user *models.User) error {
	stmt := `UPDATE users SET email = ?, password_hash = ?, username = ? WHERE id = ?`

	_, err := m.DB.Exec(stmt, user.Email, user.PasswordHash, user.Username, user.ID)
	if err != nil {
		return err
	}

	return nil
}

func (m *UserModel) Delete(id int) error {
	stmt := `DELETE FROM users WHERE id = ?`

	_, err := m.DB.Exec(stmt, id)
	if err != nil {
		return err
	}

	return nil
}
