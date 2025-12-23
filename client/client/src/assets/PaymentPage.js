
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

import CheckoutForm from "./CheckoutForm";
//import "./PaymentPage.css";


const Public_Key = "pk_test_51OuFkfLfXYb8O5xh9u2che20BocuVX9YwXr8Md67qGHKlpheVF15Gzj7GPyh9UJw3qOE7QxObA3b88A7C4jVuA2l00QGHLVVZG"
const stripeTestPromise= loadStripe(Public_Key)


export default function PaymentPage() {

  

   
  return (
    <Elements stripe= {stripeTestPromise}>
      <CheckoutForm/>


    </Elements>
    
  );
};