import { Routes,Route,Link } from 'react-router-dom'
import Home from './Header/Navbar/Home'
import About from './Header/Navbar/About'
import Cart from './Header/Navbar/Cart'
import Login from './Header/Navbar/login-signup/Login'
import Signup from './Header/Navbar/login-signup/Signup'
import Header from './Header/Header'

import { useSelector } from 'react-redux'



import './App.css'
import Footer from './Footer/Footer'
import Forgotpassword from './Header/Navbar/login-signup/Forgotpassword'

function App() {
  
  const user = useSelector((state) => state.auth.user);

  return (
    <>
    <div className="pt-20">
    


    <Header/>
     <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      {user ? (
            <Route path="/cart" element={<Cart />} />
          ) : (
            <Route
              path="/cart"
              element={
                <div className="flex justify-center items-center w-full h-screen bg-blue-100">
                  <div className="w-full sm:w-3/4 lg:w-1/2 bg-white p-8 rounded-lg shadow-lg text-center">
                    <p className="text-xl font-semibold text-gray-700 mb-4">
                      You need to log in to access the Cart page.
                    </p>
                    <Link
                      to="/login"
                      className="inline-block px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              }
            />
          )}
      
     
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/Forgotpassword" element={<Forgotpassword/>}/>
     </Routes>
     <Footer/>
     </div>
    </>
  )
}

export default App
