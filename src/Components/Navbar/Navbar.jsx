import React, { useEffect, useState } from 'react';
import DarkLightToggle from '../DarkLightToggle/DarkLightToggle';
import { NavLink, useNavigate } from 'react-router-dom';
import fail from '../../assets/icon512_rounded.png'
import {jwtDecode} from 'jwt-decode';

export default function Navbar() {
    const [userData, setUserData] = useState("");
    const [show, setShow] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // حالة التحكم في القائمة
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("userToken");
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setUserData(decodedToken.statues);
                    setShow(true);
                } catch (error) {
                    console.error("Error decoding token:", error.message);
                }
            } else {
                setUserData("no");
                setShow(false);
            }
        };

        fetchData();
    }, []);

    function signout() {
        localStorage.clear();
        navigate("/");
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen); // تبديل حالة القائمة
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={fail} className="h-10" alt="Flowbite Logo" />
                </a>
                <button
                    onClick={toggleMenu}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <DarkLightToggle />
                {show && (
                    <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to="/addstudent" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">إضافة طالب</NavLink>
                            </li>
                            <li>
                                <NavLink to="/day" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">بداية يوم</NavLink>
                            </li>
                            <li>
                                <NavLink to="/prep" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">جميع السنوات</NavLink>
                            </li>
                            <li>
                                <button onClick={signout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign out</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
