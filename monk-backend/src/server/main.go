package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"monk.com/monk/src/server/routes"
	"monk.com/monk/src/server/utils/middleware"
)

var r *mux.Router

func homepage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Welcome to my API")
}
func handlers() {
	r = mux.NewRouter()
	r.HandleFunc("/register", routes.RegisterUsers).
		Methods("Post")
	r.HandleFunc("/login", routes.LogIn).
		Methods("GET")
	r.HandleFunc("/add-products", middleware.Authenticate(routes.AddProduct)).
		Methods("Post")
	r.HandleFunc("/getProducts", routes.GetProducts).
		Methods("GET")
	r.HandleFunc("/get-product", routes.GetProduct).
		Methods("GET")
	r.HandleFunc("/get-path", routes.GetStaticPath).
		Methods("GET")
	r.HandleFunc("/update-product", middleware.Authenticate(routes.UpdateProduct)).
		Methods("POST")
	r.HandleFunc("/delete-product", middleware.Authenticate(routes.DeleteProduct)).
		Methods("DELETE")
	r.HandleFunc("/payment", middleware.Payment(routes.AddOrder)).
		Methods("POST")
	r.HandleFunc("/", homepage).Methods("GET")

	// http.Handle("/", r)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})
	handler := c.Handler(r)

	http.ListenAndServe(":9000", handler)
}

func main() {

	handlers()
	fmt.Println("Started working")
}
