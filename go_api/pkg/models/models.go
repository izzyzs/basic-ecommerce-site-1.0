package models

import (
	"errors"
)

var ErrNoFoundRecords error = errors.New("there were no Products found")

type Product struct {
	ID int
	Brand string
	Name string
	Description string
	Price float32
	ProductType string
	Quantity int
	Gender string
}

type Order struct {
	ID int
	UserId int
	Address string
}

type User struct {
	ID int
	Email string
}