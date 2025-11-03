import React, { useState, useEffect } from 'react';
import './main.css';
import { Zap, Menu, X, Coins } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()

    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currUser, setCurrUser] = useState("");

    // Detect scroll to change navbar style
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check localStorage for login state
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        setIsLoggedIn(!!userEmail);
        if (userEmail) {
            setCurrUser(userEmail)
        }
    }, []);

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setIsMenuOpen(false);
        navigate("/login")
    };

    return (
        <>
            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Zap className="w-8 h-8 text-orange-600" fill="currentColor" />
                                <div className="absolute inset-0 animate-ping opacity-20">
                                    <Zap className="w-8 h-8 text-orange-600" fill="currentColor" />
                                </div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                                RevoCharge
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {isLoggedIn ? (
                                <>

                                    <Link to={`/${currUser}/home`} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                                        Home
                                    </Link>
                                    <Link to={`/${currUser}/plans`} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                                        Plans
                                    </Link>
                                    <Link to={`/${currUser}/data_sharing`} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                                        Data-Sharing
                                    </Link>
                                    

                                    <div className="flex items-center gap-3 px-2 py-1 border-2 border-amber-400 rounded-lg">
                                        <div className='flex gap-1'>
                                            <Coins className="text-orange-600" fill="currentColor" />
                                            <h2 className=' text-orange-600 font-extrabold'>Credits</h2>
                                        </div>
                                        123
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg cursor-pointer"
                                    >
                                        Logout
                                    </button>

                                </>
                            ) : (
                                <>

                                    <Link to={"/login"}>
                                        <button className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors cursor-pointer">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to={"/signup"}>
                                        <button className="px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg cursor-pointer">
                                            Sign Up
                                        </button>
                                    </Link>

                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 py-3 space-y-3">
                            {isLoggedIn ? (
                                <>
                                    <a href="#home" className="block text-gray-700 hover:text-orange-600 font-medium">
                                        Home
                                    </a>
                                    <a href="#plans" className="block text-gray-700 hover:text-orange-600 font-medium">
                                        Plans
                                    </a>
                                    <a href="#data-sharing" className="block text-gray-700 hover:text-orange-600 font-medium">
                                        Data-Sharing
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-orange-600 border border-orange-600 rounded-full font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="w-full px-4 py-2 text-orange-600 border border-orange-600 rounded-full font-medium">
                                        Login
                                    </button>
                                    <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full">
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
