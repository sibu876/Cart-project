import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { signup } from '../../../redux/AuthSlice';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Signup - Login";
  }, []);

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [status, setStatusText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!user) {
      setUserError('Please enter a username');
      isValid = false;
    } else {
      setUserError('');
    }

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
        dispatch(signup({ user, email, password }));
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 relative bg-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-yellow-400 opacity-80"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
            Join Us Today!
          </h1>
          <p className="text-lg font-medium drop-shadow-md">
            Create your account to enjoy seamless shopping and exclusive offers.
          </p>
        </div>
      </div>

      {/* Right Side Full Card */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <div className="w-full h-full p-12 flex flex-col justify-center">
          <div className="bg-white shadow-xl rounded-xl p-10 w-full h-full flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700">
              Sign Up
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Username */}
              <div>
                <label
                  htmlFor="user"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Username
                </label>
                <input
                  id="user"
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {userError && (
                  <p className="text-red-500 text-sm mt-1">{userError}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Sign Up
              </button>
            </form>

            {status && (
              <p className="text-center text-green-500 mt-4">{status}</p>
            )}

            <div className="mt-8 text-center text-gray-600">
              <p>
                Already have an account?{' '}
                <NavLink
                  to="/login"
                  className="text-yellow-400 hover:underline"
                >
                  Log in
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
