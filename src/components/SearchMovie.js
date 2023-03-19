import { useState } from "react";
import axios from "axios";
import requests from "../Requests";
import MovieCardSearch from "./MovieCardSearch";

function SearchMovie({ handleMovieSelect }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    getMovies(query);
    setQuery("");
  };

  const getMovies = async (query) => {
    const res = await axios.get(`${requests.requestQuery}&query=${query}`);
    setMovies(res.data.results.slice(0, 15));
  };

  return (
    <>
      <div className="w-full h-[600px] mt-6 mb-7">
        <form
          onSubmit={handleSubmit}
          className="w-full  px-4 md:w-[400px] h-[50px] flex justify-center items-center mx-auto my-10"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-[70%] inline-block border-0 h-full py-2 px-4 rounded-tl-lg rounded-bl-lg focus:outline-none text-xl"
          />{" "}
          <button className="w-[30%] inline-block border-0 h-full  rounded-tr-lg rounded-br-lg  focus:outline-none text-xl items-center  justify-center transition-all text-white duration-300 bg-red-600 hover:bg-red-800">
            Search
          </button>
        </form>

        <div className="w-[80%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-center gap-x-5 items-center gap-y-20 mx-auto">
          {movies.map((movie) => {
            return (
              <MovieCardSearch
                handleMovieSelect={handleMovieSelect}
                key={movie.id}
                movie={movie}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SearchMovie;
