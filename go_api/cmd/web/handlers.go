package main

import (
	"api/pkg/models"
	"encoding/json"
	"fmt"
	"net/http"

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

func (app *application) getProductByType(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	productType := vars["type"]
	products, err := app.products.GetByType(productType)

	if err != nil {
		http.Error(w, "Failed to fetch products", http.StatusInternalServerError)
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