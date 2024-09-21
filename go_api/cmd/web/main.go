package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"api/pkg/models/mysql"

	_ "github.com/go-sql-driver/mysql"
)

type application struct {
	errorLog *log.Logger
	products *mysql.ProductModel
}

func main() {
	dsn := flag.String("dsn", "web:123456@/beautysupplydb", "Data source name: allows for the connection with a MySQL data center")

	flag.Parse()

	errorLog := log.New(os.Stderr, "ERROR:\t", log.Ldate|log.Ltime|log.Lshortfile)

	db, err := openDB(*dsn)
	if err != nil {
		errorLog.Fatal(err)
	}

	defer db.Close()

	app := &application {
		errorLog: errorLog,
		products: &mysql.ProductModel{DB: db},
	}

	server := &http.Server {
		Addr: ":8080",
		ErrorLog: errorLog,
		Handler: app.routes(),
	}

	fmt.Printf("Starting server on PORT %s\n", ":8080")
	err = server.ListenAndServe()
	errorLog.Fatal(err)
}

func openDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil { 
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}