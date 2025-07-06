import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Health() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch("https://newsapi.org/v2/top-headlines?category=health&pagesize=50&language=en&apiKey=01ab4ae4f6e140b09bc457e57e2f5b0a")
                .then(res => res.json())
                .then(data => {
                    if (data.status === "ok") {
                        setArticles(data.articles);
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
            <div class="px-4 py-5 sm:px-6 lg:px-8 lg:py-10 mx-auto bg-gray-50">
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
                    <Link to="/General_News_Page" id="general-news">
                        <div class="bg-white shadow-lg rounded-xl hover:shadow-xl focus:outline-hidden focus:shadow-md transition ">
                            <div class="p-5">
                                <div class="flex flex-col items-center gap-3">
                                    <img class="size-9.5 rounded" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/icons/general.png" alt="Avatar" />
                                    General
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/Business_News" id="business-news" >
                        <div class="bg-white shadow-lg rounded-xl hover:shadow-xl focus:outline-hidden focus:shadow-md transition ">
                            <div class="p-5">
                                <div class="flex flex-col items-center gap-3">
                                    <img class="size-9.5 rounded" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/icons/business.png" alt="Avatar" />
                                    Business
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/Sports_news" id="sports-news">
                        <div class="bg-white shadow-lg rounded-xl hover:shadow-xl focus:outline-hidden focus:shadow-md transition ">
                            <div class="p-5">
                                <div class="flex flex-col items-center gap-3">
                                    <img class="size-9.5 rounded" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/icons/sports.png" alt="Avatar" />
                                    Sports
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/Technology_News" id="technology-news">
                        <div class="bg-white shadow-lg rounded-xl hover:shadow-xl focus:outline-hidden focus:shadow-md transition ">
                            <div class="p-5">
                                <div class="flex flex-col items-center gap-3">
                                    <img class="size-9.5 rounded" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/icons/tech.png" alt="Avatar" />
                                    Technology
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/Health_News" id="health-news">
                        <div class="bg-white shadow-lg rounded-xl hover:shadow-xl focus:outline-hidden focus:shadow-md transition ">
                            <div class="p-5">
                                <div class="flex flex-col items-center gap-3">
                                    <img class="size-9.5 rounded" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/icons/health.png" alt="Avatar" />
                                    Health
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/Science_News" id="science-news">
                        <div class="bg-white shadow-lg rounded-xl hover:shadow-xl focus:outline-hidden focus:shadow-md transition ">
                            <div class="p-5">
                                <div class="flex flex-col items-center gap-3">
                                    <img class="size-9.5 rounded" src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/icons/science.png" alt="Avatar" />
                                    Science
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div class="mx-auto p-5 sm:p-10 md:p-16">
                <div class="border-b mb-5 flex justify-between text-sm">
                    <div class="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
                        <a class="font-semibold inline-block">General News</a>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {articles.map((article, index) => (
                    <div className="p-2  flex flex-row">
                        <div class="rounded overflow-hidden shadow-lg flex flex-col" key={index}>                    
                            <div class="relative"><a href={article.url} target="_blank">
                                    <img class="w-full h-[200px] object-cover"
                                        src={article.urlToImage}
                                        alt={article.title} />
                                    <div
                                        class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                    </div>
                                </a>
                                <a>
                                    <div
                                        class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                        {article.source.name}
                                    </div>
                                </a>
                            </div>
                            <div class="px-6 py-4 mb-auto">
                                <a href={article.url} target="_blank"
                                    class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{article.title}</a>
                                <p class="text-gray-500 text-sm">
                                    {article.description}
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

export default Health;

