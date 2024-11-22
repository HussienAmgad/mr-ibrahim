import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Choose() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                <NavLink 
                    to="Loginstudent" 
                    className="group block max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:bg-indigo-600 hover:text-white hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <div className="text-center">
                        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-white">
                            Student
                        </h5>
                    </div>
                </NavLink>
                <NavLink 
                    to="Loginassistant" 
                    className="group block max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:bg-blue-600 hover:text-white hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <div className="text-center">
                        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-white">
                            Assistant
                        </h5>
                    </div>
                </NavLink>
                <NavLink 
                    to="LoginMr" 
                    className="group block max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:bg-teal-600 hover:text-white hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <div className="text-center">
                        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-white">
                            Mr Ibrahim
                        </h5>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
