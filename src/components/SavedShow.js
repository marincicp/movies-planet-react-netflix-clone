import { useRef, useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContex";
import { db } from "../Firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

function SavedShows() {
  const [movies, setMovies] = useState([]);

  const { user } = UserAuth();

  let slider = useRef();

  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };

  const slideRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  //trenutni user
  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const updatedMovies = movies.filter((movie) => movie.id !== passedID);

      await updateDoc(movieRef, {
        savedShows: updatedMovies,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="px-4 py-6">
        <h2 className="text-white text-xl md:text-2xl font-bold">
          My Favorite Shows
        </h2>
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
                <div
                  key={movie?.id}
                  className="relative w-[200px] sm:w-[300px] md:h-[200px] h-[200px] cursor-pointer p-2 inline-block"
                >
                  <img
                    alt={movie?.title}
                    className="w-full h-full object-cover "
                    src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                  />
                  <div className="absolute w-full h-full top-0 left-0 opacity-0 bg-black/80 hover:opacity-100">
                    <p className="text-white w-full h-full text-xl flex justify-center items-center">
                      {movie?.title}
                    </p>
                    <p
                      onClick={() => deleteShow(movie.id)}
                      className="absolute top-4 right-4 text-white"
                    >
                      <AiOutlineClose />
                    </p>
                  </div>{" "}
                </div>
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
    </div>
  );
}

export default SavedShows;
