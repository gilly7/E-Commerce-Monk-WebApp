import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import axios from "axios";

import { userContext } from "../pages/utils/contexts/userContext";

export default function PaymentForm({ data }) {
  const stripe = useStripe();
  const elements = useElements();
  const { userDetails } = useContext(userContext);
  const router = useRouter();

  //State to Check if the payment was successfully sent
  const [success, setSuccess] = useState(false);

  //State to show the user the request was sent
  const [loading, setLoading] = useState(false);

  //State to handle with an error
  const [errors, setErrors] = useState(false);

  //Get the user to send the user Email
  const { user } = userDetails;

  //Function to handle the submission of the payment request
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check if the user i logged in
    if (user == null || undefined) {
      router.push("/check-in/login");
      return;
    }

    //Check if the stripe object was loaded
    if (!stripe || !elements) {
      console.log("Stripe not loaded");
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    setLoading(true);

    //Create a payment method that will show the method allowed
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    //Check that there was no error while creating the payment method
    if (!error) {
      setLoading(false);

      //In this try catch block, the request will be sent to the backend
      //The backend will verify the request and send the info to Stripe

      try {
        const { id, type } = paymentMethod;
        const res = await axios({
          method: "POST",
          url: "http://localhost:9000/payment",
          data: {
            id,
            type,
            amount: parseInt(data.price) * 1000,
            currency: "USD",
            userID: user["ID"],
            productID: data.productID
          },
        });

        if (res.data == 200) {
          setSuccess(true);
        }
      } catch (error) {
        console.log(error);
        setErrors(true);
      }
    } else {
      console.log(error);
      setErrors(true);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Check if success if false and the display the card element */}

      {/* If success is true then the product has been successfully paid for */}

      {!success ? (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <fieldset>
            <div className="border-b-2 ">
              <CardElement className="p-4" />
            </div>
          </fieldset>
          {loading && <h1>Loading</h1>}
          {errors && <h1>There was an error</h1>}
          <button
            type="submit"
            disabled={!stripe}
            className="my-4 hover:shadow-md p-2 rounded-md"
          >
            Pay Ksh. {data.price}
          </button>
        </form>
      ) : (
        <h1>Product Already Bought</h1>
      )}
    </div>
  );
}
