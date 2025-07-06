import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function MyForm() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [Interests, setInterests] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !password || !acceptedTerms) {
            alert('Please fill out all required fields and accept terms.');
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        try {
            let result = await fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password: hashedPassword, Interests }),
                headers: { 'Content-Type': 'application/json' }
            })
            if (result) {
                alert("User registered successfully!");
            }
            setName('');
            setEmail('');
            setpassword('');
            setAcceptedTerms(false);
            setInterests([]);
            navigate('/');
        } catch (error) {
            const response = await axios.post('http://127.0.0.1:5000/login', { email });
            if (response.status === 200) {
                alert("The user with this email is already exist. Please Login instead!")
                navigate('/Form');
                return;
            }
        }
    };
    const handleButtonClick = (buttonValue) => {
        const updatedInterests = [...Interests];
        const index = updatedInterests.indexOf(buttonValue);
        if (index === -1) {
            updatedInterests.push(buttonValue);
        } else {
            updatedInterests.splice(index, 1);
        }
        setInterests(updatedInterests);
    };
    return (
        <div class="flex justify-center relative pt-10">
            <div class="rounded-2xl bg-white shadow-xl py-5">
                <div class="max-w-5xl max-sm:max-w-lg mx-auto p-8">
                    <div class="text-center mb-12 sm:mb-16">
                        <div class="mb-11">
                            <h1 class="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">Get into the 🔥 Zone.</h1>
                            <p class="text-gray-500 text-center text-base font-medium leading-6"> <i>⚡</i> Your Daily Dose of Knowledge <i>⚡</i> </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div class="grid sm:grid-cols-2 gap-8">
                            <div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoFocus
                                        required
                                        className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                                        placeholder='Enter your name'
                                    />
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                                        placeholder='Enter your email'
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        required
                                        className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                                        placeholder='Enter your password'
                                    />
                                </div>
                            </div>
                        
                            <div>
                                <div className="mb-12">
                                    <p className="font-semibold mb-6">Select the topics you want to read the most:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['All', 'Entertainment', 'Business', 'Science', 'Technology', 'Health', 'Sports'].map(topic => (
                                            <button
                                                key={topic}
                                                type="button"
                                                className={`px-4 py-2 rounded-full ${Interests.includes(topic) ? ' bg-black text-white' : 'bg-white text-gray-700'} text-center text-base font-medium rounded-full shadow-none hover:bg-black hover:text-white transition-all duration-100 border`}
                                                onClick={() => handleButtonClick(topic)}
                                            >
                                                {topic}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <input
                                        className="mr-2 h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                        type="checkbox"
                                        checked={acceptedTerms}
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        required
                                    />
                                    <span className="text-gray-700">I accept the terms and conditions</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-2 ">
                            <hr className="my-6 border-gray-500" />
                            <div className="mb-4 grid grid-cols-2 gap-8">
                            <button type="submit" className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full bg-black transition-all duration-500 shadow-none hover:shadow-xl mb-11">Submit</button>
                            <button type="submit" className="w-full h-12 text-black text-center text-base font-semibold leading-6 rounded-full border border-black transition-all duration-500 shadow-none hover:shadow-xl mb-11">Back to Home</button>
                            </div>
                            <div className="text-center">
                                <span className="text-gray-700">Already have an account? </span>
                                <Link to="/Form" className="text-black font-bold hover:underline">Sign in</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}