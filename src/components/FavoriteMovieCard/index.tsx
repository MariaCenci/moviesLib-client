

import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MovieCardProps } from "../../types/interfaces";
import "./favmoviecard.scss";

const FavoriteMovieCard: React.FC<MovieCardProps> = ({
  movie,
  updateFavorites,
}) => {
  const imgURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "";

  const api = axios.create({
    baseURL: "https://movieslib.onrender.com",
  });

  const [isFavorite, setIsFavorite] = useState(true);

  const location = useLocation();
  const userId = location.state?.userId;

  const toggleFavoriteRemove = async () => {
    if (isFavorite) {
      try {
        const response = await api.delete("/api/removeFavorite", {
          data: {
            userId: userId,
            movieId: movie.id,
          },
        });

        console.log(response.data);

        setIsFavorite(false);

      
        if (updateFavorites) {
          //@ts-ignore
          updateFavorites((prevFavorites) =>
            prevFavorites.filter((favMovie) => favMovie.id !== movie.id)
          );
        }

       
        await api.put("/api/updateFavorites", {
          userId: userId,
          updatedFavorites: await fetchUpdatedFavorites(userId),
        });
      } catch (error) {
        console.log({ msg: error });
      }
    }
  };

  const fetchUpdatedFavorites = async (userId: string) => {
    try {
      const response = await api.get(`/api/favoriteMovies/${userId}`);
      console.log('updated favorites')
      return response.data;
    } catch (error) {
      console.log({ msg: error });
      return [];
    }
  };

  return (
    <div className="card-favorites" key={movie.id}>
      <div className="container-main-favorites">
        <img className="img-movies" src={imgURL} alt="title" />
        <h2 className="movie-title">{movie.original_title}</h2>
        <div className="container-favorite-btn">
          <button id="remove-favorite-btn" onClick={toggleFavoriteRemove}>
            <img src="src/icons/remove.png" alt="" />
            <span>remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteMovieCard;
