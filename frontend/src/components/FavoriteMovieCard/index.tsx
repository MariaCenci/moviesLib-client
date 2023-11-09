/*import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MovieCardProps, Movie, MovieType } from "../../types/interfaces";
import "./favmoviecard.scss";

const FavoriteMovieCard: React.FC<MovieCardProps> = ({ movie, updateFavorites }) => {
  const imgURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "";

  const api = axios.create({
    baseURL: "http://localhost:4000",
  });

  const userId = 1;

  const [favorite, setFavorite] = useState([])

   const removeFavorite = async (user_id: number, id: number) => {

    
    try {
     
    
      const response = await api.delete("/api/removeFavorite", {
        data: {
          user_id,
          id,
        },
      });

      
    } catch (error) {
      console.log({ msg: error });
    }
  };
  const toggleFavoriteRemove = () => {
  
    if (updateFavorites) {
      const updatedFavorites = favorite.filter((favMovie: MovieType) => favMovie.id !== movie.id);
      setFavorite(updatedFavorites);
      updateFavorites(updatedFavorites);
    }
    console.log('ok');
  };



  return (
    <>
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
    </>
  );
};

export default FavoriteMovieCard;
*/

import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MovieCardProps, Movie, MovieType } from "../../types/interfaces";
import "./favmoviecard.scss";

const FavoriteMovieCard: React.FC<MovieCardProps> = ({
  movie,
  updateFavorites,
}) => {
  const imgURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "";

  const api = axios.create({
    baseURL: "http://localhost:4000",
  });



  const [isFavorite, setIsFavorite] = useState(true); // Use um estado para rastrear se o filme é favorito

 
  const location = useLocation();
  const userId = location.state?.userId;


  const toggleFavoriteRemove = async () => {
    if (isFavorite) {
      try {
        const response = await api.delete("/api/removeFavorite", {
          data: {
            userId: userId,
            id: movie.id,
          },
        });

        console.log(response.data);
        // Se a remoção do servidor for bem-sucedida, atualize o estado local
        setIsFavorite(false);

        if (updateFavorites) {
          // @ts-ignore
          updateFavorites((prevFavorites) =>
            prevFavorites.filter((favMovie) => favMovie.id !== movie.id)
          );
        }
      } catch (error) {
        console.log({ msg: error });
      }
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
