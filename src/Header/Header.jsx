import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/AuthSlice';
import { FaShoppingCart, FaHome } from 'react-icons/fa'; 

function Header() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handlelogout = () => {
        dispatch(logOut());
    }

    
    const cartItemCount = useSelector((state) => state.cart.items.length);  

    return (
        <div className="w-full fixed top-0 left-0 z-10 bg-yellow-100 text-cyan-900 ">
            <div className="mx-10 flex justify-between items-center ">
                <div className='items-center flex'>
                    <div className="w-20 mx-5 ">
                        <img src="/logo.jpeg" alt="LOGO" />
                    </div>
                    <h1 className="text-3xl font-bold text-blue-800 mx-4 tracking-wide animate-fadeIn">
                        Bargain<b className='text-yellow-400 italic'>Bay</b>
                    </h1>
                </div>

                <ul className="flex space-x-5 font-bold text-xl">
                    
                     <li>
                        <NavLink
                            to="/"
                            className="hover:text-green-600 transition duration-300 flex items-center space-x-2"
                        >
                            <FaHome className="text-2xl" />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className="hover:text-green-600 transition duration-300"
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/cart"
                            className="hover:text-green-600 transition duration-300 flex items-center space-x-2"
                        >
                            <FaShoppingCart className="text-2xl" />
                           
                            {cartItemCount > 0 && (
                                <span className="bg-red-600 text-white text-sm px-2 rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        {user ? (
                            <button
                                onClick={handlelogout}
                                className="text-cyan-1000 hover:text-red-600 transition duration-300"
                            >
                                Log Out
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className="text-cyan-1000 hover:text-green-600 transition duration-300"
                            >
                                Log In
                            </NavLink>
                            
                        )}
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>
    );
}

export default Header;
