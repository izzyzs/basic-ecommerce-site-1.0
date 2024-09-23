package main

import (
	"api/pkg/helpers"
	"api/pkg/models"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
)

type ProductResponse struct {
	Status int					`json:"status"`
	Products []*models.Product	`json:"products"`
}

func (app *application) home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	fmt.Fprintf(w, "")
	w.WriteHeader(http.StatusOK)
}

func (app *application) getProductsByParamAndVal(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	param := vars["param"]
	val := vars["val"]
	products, err := app.products.GetByParamAndVal(param, val)

	if err != nil {
		if customErr, ok := err.(*helpers.CustomError); ok {
			message := customErr.Message
			code := customErr.HTTPCode
			codeText := http.StatusText(customErr.HTTPCode)
			fmt.Fprintf(os.Stderr, "ERR: %s, Code %d: %s", message, code, codeText)
			errorText := fmt.Sprintf("%d: %s\nError: %s", code, codeText, message)
			http.Error(w, errorText, code)
		} else {
			fmt.Fprintf(os.Stderr, "ERR: %s", err.Error())
			http.Error(w, "Failed to fetch products", http.StatusInternalServerError)
		}
		return
	}

	response := &ProductResponse{
		Status: http.StatusOK,
		Products: products,
	}

	w.Header().Set("Content-type", "application/json")

	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		http.Error(w, "Failed to write JSON response", http.StatusInternalServerError)
		return
	}
}

func createOrder(w http.ResponseWriter, r *http.Request) {
    // Get the username from the JWT claims
    claims := &Claims{}
    cookie, err := r.Cookie("token")
    if err != nil {
        w.WriteHeader(http.StatusUnauthorized)
        return
    }
    token, err := jwt.ParseWithClaims(cookie.Value, claims, func(t *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })

    if err != nil || !token.Valid {
        w.WriteHeader(http.StatusUnauthorized)
        return
    }

    var newOrder models.Order
    err = json.NewDecoder(r.Body).Decode(&newOrder)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Set the UserID based on the authenticated user
    // In a real application, you'd look up the user ID based on the username
    newOrder.UserId = 1 // Replace with actual user ID lookup

    // TODO: Save the order to the database

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]interface{}{
        "message": "Order created successfully",
        "order":   newOrder,
    })
}