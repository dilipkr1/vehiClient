import React, { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);

   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=0d8d0d1474f04bf79d960e9a173d94f5",
          {
            headers: {
              "X-Api-Key": "0d8d0d1474f04bf79d960e9a173d94f5",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap  pt-20 mt-10 lg:px-20 lg:mx-10">
      {news.map((article) => (
        <div
          key={article.title}
          className="bg-white overflow-hidden border-b-4 border-blue-500 lg:w-1/3 m-4"
        >
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full object-cover h-32 sm:h-48 md:h-64"
          />
          <div className="p-4 md:p-6">
            <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
              {article.title}
            </h3>
            <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">
              {article.description}
            </p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Read More
              </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
