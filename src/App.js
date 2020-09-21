import React from 'react';
import { loadStripe } from '@stripe/stripe-js'
import {Elements,CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import axios from 'axios'

import "bootswatch/dist/lux/bootstrap.min.css";
import './App.css';

/* llegue hasta el minuto 23:14 */
const stripePromese = loadStripe("pk_test_51HSpraJC6NEwMC09qRoscBE3KUuTVp8K6cO8AbOAHqaMEsc0jSUpbCGkpvuVkQbBflxnkFIU8Ub7W7Ly2klGIk6a00u2jdatfu");
const CheckoutForm=()=>{
  const stripe= useStripe();
  const elements= useElements();

  const handleSubmit= async(e)=>{

    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type:'card',
      card: elements.getElement(CardElement),
    });
    if(!error){
      const { id } =paymentMethod;

      const {data}= await axios.post('http://localhost:3001/api/checkout',{
        id,
        amount: 10000
      })

      console.log(data)
      
      elements.getElement(CardElement).clear();

    }

  };
  return <form onSubmit={handleSubmit} className="card card-body">
    <img src="https://static-geektopia.com/storage/geek/products/corsair/k68-rgb/k68_rgb_01.png" alt="k68 keyboard" className="img-fluid"/>

      <h3 className="text-center my-2">Price:100$</h3>

    <div className="form-group">
      <CardElement className="form-control"></CardElement>
    </div>
    <button className="btn btn-success">
      Buy
    </button>
  </form>
}


function App() {
  return (
    
    <Elements stripe={stripePromese}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
          <CheckoutForm></CheckoutForm>

          </div>

        </div>
      </div>

    </Elements>
  );
}

export default App;
