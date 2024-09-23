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
type OrderItem struct {
	ID          int
	Brand       string
	Name        string
	Description string
	Price       float32
	ProductType string
	Quantity    int
	Gender      string
	CartQuantity int
}

type Order struct {
	ID int
	UserId int
	Address string
	Status string
	OrderDate string
	TotalAmount float64
	Items []OrderItem
}

type User struct {
	ID int
	Email string
	PasswordHash string
	Username string
}