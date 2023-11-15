import React from "react";
import { useState, useEffect } from "react";
import WatchListCard from "../../components/WatchListCard";
import { Movie, WatchListProps } from "../../types/interfaces";

import axios from "axios";

const WatchList: React.FC<WatchListProps> = () => {
  const api = axios.create({
    baseURL: "http://localhost:4000",
  });

  const userId = localStorage.getItem("userId");

  const [watchList, setWatchList] = useState<Movie[]>([]);

  const updateWatchList = (updatedWatchList: Movie[]) => {
    setWatchList(updatedWatchList);
  };

  useEffect(() => {
    const fetchWatchList = async () => {
      try {
        if (userId) {
        }
        const response = await api.get(`/api/watchList/${userId}`);
        setWatchList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWatchList();
  }, []);

  return (
    <div className="wrapper-favorite-movies">
      <h1>Watch list</h1>
      <div className="container-favorite-movies">
        {watchList &&
          watchList.length > 0 &&
          watchList.map((movie) => (
            <WatchListCard
              key={movie.id}
              //@ts-ignore
              movie={movie}
              updateFavorites={updateWatchList}
            />
          ))}
      </div>
    </div>
  );
};

export default WatchList;
