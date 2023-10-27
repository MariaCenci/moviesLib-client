import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "./movieCard.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { MovieCardProps, Movie, MovieType } from "../../types/interfaces";

const MovieCard: React.FC<MovieCardProps> = ({ movie, showBtn = true }) => {
  const imgURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "";

  const formatNumber = (number: string) => {
    const formatedNumber = parseFloat(number).toFixed(1);
    return formatedNumber;
  };

  const api = axios.create({
    baseURL: "http://localhost:4000",
  });

  const [favorite, setFavorite] = useState(false);

  const userId = 1;

useEffect(() => {
  const getFavoriteMovies = async () => {
    try {
      const response = await api.get(`/api/favoriteMovies/${userId}`);
      const favoriteMovies = response.data;
      // Verifique se o filme atual está na lista de favoritos e atualize o estado 'favorite' de acordo.
      const isFavorite = favoriteMovies.some(favMovie => favMovie.id === movie.id);
      setFavorite(isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  getFavoriteMovies();
}, [movie.id]); 


const addFavoriteMovie = async (
  user_id: number,
  id: number,
  original_title: string,
  poster_path: string
) => {
  try {
    const response = await api.post("/api/addFavorite", {
      user_id,
      id,
      original_title,
      poster_path,
    });

    console.log(response.data);
  } catch (error) {
    console.log({ msg: error });
  }
};


  const removeFavorite = async (user_id: number, id: number) => {
    try {
      const response = await api.delete("/api/removeFavorite", {
        data: {
          user_id,
          id,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log({ msg: error });
    }
  };

  const toggleFavorite = async () => {
    try {
      if (favorite) {
        // Remover filme dos favoritos
        await removeFavorite(userId, movie.id);
      } else {
        // Adicionar filme aos favoritos
        await addFavoriteMovie(userId, movie.id, movie.original_title!, movie.poster_path!);
      }
  
      // Alterar o estado 'favorite' localmente após a atualização bem-sucedida
      setFavorite(!favorite);
    } catch (error) {
      console.log('Erro ao marcar/desmarcar favorito:', error);
    }
  };
  

  return (
    <>
      <div className="card" key={movie.id}>
        <div className="container-rating">
          <p className="rating">
            {movie?.vote_average ? formatNumber(movie.vote_average) : "-"}
          </p>
        </div>

        <div className="container-main">
          <img className="img-movies" src={imgURL} alt="title" />
          <h2 className="movie-title">{movie.original_title}</h2>

          <div className="container-favorite-btn">
            <button id="favorite-btn" onClick={toggleFavorite}>
              <FontAwesomeIcon
                icon={favorite ? faStar : farStar}
                style={{ color: "#ffffff" }}
              />
            </button>
          </div>

          <div className="container-see-more">
            {showBtn && (
              <Link to={`/movie/${movie.id}`} className="link-see-more">
                See more
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
