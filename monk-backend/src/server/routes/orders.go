package routes

import (
	"fmt"
	"net/http"

	"github.com/gorilla/context"
	Database "monk.com/monk/src/server/database"
)

func AddOrder(w http.ResponseWriter, r *http.Request) {

	//Open A connection to the database
	db := Database.Connection()

	//delay the function to close until there is a return statement
	defer db.Close()

	//Get the values from the middleware
	//This values are for the products ordered
	productID := context.Get(r, "product")
	userID := context.Get(r, "user")

	//Query String

	query := "Insert Into `orders`(`User`, `Product`, `Status`) values (?,?,?)"

	//Exec recieves an error or results field
	_, err := db.Exec(query, userID, productID, "Ordered")

	//Check for errors if any
	if err != nil {
		fmt.Print(err)
		return
	}

	fmt.Fprint(w, 200)
}
