import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { login } from '../../../redux/AuthSlice';
import { addtoCart } from '../../../redux/CartSlice';

function Login() {
  const user = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [status, setStatusText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const savedProduct = sessionStorage.getItem('product');
      if (savedProduct) {
        const product = JSON.parse(savedProduct);
        dispatch(addtoCart(product));
        sessionStorage.removeItem('product');
      }
    }
  }, [user, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email.endsWith('@gmail.com')) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        dispatch(login({ email, password }));
        navigate('/cart');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side - hidden on small screens */}
      <div className="hidden md:flex w-1/2 relative bg-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-yellow-400 opacity-80"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
            Welcome Back!
          </h1>
          <p className="text-lg font-medium drop-shadow-md">
            Log in to continue shopping and enjoy exclusive offers.
          </p>
        </div>
      </div>

      {/* Right Side Full Card */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <div className="w-full min-h-screen p-6 md:p-12 flex flex-col justify-center">
          <div className="bg-white shadow-xl rounded-none md:rounded-xl p-6 md:p-10 w-full h-full flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-700">
              Sign In
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-1 md:mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-1 md:mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 md:py-4 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Log In
              </button>
            </form>

            {status && (
              <p className="text-center text-green-500 mt-4">{status}</p>
            )}

            <div className="mt-6 md:mt-8 text-center text-gray-600">
              <p>
                Forgot your password?{' '}
                <NavLink
                  to="/Forgotpassword"
                  className="text-yellow-400 hover:underline"
                >
                  Reset here
                </NavLink>
              </p>
              <p className="mt-4">
                Don't have an account?{' '}
                <NavLink
                  to="/signup"
                  className="text-yellow-400 hover:underline"
                >
                  Sign up
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
