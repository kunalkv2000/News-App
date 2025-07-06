import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MyForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pwd, setpassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://the-news-daily.onrender.com/login', { email, pwd });
            if (response.status === 200) {
                console.log('User exists');
                alert("You're Logged In now!")
                // Save user info if needed
                // localStorage.setItem("token", response.data.token);
                // localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate('/');
                return;
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("User doesn't exist. Please SignUp instead!");
                navigate('/SignUp')
            } else {
                console.error('Error:', error);
                alert("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div class="flex justify-center relative">
            <div class="mx-auto max-w-lg px-6 lg:px-8 relative py-20">
                <div class="rounded-2xl bg-white shadow-xl">
                    <form onSubmit={handleSubmit} class="lg:p-11 p-7 mx-auto">
                        <div class="mb-11">
                        <h1 class="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">Hi 👋, Welcome Back.</h1>
                        <p class="text-gray-500 text-center text-base font-medium leading-6"> <i>⚡</i> Your Daily Dose of Knowledge <i>⚡</i> </p>
                        </div>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus required class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6" placeholder="demo@gmail.com"/>
                        <input type="password" value={pwd} onChange={(e) => setpassword(e.target.value)} required class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1" placeholder="Password"/>
                        <a class="flex justify-end mb-6">
                        <span class="mt-6 text-black text-right text-base font-normal leading-6">Forgot Password?</span>
                        </a>
                        <button class="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:shadow-xl transition-all duration-700 bg-black shadow-none mb-11">Login</button>
                        <a href="SignUp" class="flex justify-center text-gray-900 text-base font-medium leading-6"> Don’t have an account? <span class="text-black font-bold pl-3 "> Sign Up</span>
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
}
