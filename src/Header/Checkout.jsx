import React from 'react'

import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51QV9cW09mxy0QLTw8BTHlV65m09akilYqAI50V41KTaq0XBNUgkJWs6MBElD2M6iXTAhOY2x1zwXKIYSk46C7AMp00AYhsplS8');

function Checkout() {

    const handleCheckout = async ()=>{
        const stripe = await stripePromise;
        stripe.redirectToCheckout({
            lineItems: [
                {
                    price : 'price_1QV9qs09mxy0QLTwKCisn5tO',
                    quantity: 1,
                }

            ],
            mode: 'payment',
            successUrl:"http://localhost:5173/cart",
            cancelUrl:"http://localhost:5173",
        })
    }
  return (
    <div>
      <button onClick={handleCheckout}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
                Proceed to Checkout
              </button>
    </div>
  )
}

export default Checkout
