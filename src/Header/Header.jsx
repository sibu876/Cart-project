import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/AuthSlice';
import { FaShoppingCart, FaHome, FaBars, FaTimes } from 'react-icons/fa';

function Header() {
    const user = useSelector((state) => state.auth.user);
    const cartItemCount = useSelector((state) => state.cart.items.length);
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logOut());
        setMenuOpen(false);
    };

    return (
        <div className="w-full fixed top-0 left-0 z-10 bg-yellow-100 text-cyan-900">
            <div className="mx-6 md:mx-10 flex justify-between items-center h-20">
                
                {/* Logo */}
                <div className="flex items-center">
                    <img src="/logo.jpeg" alt="LOGO" className="w-16 md:w-20 mr-3" />
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
                        Bargain<b className="text-yellow-400 italic">Bay</b>
                    </h1>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 font-bold text-xl">
                    <li>
                        <NavLink to="/" className="flex items-center space-x-2 hover:text-green-600">
                            <FaHome />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="hover:text-green-600">
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" className="flex items-center space-x-2 hover:text-green-600">
                            <FaShoppingCart />
                            {cartItemCount > 0 && (
                                <span className="bg-red-600 text-white text-sm px-2 rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        {user ? (
                            <button onClick={handleLogout} className="hover:text-red-600">
                                Log Out
                            </button>
                        ) : (
                            <NavLink to="/login" className="hover:text-green-600">
                                Log In
                            </NavLink>
                        )}
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className="md:hidden bg-yellow-100 px-6 py-4 space-y-4 font-bold text-lg">
                    <li>
                        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
                            Cart ({cartItemCount})
                        </NavLink>
                    </li>
                    <li>
                        {user ? (
                            <button onClick={handleLogout} className="text-red-600">
                                Log Out
                            </button>
                        ) : (
                            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                                Log In
                            </NavLink>
                        )}
                    </li>
                </ul>
            )}

            <Outlet />
        </div>
    );
}

export default Header;
