import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard";

import "./Movie.css";

import { TbFileDescription } from "react-icons/tb";
import { FaTheaterMasks } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTimeFive, BiMoneyWithdraw } from "react-icons/bi";
import { MovieCardProps, MovieType } from "../../types/interfaces";

const Movie: React.FC = () => {
  const movieURL = "https://api.themoviedb.org/3/movie/";
  const apiKey = "api_key=8ed200f50a6942ca5bc8b5cdec27ff22";

  const { id } = useParams();
  console.log(id);
  const [movie, setMovie] = useState<MovieType | null>(null);

  const genres: string[] =
    movie && movie.genres
      ? movie.genres = []
      : [];

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

  const formatNumber = (number: number) => {
    if (number && number !== 0) {
      const formatedNumber = number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formatedNumber;
    }
    return "-";
  };
  const formatDate = (date: Date | undefined) => {
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDate;
    }
    return "-";
  };

  return (
    <>
      <div className="container-movie-page">
        {movie && (
          <>
            <MovieCard movie={movie} showBtn={false} />
            <p className="tagline">{movie.tagline}</p>

            <div className="movie-info">
              <h4>
                <TbFileDescription /> Overview
              </h4>
              <p className="overview">{movie.overview}</p>
            </div>

            <div className="movie-info">
              <h4>
                <BiTimeFive /> Runtime
              </h4>
              <p className="runtime">{movie.runtime} min</p>
            </div>

            <div className="movie-info">
              <h4>
                <AiOutlineCalendar />
                Release date
              </h4>
              <p className="release-date">{formatDate(movie.release_date)}</p>
            </div>

            <div className="movie-info">
              <h4>
                <BiMoneyWithdraw />
                Budget
              </h4>
              <p className="budget">
                {movie?.budget ? formatNumber(movie.budget) : "-"}
              </p>
            </div>

            <div className="movie-info">
              <h4>
                <FaTheaterMasks />
                Genres
              </h4>
              {movie && movie.genres && movie.genres.length > 0 ? (
                <div className="genre-container">
                  {genres.map((genre, index) => (
                    <span key={index} className="genres">
                      {genre}
                      {index!== genres.length - 1 ? "," : ""}
                       </span>
                  ))}
                </div>
              ) : (
                <span className="genres">Genre not found </span>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Movie;
