import React from "react";
import '../index.css'
import { Link } from "react-router-dom";

export default function landingPage() {
    return (

        <>
            <header >
                <div className="text-blue-700 text-center text-6xl font-bold p-5 mt-[10%]">JobHub</div>
            </header>
            <nav>
                <ul className="flex justify-center space-x-[1%] pb-1">
                    <li className="text-gray-600 text-2xl font-medium hover:text-blue-700 group relative ">
                        <Link to="/LoginPage" className="m-2">Browse Jobs </Link>
                        <div className='absolute  w-full h-1 bg-blue-500 hidden group-hover:block transition-all '></div>
                    </li>
                    <li className="text-gray-600 text-2xl font-medium hover:text-blue-700 group relative ">
                        <Link to="/Companies" className="m-2">Companies </Link>
                        <div className='absolute  w-full h-1 bg-blue-500 hidden group-hover:block transition-all '></div>
                    </li>
                    <li className="text-gray-600 text-2xl font-medium hover:text-blue-700 group relative ">
                        <Link to="/LoginPage" className="m-2">Login</Link>
                        <div className='absolute  w-full h-1 bg-blue-500 hidden group-hover:block transition-all '></div>
                    </li>
                    <li className="text-gray-600 text-2xl font-medium hover:text-blue-700 group relative ">
                        <Link to="/SignupPage" className="m-2">Sign Up </Link>
                        <div className='absolute  w-full h-1 bg-blue-500 hidden group-hover:block transition-all '></div>
                    </li>
                </ul>
            </nav>

            <hr className="mx-auto border-2 border-gray-200" />


            <main className="w-full h-screen bg-gray-100 flex items-center justify-center">
                <div className="border h-[90%] rounded-3xl w-full p-2 bg-gradient-to-r from-sky-800 to-violet-900
">
                    <div className="text-white text-center text-5xl font-bold p-5 mt-10">
                        Find Your Dream Job
                    </div>
                    <div className="text-center text-white text-2xl font-medium">
                        Connect with top employers and discover opportunities that match your skills
                    </div>

                    <Link to="/LoginPage" className="rounded-xl bg-indigo-900 text-white font-medium text-2xl w-[20%] h-16 mt-7 mx-auto block hover:shadow-2xl hover:-translate-y-0.5 text-center content-center">
                        Find jobs
                    </Link>

                    <Link to="/LoginPage" className="rounded-xl bg-white text-indigo-800 font-medium text-2xl w-[20%] h-16 mt-7 mb-10 mx-auto block hover:shadow-2xl hover:-translate-y-0.5 text-center content-center">
                        Post a Job
                    </Link>
                </div>
            </main>
        </>




    )
}