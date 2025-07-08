import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                return;
            }
            // Try to get email from localStorage (set at login)
            const email = localStorage.getItem("email");
            if (email) {
                try {
                    const res = await axios.get(`https://the-news-daily.onrender.com/user?email=${encodeURIComponent(email)}`);
                    setUser(res.data.user);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                } catch (err) {
                    setUser(null);
                }
            }
        };
        window.addEventListener('storage', fetchUser);
        fetchUser();
        return () => window.removeEventListener('storage', fetchUser);
    }, []);

    const handleSearch = () => {
        const searchQuery = document.getElementById('newsQuery').value;
        // For demonstration purposes, log the search query to the console
        console.log("Search query:", searchQuery);
        // You can further process the search query (e.g., fetch search results from API)
    };
    
    return (
      <>
        <header class="relative py-4 md:py-6 bg-gray-50">
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div class="flex items-center justify-between">
                  <div class="flex-shrink-0">
                      <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/" id="general">
                        <a title="" class="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                            <img class="w-auto h-12" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/logo-header.png" alt="" />
                        </a>
                      </Link>
                  </div>

                  <div class="flex lg:hidden">
                      <button type="button" class="text-gray-900">
                          <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                          </svg>
                      </button>
                  </div>

                  <div class="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10">
                      <div class="flex items-center space-x-12">
                          <a href="#" title="" class="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/" id="general">Home</Link> </a>

                          <a href="#" title="" class="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> <Link className={`nav-link ${location.pathname === "/Contact" ? "active" : ""}`} to="/Contact" id="contact">Contact</Link> </a>

                          <a href="#" title="" class="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About" id="about">About</Link> </a>

                          <a href="#" title="" class="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> <Link className={`nav-link ${location.pathname === "/News_Sources" ? "active" : ""}`} to="/News_Sources" id="sources">Sources</Link> </a>
                      </div>

                      <div class="w-px h-5 bg-gray-300"></div>

                      {user ? (
                          <span class="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                            <Link className={`nav-link ${location.pathname === "/Profile" ? "active" : ""}`} to="/Profile" id="profile">{user.name}</Link>
                          </span>
                        ) : <Link className={`nav-link ${location.pathname === "/Form" ? "active" : ""}`} to="/Form" id="profile">Login</Link>}

                                              {user ? (
                          <button
                            class="px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              localStorage.removeItem('user');
                              localStorage.removeItem('email');
                              window.location.href = '/';
                            }}
                          >
                            Sign Out
                          </button>
                        ) : (
                          <a title="" class="px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white" role="button" >
                            <Link className={`nav-link ${location.pathname === "/SignUp" ? "active" : ""}`} to="/SignUp" id="form">Create Free Acount</Link>
                          </a>
                        )}
                  </div>
              </div>
          </div>
        </header>                                          
      </>
    );
}
