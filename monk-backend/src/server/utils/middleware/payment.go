package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/context"

	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/paymentintent"
	"monk.com/monk/src/server/utils"
)

type DataForIntent struct {
	PaymentMethodType string `json:"type"`
	Currency          string `json:"currency"`
	Amount            int    `json:"amount"`
	ID                string `json:"id"`
	UserID            string `json:"userID"`
	ProductID         string `json:"productID"`
}

//Pass a handlerFunc as Argument and
//return a hanlderFunc and wrap the func to create middleware
func Payment(f http.HandlerFunc) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		//Retrieve the Stripe Secret Key

		Access, _ := utils.GetAccessToken(".")

		//Set the stripe Keyfor Authorization
		stripe.Key = Access.STRIPE_SECRET_KEY

		data := DataForIntent{}

		//Parse the body to a Payments struct
		err := json.NewDecoder(r.Body).Decode(&data)

		if err != nil {
			fmt.Print("err", err)
		}

		//This is for testing purposes to confirm the payment
		ok := true

		//This sends the payments intents to Stripe
		params := &stripe.PaymentIntentParams{
			PaymentMethod: &data.ID,
			Amount:        stripe.Int64(2000),
			Currency:      stripe.String(data.Currency),
			PaymentMethodTypes: []*string{
				stripe.String(data.PaymentMethodType),
			},
			Confirm: &ok,
		}

		// Creates the payment intent
		_, err = paymentintent.New(params)

		if err != nil {
			return
		}

		//this ensures that the handleFunc used as the argument is run
		context.Set(r, "product", data.ProductID)
		context.Set(r, "user", data.UserID)
		f.ServeHTTP(w, r)
	}
}
