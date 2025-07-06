import { useState, useEffect } from "react";

function Sources() {
    const [sources, setSources] = useState([]);

    useEffect(() => {
      const fetchData = () => {
        fetch("https://newsapi.org/v2/top-headlines/sources?language=en&apiKey=01ab4ae4f6e140b09bc457e57e2f5b0a")
          .then(res => res.json())
          .then(data => {
            if (data.status === "ok") {
              setSources(data.sources); // store the source key from api.
            } else {
              console.error("Error fetching data:", data.message);
            }
          })
          .catch(err => console.error("Error fetching data:", err));
      };

      fetchData();
    }, []);

    return (
      <div class="px-4 py-5 sm:px-6 lg:px-8 lg:py-10 mx-auto bg-gray-50">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
            {sources.map(source => (
                <div  key={source.id} class="bg-white shadow-lg rounded-xl hover:shadow-xl focus:outline-hidden focus:shadow-md transition hover:bg-black hover:text-white">
                    <div class="p-5">
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        <div class="flex flex-col items-center gap-3">
                            <h1>{source.name}</h1>
                        </div>
                      </a>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

export default Sources