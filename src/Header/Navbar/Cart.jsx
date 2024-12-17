import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTotalPrice, selectCartItems, removeFromCart, clearCart , decreaseQuatity} from '../../redux/CartSlice'; 
import {  useNavigate } from 'react-router-dom';
import { addtoCart } from '../../redux/CartSlice';
import Checkout from '../Checkout';
import { useEffect } from 'react';

function Cart() {

  useEffect(() => {
    document.title = "BargainBay-Cart";
  },[])
 

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const formatedtotalPrice=Number(totalPrice) || 0;

  const dispatch = useDispatch();
  const navigate=useNavigate()

  
  

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
     
    
  };
    const handledecrease = (item) => {
      dispatch(decreaseQuatity(item))

    }
    
    

  const handleClearCart=() => {
    dispatch(clearCart());
  }

  const handleNavigate = () =>{
    navigate('/')
  }
  const handleAddToCart = (product) => {
    dispatch(addtoCart(product));
};

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-5">
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-8">Shopping <b className='italic text-green-500 '>Cart</b></h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Your cart is empty. Please add some items!</h2>
          <button
            onClick={handleNavigate}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Go to Home page
          </button>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between bg-blue-50 p-4 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-500">Total: ${item.total.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                  >
                  Romove
                  </button>

                  <button
                    onClick={() => handledecrease(item)}
                    className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
                  >
                  Dcrease
                  </button>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                  >
                    Add more
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">Total Price: ${formatedtotalPrice.toFixed(2)}</p>
            <div className=" flex space-x-4 te">
             <Checkout/>
              <button
                onClick={handleClearCart}
                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default Cart;
