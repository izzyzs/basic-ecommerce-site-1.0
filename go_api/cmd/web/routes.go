package main

import (
	"github.com/gorilla/mux"
)

func (app *application) routes() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/", app.home).Methods("GET")
	router.HandleFunc("/products/{type}", app.getProductByType).Methods("GET")
	return router
}