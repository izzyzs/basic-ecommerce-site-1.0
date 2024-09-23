package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (app *application) routes() http.Handler {
	router := mux.NewRouter()
	router.HandleFunc("/", app.home).Methods("GET")
	router.Path("/products").Queries("by", "{param}", "value", "{val}").Methods("GET").HandlerFunc(app.getProductsByParamAndVal)
	router.HandleFunc("/login", app.login).Methods("POST")
	router.HandleFunc("/logout", app.logout).Methods("POST")
	router.HandleFunc("/protected", app.authenticateMiddleware(app.protectedHandler)).Methods("GET")
	router = app.corsMiddleware(router)
	return router
}