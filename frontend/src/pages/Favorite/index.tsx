import React from "react";
import { useState, useEffect } from "react";
import FavoriteMovieCard from "../../components/FavoriteMovieCard";
import { Movie, MovieCardProps, MovieType } from "../../types/interfaces";
import "./favorite.scss";
import axios from "axios";

const Favorite = () => {
  const api = axios.create({
    baseURL: "http://localhost:4000",
  });

  const userId = 1;

  const [favorites, setFavorites] = useState<Movie[]>([]);


  const updateFavorites = (updatedFavorites: Movie[]) => {
    setFavorites(updatedFavorites);
  };
  

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const response = await api.get(`/api/favoriteMovies/${userId}`);
        setFavorites(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteMovies();

  }, []);

  return (
    <div className="wrapper-favorite-movies">
      <h1>Favorite movies</h1>
      <div className="container-favorite-movies"> 
       
        {favorites &&
          favorites.length > 0 &&
          favorites.map((movie) => (
            <FavoriteMovieCard 
            key={movie.id}
             movie={movie}
             updateFavorites={updateFavorites}/>
              
          ))}
      </div>
  
    </div>
  );
};

export default Favorite;
