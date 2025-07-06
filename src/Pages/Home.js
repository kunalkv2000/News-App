import React from 'react';
import Header from './Header';
import About from './About';
import Contact from './Contact';
import MyForm from './Form';
import Sources from './News_Sources';
import Business from './Business_News';
import Sports from './Sports_news';
import Tech from './Technology_News';
import Health from './Health_News';
import General from './General_News_Page';
import SignUp from './SignUp';
import Footer from './footer';
import Science from './Science_News';
import Categories from './Categories';
import { useEffect, useState } from "react";
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Form" element={<MyForm />} />
          <Route path="/News_Sources" element={<Sources />} />
          <Route path="/Business_News" element={<Business />} />
          <Route path="/Sports_news" element={<Sports />} />
          <Route path="/Technology_News" element={<Tech />} />
          <Route path="/Health_News" element={<Health />} />
          <Route path="/General_News_Page" element={<General />} />
          <Route path="/Science_News" element={<Science />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Categories" element={<Categories />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

function HomePage() {
  const [article1, setArticles1] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      fetch("https://newsapi.org/v2/top-headlines?category=general&language=en&pagesize=4&apiKey=01ab4ae4f6e140b09bc457e57e2f5b0a")
        .then(res => res.json())
        .then(data => {
          if (data.status === "ok") {
            setArticles1(data.articles);
          } else {
            console.error("Error fetching data:", data.message);
          }
        })
        .catch(err => console.error("Error fetching data:", err));
    };

    fetchData();
  }, []);

  return (
    <div>
      
      <div class="relative bg-gray-50">
          <div class="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
              <img class="w-auto h-full" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/background-pattern.png" alt="" />
          </div>

          <section class="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div class="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5 ">
                <div class="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
                  <div class="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                      <h1 class="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">Get <span class="px-2 text-white bg-black rounded-lg">In-Depth</span> Coverage On <span class="px-2 text-white bg-black rounded-lg">Global</span> Headlines</h1>

                      <div class="mt-8 lg:mt-12 lg:flex lg:items-center">
                          <div class="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
                              <img class="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/avatar-male.png" alt="" />
                              <img class="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/avatar-female-1.png" alt="" />
                              <img class="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/avatar-female-2.png" alt="" />
                          </div>

                          <p class="mt-4 text-lg text-gray-900 lg:mt-0 lg:ml-4 font-pj">Join with <span class="font-bold">4600+ Subscribers</span> and know the <span class="font-bold"> Breaking News Updates </span> Getstarted right now</p>
                      </div>
                  </div>

                  <div class="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                      <Link to="/General_News_Page" id="general-news">
                      <a
                        title=""
                        class="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600"
                        role="button"
                      >
                        Get Started
                      </a>
                      </Link>

                      <Link to="/SignUp" id="form">
                      <a
                        title=""
                        class="inline-flex items-center px-4 py-4 mt-4 text-lg font-bold transition-all duration-200 bg-transparent border border-transparent sm:mt-0 font-pj justif-center rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-200 focus:bg-gray-200"
                        role="button"
                      >
                        Create Free Account
                      </a>
                      </Link>
                  </div>
                </div>
                
                <div class="xl:col-span-3">
                    <img class="mx-auto p-5 rounded-lg mx-auto scale-110 " src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/news.png" />
                </div>
              </div>
            </div>
          </section>
      </div>

      <section class="py-12 bg-white sm:py-16 lg:py-20 bg-linear-to-b from-gray-50 to-white">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="xl:flex xl:items-center xl:justify-between">
                <h2 class="text-xl font-semibold text-center text-black xl:text-left font-pj">1000+ Big brands trust us</h2>

                <div class="grid grid-cols-2 mt-10 gap-6 xl:mt-0 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">                    
                    <img class="object-contain w-auto mx-auto h-15" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/ESPN.jpg" alt="ESPN" />
                    <img class="object-contain w-auto mx-auto h-15" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/cnbc.png" alt="CNBC" />
                    <img class="object-contain w-auto mx-auto h-15" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/BBC.png" alt="BBC" />
                    <img class="object-contain w-auto mx-auto h-15" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/twp.jpg" alt="TWP" />
                </div>
            </div>
        </div>
      </section>

      <div class="mx-auto p-5 sm:p-10 md:p-16">
        <div class="border-b mb-5 flex justify-between text-sm">
            <div class="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
                <a class="font-semibold inline-block">General News</a>
            </div>
            <Link to="/General_News_Page" id="general-news">See all</Link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {article1.map((article1, index) => (
            <div className="p-2  flex flex-row">
            <div class="rounded overflow-hidden shadow-lg flex flex-col" key={index}>                    
                <div class="relative"><a href={article1.url} target="_blank">
                        <img class="w-full h-[200px] object-cover"
                            src={article1.urlToImage}
                            alt={article1.title} />
                        <div
                            class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>
                    </a>
                    <a>
                        <div
                            class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            {article1.source.name}
                        </div>
                    </a>
                </div>
                <div class="px-6 py-4 mb-auto">
                    <a href={article1.url} target="_blank"
                        class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{article1.title}</a>
                    <p class="text-gray-500 text-sm">
                        {article1.description}
                    </p>
                </div>
            </div>
            </div>
            ))}
        </div>
      </div>
      
    </div>
  );
}

export default Home;