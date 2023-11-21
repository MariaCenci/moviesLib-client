import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MovieCardProps, Movie, MovieType } from "../../types/interfaces";


const WatchListCard: React.FC<MovieCardProps> = ({
  movie,
  updateWatchList,
}) => {
  const imgURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "";

  const api = axios.create({
    baseURL: "https://movieslib.onrender.com",
  });

  const [isInList, setIsInList] = useState(true); 

  const location = useLocation();
  const userId = location.state?.userId;

  const toggleRemoveFromList = async () => {
    if (isInList) {
      try {
        const response = await api.delete("/api/removeFromWatchList", {
          data: {
            userId: userId,
            movieId: movie.id,
          },
        });
  
        console.log(response.data);
  
        setIsInList(false);
  
      
        if (updateWatchList) {
          //@ts-ignore
          updateWatchList((prevWatchList) =>
            prevWatchList.filter((movieInList) => movieInList.id !== movie.id)
          );
        }

       
        await api.put("/api/updateWatchList", {
          userId: userId,
          updatedFavorites: await fetchUpdatedWatchList(userId),
        });

      } catch (error) {
        console.log({ msg: error });
      }
    }
  };
  

  const fetchUpdatedWatchList = async (userId: string) => {
    try {
      const response = await api.get(`/api/watchList/${userId}`);
      console.log('updated watch list')
      return response.data;
    } catch (error) {
      console.log({ msg: error });
      return [];
    }
  };
  return (
    <>
      {isInList && (
        <div className="card-favorites" key={movie.id}>
          <div className="container-main-favorites">
            <img className="img-movies" src={imgURL} alt="title" />
            <h2 className="movie-title">{movie.original_title}</h2>

            <div className="container-favorite-btn">
              <button id="remove-favorite-btn" onClick={toggleRemoveFromList}>
                <img src="src/icons/remove.png" alt="" />
                <span>remove</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchListCard;
