package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (app *application) corsMiddleware(router *mux.Router) *mux.Router {
	router.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			next.ServeHTTP(w, r)
		})
	})
	return router
}