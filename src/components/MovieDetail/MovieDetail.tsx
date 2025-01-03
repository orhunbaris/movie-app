import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../../utils/fetch-movie-detail";
import "./MovieDetail.scss";

interface MovieDetailProps {
  movie: {
    Title: string;
    Year: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Runtime: string;
    Poster: string;
    imdbRating: string;
  };
}

const MovieDetail: React.FC<MovieDetailProps> = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await fetchMovieDetails(imdbID!);
      setMovie(data);
    };
    fetchDetail();
  }, [imdbID]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <div className="movie-detail-header">
        <img src={movie.Poster} alt={movie.Title} />
        <div className="text-section">
          <h1>{movie.Title}</h1>
          <p>ReleaseYear: {movie.Year}</p>
          <p>Duration: {movie.Runtime}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Director: {movie.Director}</p>
          <p>Actors: {movie.Actors}</p>
          <p>IMDb Rating: {movie.imdbRating}</p>
          <p>{movie.Plot}</p>
          <button className="back-to-home" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
