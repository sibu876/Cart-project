import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import {  signup} from '../../../redux/AuthSlice';


function Signup() {

  useEffect(() => {
    document.title = "Signup-Login"
  })

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [status, setStatusText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

     if(isValid){
      try {
        dispatch(signup({  user, email, password }));

        navigate('/Login'); 
      } catch (error) {
        console.log(error)
      }
    }


   
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">Enter your Name</label>
          <input
            id="user"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {userError && <p className="text-red-500 text-sm mt-1">{userError}</p>}
        </div>

        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter your email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter your password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>

      {status && <p className="text-center text-sm text-green-500 mt-4">{status}</p>}

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account? <NavLink to="/login" className="text-blue-500 hover:underline">Log in</NavLink>
      </p>
    </div>
  </div>
  );
}

export default Signup;
