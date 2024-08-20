import React, { useState } from 'react';
import logo from '../assets/IRCTC-Logo.png';
import irl from '../assets/irlogo.png';
import { Link } from 'react-router-dom';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const formatDate = () => {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const currentDate = formatDate();
    return (
        <nav className="bg-white border-b p-2 shadow-md" style={{ borderBottom: '2px solid #D9D9D9' }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <img className="h-14 w-auto" src={irl} alt="Company Logo" />
                    </div>
                    <div className="hidden sm:flex sm:space-x-4 uppercase font-bold ">
                        <Link
                            to="/"
                            className="rounded-md px-3 py-2 text-sm   hover:text-indigo-800"
                        >
                            Home
                        </Link>
                        <Link
                            to="/dashboard"
                            className="rounded-md px-3 py-2 text-sm   hover:text-indigo-800"
                        >
                            Trains
                        </Link>
                        <Link
                            to="/"
                            className="rounded-md px-3 py-2 text-sm  bg-indigo-900 text-white"
                        >
                            Login
                        </Link>
                        <Link
                            to="/"
                            className="rounded-md px-3 py-2 text-sm   hover:text-indigo-800"
                        >
                            Register
                        </Link>
                        <Link
                            to="/"
                            className="rounded-md px-3 py-2 text-sm   hover:text-indigo-800"
                        >
                            Agent Login
                        </Link>


                    </div>
                    <div className="hidden sm:flex sm:space-x-4 uppercase font-bold">
                        <Link
                            to="/"
                            className="rounded-md px-3 py-2 text-sm   hover:text-indigo-800"
                        >
                            Contact us
                        </Link>
                        <Link
                            to="/"
                            className="rounded-md px-3 py-2 text-sm   hover:text-indigo-800"
                        >
                            alerts
                        </Link>

                    </div>
                    <div className="hidden sm:flex sm:space-x-4 uppercase font-bold">
                        <span className="rounded-md px-3 py-2 text-sm bg-indigo-900 text-white ">
                            {currentDate}
                        </span>
                        <Link
                            to="/"
                            className="rounded-md px-3 py-2 text-sm   hover:text-indigo-800"
                        >
                            Promotions
                        </Link>
                        <Link
                            to="/"
                            className="rounded-md px-3 py-2 text-sm   hover:text-indigo-800"
                        >
                            More
                        </Link>

                    </div>
                    <div className="flex items-center">
                        <img className="h-14 w-auto" src={logo} alt="Right Logo" />
                    </div>
                    <div className="sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={menuOpen ? "true" : "false"}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${menuOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <svg className={`${menuOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${menuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2 uppercase">
                    <Link to="/" className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white">
                        Home
                    </Link>
                    <Link to="/dashboard" className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white">
                        Trains
                    </Link>
                    <Link
                        to="/"
                        className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white"
                    >
                        Login
                    </Link>
                    <Link
                        to="/"
                        className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white"
                    >
                        Register
                    </Link>
                    <Link
                        to="/"
                        className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white"
                    >
                        Agent Login
                    </Link>
                    <Link
                        to="/"
                        className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white"
                    >
                        Contact us
                    </Link>
                    <Link
                        to="/"
                        className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white"
                    >
                        alerts
                    </Link>
                    <span className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white ">
                        {currentDate}
                    </span>
                    <Link
                        to="/"
                        className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white"
                    >
                        Promotions
                    </Link>
                    <Link
                        to="/"
                        className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white"
                    >
                        More
                    </Link>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
