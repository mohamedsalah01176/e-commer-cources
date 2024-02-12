"use client"
import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import Header from '../_componaten/header/Header';
import Footer from '../_componaten/footer/Footer';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_Stripe_Publishable_key);

export default function page({searchParams}) {

    
    
      const options={
        mode:'payment',
        currency:'usd',
        amount:Number(searchParams.amount)
      }
    
  return (
    <div className=''>
        <Header searchParams={searchParams}/>
        <div className='w-75 m-auto my-5'>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm amount={searchParams.amount} />
            </Elements>
        </div>

        <Footer searchParams={searchParams}/>
    </div>
  )
}
