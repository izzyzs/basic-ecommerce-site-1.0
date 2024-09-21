package mysql

import (
	"database/sql"
)

type OrderModel struct {
	DB *sql.DB
}

func (m *OrderModel) Insert(/* TODO: ADD PARAMS */) (int, error){
	stmt := ""

	result, err := m.DB.Exec(stmt /* TODO: ADD PARAMS */)
	if err != nil {
		return 0, nil
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, nil
	}

	return int(id), nil
}

