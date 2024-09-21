package mysql

import (
	"api/pkg/models"
	"database/sql"
	"fmt"
)

type ProductModel struct {
	DB *sql.DB
}

func (m *ProductModel) GetByType(productType string) ([]*models.Product, error) {
	stmt := `SELECT * FROM products
	WHERE type = ?`

	rows, err := m.DB.Query(stmt, productType)
	if err != nil {
		fmt.Println(err.Error());
		return nil, err
	}
	
	defer rows.Close()
	
	products := []*models.Product{}
	for rows.Next() {
		p := &models.Product{}
		
		err = rows.Scan(&p.ID, &p.Brand, &p.Name, &p.Description, &p.Price, &p.ProductType, &p.Quantity, &p.Gender)
		if err != nil {
			fmt.Println(err.Error());
			return nil, err
		}

		products = append(products, p)
	}

	return products, nil
}