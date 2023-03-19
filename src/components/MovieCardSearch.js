import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContex";
import { db } from "../Firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

function MovieCardSearch({ handleMovieSelect, movie }) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

  const { user } = UserAuth();
  // referencing curent user email
  const movieID = doc(db, "users", `${user?.email}`);
  // pomocu array union update array in fuirebase

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("Please log in and save movie!");
    }
  };

  return (
    <div
      className=" relative w-full h-[200px] cursor-pointer inline-block p-2"
      onClick={() => handleMovieSelect(movie)}
    >
      <img
        className="w-full h-full object-cover "
        src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
      />

      <div className=" absolute  w-full h-full top-0 left-0 opacity-0 flex justify-center items-center bg-black/80 hover:opacity-100">
        <p
          onClick={saveShow}
          className="absolute top-4 left-4 text-white text-xl"
        >
          {like ? <FaHeart /> : <FaRegHeart />}
        </p>
      </div>
      <p className="text-white text-xl my-4">{movie?.title}</p>
    </div>
  );
}

export default MovieCardSearch;
