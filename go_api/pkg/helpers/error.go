package helpers

import "fmt"

type CustomError struct {
	HTTPCode int
	Message string
}

func (e *CustomError) Error() string {
	return fmt.Sprintf("Error: %d %s", e.HTTPCode, e.Message)
}