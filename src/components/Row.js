import { useEffect, useState, useRef } from "react";
import requests from "../Requests";
import MovieCard from "./MovieCard";
import axios from "axios";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Row({ title, fetchURL, handleMovieSelect }) {
  const [movies, setMovies] = useState([]);
  let slider = useRef();

  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };

  const slideRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };

  useEffect(() => {
    const getMovies = async (url) => {
      const res = await axios.get(url);
      setMovies(res.data.results);
    };

    getMovies(fetchURL);
  }, [fetchURL]);

  return (
    <div className="px-4 py-6">
      <h2 className="text-white text-xl md:text-2xl font-bold">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="absolute hidden bg-white left-0 rounded-full opacity-60 z-10 hover:opacity-100 cursor-pointer active:scale-105 group-hover:block"
        />
        <div
          ref={slider}
          className="relative w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => {
            return (
              <MovieCard
                movie={movie}
                handleMovieSelect={handleMovieSelect}
                key={movie.id}
              />
            );
          })}
        </div>{" "}
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="absolute hidden right-0 bg-white rounded-full opacity-60 z-10 hover:opacity-100 cursor-pointer active:scale-105 group-hover:block"
        />
      </div>
    </div>
  );
}

export default Row;
