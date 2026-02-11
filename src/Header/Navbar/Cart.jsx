import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTotalPrice,
  selectCartItems,
  removeFromCart,
  clearCart,
  decreaseQuatity,
  addtoCart
} from '../../redux/CartSlice';
import { useNavigate } from 'react-router-dom';
import Checkout from '../Checkout';

function Cart() {

  useEffect(() => {
    document.title = "BargainBay - Cart";
  }, []);

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const formattedTotalPrice = Number(totalPrice) || 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseQuatity(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleAddToCart = (item) => {
    dispatch(addtoCart(item));
  };

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-md font-sans">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-10 text-slate-700">
          Shopping <span className="italic text-sky-600">Cart</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-lg text-slate-600 mb-6">
              Your cart is empty. Please add some items!
            </h2>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-sky-500 text-white font-semibold rounded-xl 
              hover:bg-sky-600 transition-all duration-200 ease-in-out shadow-sm"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-sky-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    {/* Product Info */}
                    <div className="text-slate-700 space-y-1">
                      <p className="font-semibold text-lg">{item.title}</p>
                      <p className="text-sm text-slate-600">
                        Price: ${item.price}
                      </p>
                      <p className="text-sm text-slate-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-sky-700">
                        Total: ${item.total.toFixed(2)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleRemoveFromCart(item)}
                        className="px-4 py-2 bg-red-400 text-white text-sm font-semibold 
                        rounded-xl hover:bg-red-500 transition-all duration-200 shadow-sm"
                      >
                        Remove
                      </button>

                      <button
                        onClick={() => handleDecrease(item)}
                        className="px-4 py-2 bg-orange-400 text-white text-sm font-semibold 
                        rounded-xl hover:bg-orange-500 transition-all duration-200 shadow-sm"
                      >
                        Decrease
                      </button>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="px-4 py-2 bg-sky-400 text-white text-sm font-semibold 
                        rounded-xl hover:bg-sky-500 transition-all duration-200 shadow-sm"
                      >
                        Add More
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t pt-6">
              <p className="text-xl font-semibold text-slate-700">
                Total Price: 
                <span className="text-sky-600 ml-2">
                  ${formattedTotalPrice.toFixed(2)}
                </span>
              </p>

              <div className="flex flex-wrap gap-4">
                <Checkout />
                <button
                  onClick={handleClearCart}
                  className="px-6 py-2 bg-slate-400 text-white font-semibold 
                  rounded-xl hover:bg-slate-500 transition-all duration-200 shadow-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
