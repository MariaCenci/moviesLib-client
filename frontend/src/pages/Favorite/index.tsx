import React from "react";
import { useState, useEffect } from "react";
import FavoriteMovieCard from "../../components/FavoriteMovieCard";
import { Movie, FavoriteProps } from "../../types/interfaces";
import "./favorite.scss";
import axios from "axios";

const Favorite: React.FC<FavoriteProps> = () => {
  const api = axios.create({
    baseURL: "https://movieslib.onrender.com",
  });

  const userId = localStorage.getItem("userId");

  const [favorites, setFavorites] = useState<Movie[]>([]);

  const updateFavorites = (updatedFavorites: Movie[]) => {
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        if (userId) {
        }
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
              //@ts-ignore
              movie={movie}
                //@ts-ignore
              userId={userId}
              updateFavorites={updateFavorites}
            />
          ))}
      </div>
    </div>
  );
};

export default Favorite;
