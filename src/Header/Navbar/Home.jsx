import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart } from '../../redux/CartSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useEffect(() =>{
    document.title="BargainBay-Home";
  },[]);

  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/carts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCartData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const flattenedProducts = cartData?.carts
    ? cartData.carts.flatMap((cart) => cart.products)
    : [];

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleGoBackToHome = () => {
    setSelectedProduct(null);
  };

  const handleUser = (product) => {
    if (!user) {
      sessionStorage.setItem('product', JSON.stringify(product));
      navigate('/login');
    } else {
      dispatch(addtoCart(product));
    }
  };
   
  if (loading) {
    return (
      <div className="mx-auto p-4 mt-5 max-w-screen flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-bold text-3xl mb-4">Welcome to Bargain<b className="text-green-500">BAY</b></h1>
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
        <p className="mt-4">Buffering...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto p-4 mt-5 max-w-screen">
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 3v.01M3 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8-8 3.582-8 8z"
              />
            </svg>
            <span className="font-semibold text-lg">Oops! Something went wrong.</span>
          </div>
          <div>
            <button
              onClick={() => window.location.reload()}  
              className="bg-white text-red-500 border border-red-500 rounded px-4 py-2 text-sm font-semibold hover:bg-red-100"
            >
              Try Again
            </button>
          </div>
        </div>
        <p className="text-center text-red-600 mt-4">Please try again later.</p>
      </div>
    );
  }
  

  return (
    <div className="mx-auto p-4 mt-5 max-w-screen">
      <h1 className='font-bold text-3xl'> Welcome to Bargain<b className='text-green-500'>BAY</b></h1>
      {flattenedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center mt-5 ml-20 mr-20">
          {flattenedProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="relative border border-gray-300 rounded-lg overflow-hidden shadow-lg p-2 mb-4"
              style={{
                height: 'auto', 
                width: '100%',  
              }}
            >
              <div className="flex flex-col h-full">
                <div
                  className="w-full h-36 bg-cover bg-center rounded mb-2"
                  style={{ backgroundImage: `url(${product.thumbnail})` }}
                ></div>

                <div className="flex flex-col justify-between p-2">
                  <div className="text-black">
                    <p className="text-sm font-semibold">{product.title}</p>
                    <p className="text-xs">Price: ${product.price}</p>
                    <p className="text-xs">Quantity: {product.quantity}</p>
                    <p className="text-xs">Total: ${product.total}</p>
                    <p className="text-xs">Discount: {product.discountPercentage}%</p>
                    <p className="text-xs">Discounted Total: ${product.discountedTotal}</p>
                  </div>
                  <div className="flex flex-col mt-2 gap-2">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleUser(product)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                    >
                     {cartItems.some(item => item.id === product.id) ? 'in Cart' : 'Add to Cart'}  
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <button onClick={closeModal} className="absolute top-2 right-2 text-xl font-bold text-gray-900">
              X
            </button>
            <h3 className="text-2xl font-semibold mb-4">{selectedProduct.title}</h3>
            <div className="mb-4">
              <img
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="font-medium">Price: ${selectedProduct.price}</p>
              <p className="font-medium">Discount: {selectedProduct.discountPercentage}%</p>
              <p className="font-medium">Discounted Total: ${selectedProduct.discountedTotal}</p>
              <p className="mt-4">{selectedProduct.description}</p>
            </div>
            <button
              onClick={() => handleUser(selectedProduct)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
            <button
              onClick={handleGoBackToHome}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Go Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
