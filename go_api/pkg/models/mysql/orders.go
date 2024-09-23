package mysql

import (
	"api/pkg/models"
	"database/sql"
)

type OrderModel struct {
	DB *sql.DB
}

func (m *OrderModel) Insert(order *models.Order) (int, error) {
	// Start a transaction
	tx, err := m.DB.Begin()
	if err != nil {
		return 0, err
	}
	defer tx.Rollback()

	// Insert the order
	stmt := `INSERT INTO orders (user_id, address, status, order_date, total_amount) VALUES (?, ?, ?, ?, ?)`

	result, err := tx.Exec(stmt, order.UserId, order.Address, order.Status, order.OrderDate, order.TotalAmount)
	if err != nil {
		return 0, err
	}

	orderId, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	// Insert order items
	for _, item := range order.Items {
		stmt := `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`
		_, err := tx.Exec(stmt, orderId, item.ID, item.CartQuantity, item.Price)
		if err != nil {
			return 0, err
		}
	}

	// Commit the transaction
	if err := tx.Commit(); err != nil {
		return 0, err
	}

	return int(orderId), nil
}

// func (m *OrderModel) Insert(order *models.Order) (int, error) {
// 	stmt := `INSERT INTO orders (user_id, address) VALUES (?, ?)`

// 	result, err := m.DB.Exec(stmt, order.UserId, order.Address)
// 	if err != nil {
// 		return 0, err
// 	}

// 	id, err := result.LastInsertId()
// 	if err != nil {
// 		return 0, err
// 	}

// 	return int(id), nil
// }
