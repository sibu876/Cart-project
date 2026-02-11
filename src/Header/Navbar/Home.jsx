import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart } from '../../redux/CartSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    document.title = "BargainBay - Home";
  }, []);

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
        if (!response.ok) throw new Error('Failed to fetch data');
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
    ? cartData.carts.flatMap(cart => cart.products)
    : [];

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
      <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-gray-50">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
          Welcome to <span className="text-green-500">BargainBay</span>
        </h1>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-gray-50">
        <p className="text-red-600 text-lg font-semibold">Something went wrong.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8 font-sans bg-gray-50">
      <h1 className="text-4xl font-extrabold tracking-wide mb-8 text-gray-800 text-center">
        Welcome to <span className="text-green-500">BargainBay</span>
      </h1>

      {flattenedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {flattenedProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="relative bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-4 flex flex-col"
            >
              {/* Discount Ribbon */}
              {product.discountPercentage > 0 && (
                <div className="absolute top-3 right-3 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 px-2 py-1 rounded-full shadow-md z-10">
                  {product.discountPercentage}% OFF
                </div>
              )}

              {/* Product Image */}
              <div
                className="h-40 w-full bg-center bg-cover rounded-xl mb-3 transition-transform duration-300 hover:scale-105"
                style={{ backgroundImage: `url(${product.thumbnail})` }}
              ></div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow text-gray-700">
                <h2 className="text-sm font-semibold truncate">{product.title}</h2>
                <p className="text-xs mt-1">
                  Price: <span className="font-medium">${product.price}</span>
                </p>
                <p className="text-xs">Qty: {product.quantity}</p>
                <p className="text-xs font-semibold text-green-600 mt-1">
                  Total: ${product.discountedTotal}
                </p>

                <div className="mt-auto flex flex-col gap-2 pt-3">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-xs py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleUser(product)}
                    className={`text-xs py-1 rounded-lg transition ${
                      cartItems.some(item => item.id === product.id)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {cartItems.some(item => item.id === product.id)
                      ? 'In Cart'
                      : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No products available.</p>
      )}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:w-96 relative shadow-2xl">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-xl font-bold text-gray-700 hover:text-gray-900"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {selectedProduct.title}
            </h3>

            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            {/* Discount in Modal */}
            {selectedProduct.discountPercentage > 0 && (
              <p className="text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 px-2 py-1 rounded-full inline-block mt-2">
                {selectedProduct.discountPercentage}% OFF
              </p>
            )}

            <p className="text-sm font-semibold text-green-600 mt-1">
              Total: ${selectedProduct.discountedTotal}
            </p>

            <button
              onClick={() => handleUser(selectedProduct)}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
