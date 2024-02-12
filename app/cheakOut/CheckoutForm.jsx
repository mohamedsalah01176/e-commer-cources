"use client"
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { CartContext } from '../_context/CartContext';

const CheckoutForm = ({amount}) => {
  const apiKey=process.env.NEXT_PUBLIC_REST_API_KEY

  const {card,setCard}=useContext(CartContext)

  const {user}=useUser()

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
	const [errormessage, setErrorMessage] = useState()

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    createOrder()

    resendEmail()

    const handleError = (error) => {
			setLoading(false)
			setErrorMessage(error.message)
		}

    const { error: submitError } = await elements.submit();
		if (submitError) {
			handleError(submitError);
			return;
		}

    async function resendEmail(){
      const res=await fetch('api/resend',{
       method:'POST',
       
     })
    }

    const res = await fetch('api/create-init', {
			method: 'POST',
			body: JSON.stringify({
				amount: amount
			})
		})

    const clientSecret=await res.json()

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/paymentPage",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  console.log("kkk",card)
  async function createOrder(){
    let productsId=[]
    card.forEach(el=>{
      productsId.push(el.product.id)
    })
    const data={
      data:{
        email:user.primaryEmailAddress.emailAddress,
        userName:user.fullName,
        amount,
        products:productsId
      }
    }

      await axios.create({baseURL:`http://localhost:1337/api`,headers:{Authorization:`Bearer ${apiKey}`}}).post("/orders",data)
      .then(res=>{
        card.forEach((el)=>{
          axios.create({baseURL:`http://localhost:1337/api`,headers:{Authorization:`Bearer ${apiKey}`}}).delete(`/cards/${el.id}`)
          .then(ress=>{})
        })
      })
  }


  return (
    <form onSubmit={handleSubmit} className='text-center'>
      <PaymentElement />
      <button className='btn btn-success w-50 mt-3 ' >Submit</button>
    </form>
  );
};

export default CheckoutForm;