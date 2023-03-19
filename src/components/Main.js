import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContex";
import { db } from "../Firebase";
import Modal from "./Modal";
import { fetchFromAPI } from "../apis/youtube";

function Main({ randomShowMovie }) {
  // const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = UserAuth();

  const closeModal = () => {
    setShowModal(false);
  };

  //
  const onClickPlayTrailer = async (query) => {
    setShowModal(true);
    const res = await fetchFromAPI(`search?part=snippet&q=${query}`);

    setVideoSrc(res.items[0].id.videoId);
  };

  const movieID = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    setSearchTerm(randomShowMovie?.title);
  }, [randomShowMovie]);

  const addToWatchlist = async () => {
    if (user?.email) {
      await updateDoc(movieID, {
        watchlist: arrayUnion({
          id: randomShowMovie.id,
          title: randomShowMovie.title,
          img: randomShowMovie.backdrop_path,
        }),
      });

      alert("Movie added to your watch list!");
    } else {
      alert("Please log in and save movie!");
    }
  };

  const movieSliceDescription = (str) => {
    if (str?.length > 250) {
      return str.slice(0, 180) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-[650px] bg-red-200">
      <div className="w-full h-full text-white">
        {" "}
        <div className="w-full h-[650px] absolute bg-gradient-to-r from-black">
          {" "}
        </div>
        <img
          className="w-full h-full top-0 object-cover"
          alt={randomShowMovie?.title}
          src={`https://image.tmdb.org/t/p/original/${randomShowMovie?.backdrop_path}`}
        />
        <div className="w-full md:[70%] h-[300px] absolute top-[20%] md:w-[80%]  p-8">
          <h1 className="text-white font-bold text-3xl md:text-5xl mb-5">
            {randomShowMovie?.title}
          </h1>

          <div>
            <button
              onClick={() => onClickPlayTrailer(searchTerm)}
              className="text-base md:text-2xl text-black px-6 py-2 bg-gray-200 transition-all duration-150 mr-5 hover:bg-gray-400"
            >
              Play
            </button>
            <button
              onClick={addToWatchlist}
              className="text-base md:text-2xl px-6 py-2 border-2 text-white transition-all duration-400 border-gray-200 hover:bg-gray-300 hover:text-black "
            >
              Add to Watch list
            </button>
          </div>
          <div
            className="flex gap-4 flex-col mt-6 text-xl text-gray-200
          "
          >
            <p className="text-base sm:text-xl">
              Released : <span>{randomShowMovie?.release_date}</span>
            </p>

            <p className="text-base sm:text-xl">
              Rating : <span>{randomShowMovie?.vote_average} / 10</span>
            </p>

            <p className="w-full text-base sm:text-xl md:w-[90%] leading-relaxed tracking-wide ">
              {movieSliceDescription(randomShowMovie?.overview)}
            </p>
          </div>
        </div>
        {showModal && <Modal closeModal={closeModal} videoSrc={videoSrc} />}
      </div>
    </div>
  );
}

export default Main;
