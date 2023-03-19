import { useEffect, useState } from "react";
import Main from "../components/Main";

import requests from "../Requests";
import axios from "axios";

import SearchMovie from "../components/SearchMovie";
import { IoSearchSharp, IoStarSharp } from "react-icons/io5";
import ExploreMovies from "../components/ExploreMovies";

function Home() {
  const [showExplore, setShowExplore] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClick = () => {
    setShowExplore(!showExplore);
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const getMovies = async () => {
      const res = await axios.get(requests.requestPopular);

      setSelectedMovie(res.data.results[Math.floor(Math.random() * 20)]);
    };
    getMovies();
  }, []);

  return (
    <>
      <Main randomShowMovie={selectedMovie} />

      <div className="px-4 my-8 flex  justify-center md:justify-start">
        <button
          onClick={handleClick}
          className="text-white text-sm px-4 py-2 bg-transparent border-solid border-white border-2 transition-all duration-150 hover:bg-gray-700 sm:text-xl mr-6 flex gap-2 items-center justify-center"
          disabled={showExplore}
        >
          <IoStarSharp size={24} />
          <span>Explore Movies</span>
        </button>

        <button
          disabled={showSearch}
          onClick={handleClick}
          className="text-white px-4 py-2 bg-transparent transition-all duration-150 hover:bg-gray-700 text-sm sm:text-xl mr-6 flex gap-2 items-center border-white border-2 border-solid justify-center"
        >
          <IoSearchSharp size={24} />
          <span>Search for Movies</span>
        </button>
      </div>

      {showExplore ? (
        <ExploreMovies handleMovieSelect={handleMovieSelect} />
      ) : (
        <SearchMovie handleMovieSelect={handleMovieSelect} />
      )}
    </>
  );
}

export default Home;
