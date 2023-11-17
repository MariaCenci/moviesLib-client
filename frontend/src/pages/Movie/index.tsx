import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./movie.scss";
import { MovieType, Genre } from "../../types/interfaces";


const Movie: React.FC = () => {
  const movieURL = "https://api.themoviedb.org/3/movie/";
  const genreURL = "https://api.themoviedb.org/3/genre/movie/list";
  const apiKey = "api_key=8ed200f50a6942ca5bc8b5cdec27ff22";

  const { id } = useParams();
  console.log(id);
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [genre, setGenres] = useState<Genre[] | null>(null);

  const userId = localStorage.getItem("userId");


  const getGenres = async (url: string) => {
    try {
      const genresResponse = await axios.get(url);
      const availableGenres = genresResponse.data.genres;

      setGenres(availableGenres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const genres = `${genreURL}?${apiKey}`;
    getGenres(genres);
  }, []);

  const getMovieDetails = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovie(data);

      console.log(data);
    } catch (error: any) {
      console.error(`erro catch:  ${error.message}`);
    }
  };

  useEffect(() => {
    const detailsWithId = `${movieURL}${id}?${apiKey}`;

    getMovieDetails(detailsWithId);
  }, []);

  const imgURL = movie
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "";

  const formatNumber = (number: number) => {
    let formattedNumber;
    switch (number && number !== 0) {
      case number < 1e3:
        formattedNumber = number.toString();
        break;
      case number < 1e6:
        formattedNumber = (number / 1e3).toFixed(0) + "K";
        break;
      case number < 1e9:
        formattedNumber = (number / 1e6).toFixed(0) + "M";
        break;

      default:
        formattedNumber = (number / 1e9).toFixed(0) + "B";
    }

    return formattedNumber;
  };

  const formatDate = (date: Date | undefined) => {
    if (date) {
      const formatedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
      });
      return formatedDate;
    }
    return "-";
  };

  return (
    <>
      <div className="container-movie-page">
        {movie && (
          <>
            <div className="poster">
              <img src={imgURL} alt="" />
            </div>

            <div className="container-infos">
              <div className="movie-info">
                <h2 className="title-movie">{movie.original_title}</h2>
              </div>

              <div className="container-main-movie-info">
                <div className="primary-infos">
                  <span className="release-year">
                    {formatDate(movie.release_date)}
                  </span>
                  <span className="middle-dot">
                    {" "}
                    <img src="../src/icons/dot.png" alt="" />
                  </span>
                  <span className="runtime">{movie.runtime} min </span>
                </div>

                <div className="genres">
                  {movie.genres &&
                    movie.genres.map((genre) => (
                      <span key={genre.id} className={`genre ${genre.name}`}>
                        {genre.name}
                      </span>
                    ))}
                </div>

                <div className="movie-info">
                  <div className="container-budget">
                    <img src="../src/icons/budget.png" alt="" />

                    <span className="budget">
                      {movie?.budget ? formatNumber(movie.budget) : "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="movie-info">
                <h3>Overview</h3>
                <p className="overview">{movie.overview}</p>
              </div>
            </div>

          </>
        )}
      </div>
    </>
  );
};

export default Movie;
