import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51It9OgFNHj7yRM9J4QGknu66fihTqrCQBjKcMmZ3AAcPgubfgeteijs0uW66OcgewocF48lf5w25VVyGrHnDSsVn00QkycL2cT"
);

export default function Payment({data}) {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm data = {data}/>
      </Elements>
    </div>
  );
}
