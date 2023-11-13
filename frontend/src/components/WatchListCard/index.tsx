
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MovieCardProps, Movie, MovieType } from "../../types/interfaces";
import "./watchList.scss";

const WatchListCard: React.FC<MovieCardProps> = ({
  movie,
  updateWatchList,
}) => {
  const imgURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "";

  const api = axios.create({
    baseURL: "http://localhost:4000",
  });



  const [isInList, setIsInList] = useState(true); // Use um estado para rastrear se o filme é favorito

 
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
        // Se a remoção do servidor for bem-sucedida, atualize o estado local
        setIsInList(false);

        if (updateWatchList) {
          // @ts-ignore
          updateWatchList((prevWatchList) =>
            prevWatchList.filter((watchList) => watchList.id !== movie.id)
          );
        }
      } catch (error) {
        console.log({ msg: error });
      }
    }
  };

  return (   <>
    
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
