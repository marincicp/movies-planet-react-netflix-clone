import requests from "../Requests";
import Row from "./Row";

function ExploreMovies({ handleMovieSelect }) {
  return (
    <div>
      <Row
        handleMovieSelect={handleMovieSelect}
        title="Upcoming"
        fetchURL={requests.requestUpcoming}
      />
      <Row
        handleMovieSelect={handleMovieSelect}
        title="Popular"
        fetchURL={requests.requestPopular}
      />
      <Row
        handleMovieSelect={handleMovieSelect}
        title="Trending"
        fetchURL={requests.requestTrending}
      />
      <Row
        handleMovieSelect={handleMovieSelect}
        title="Top Related"
        fetchURL={requests.requestTopRated}
      />{" "}
    </div>
  );
}

export default ExploreMovies;
