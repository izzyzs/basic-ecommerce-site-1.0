package mysql

import (
	"api/pkg/helpers"
	"api/pkg/models"
	"database/sql"
	"fmt"
	"net/http"
)

type ProductModel struct {
	DB *sql.DB
}

func (m *ProductModel) GetByParamAndVal(param string, val string) ([]*models.Product, error) {
	if !isAllowedColumn(param) {
		err := &helpers.CustomError{HTTPCode: http.StatusBadRequest, Message: "This is not a valid Column name"}
		return nil, err
	}

	stmt := `SELECT * FROM products
	WHERE `+ param + ` = ?`

	rows, err := m.DB.Query(stmt, val)
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

func isAllowedColumn(val string) bool {
	columns := map[string]bool{
		"brand": true,
		"type": true,
		"id": true,
		"gender": true,
	}

	return columns[val]
}