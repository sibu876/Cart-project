import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { forgotPassword } from '../../../redux/AuthSlice';

function Forgotpassword() {

  useEffect(() => {
    document.title = "Signup-Login";
  });

  const [genrateOtp, setGenrateOtp] = useState(null);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otperror, setOtperror] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [status, setStatusText] = useState('');
  const [step, setStep] = useState(1); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genotp = () => Math.floor(100000 + Math.random() * 900000);

  const handleSendOtp = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    const otpcode = genotp();
    setGenrateOtp(otpcode);
    emailjs.send(
      "service_co7g87i",
      "template_w1zrk0n",
      { email, otp: otpcode },
      "P1byZN1EtSb-JINrC"
    )
    .then(() => {
      alert("OTP sent");
      setStep(2);
    })
    .catch(() => {
      alert('Error sending OTP');
    });
  };

 
  const handleVerifyOtp = () => {
    if (otp === String(genrateOtp)) {
      alert("OTP verified successfully");
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

 
  const handleChangePassword = () => {
    if (password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }
    dispatch(forgotPassword({ email, password }));
    setPassword("");
    alert("Password changed successfully, please login with your new password");
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

        <form onSubmit={(e) => e.preventDefault()}>

          {step === 1 && (
            <div>
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
              <button
                type="button"
                className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP:</label>
                <input
                  id="otp"
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {otperror && <p className="text-red-500 text-sm mt-1">{otperror}</p>}
              </div>
              <button
                type="button"
                className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter your new password:</label>
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
                type="button"
                className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
