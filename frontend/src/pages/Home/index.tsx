import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "../../components/Carousel"
import MovieCard from "../../components/MovieCard";

import "../../main.scss";
import "./home.scss";

const moviesURL = "https://api.themoviedb.org/3/movie/";
const apiKey = "api_key=8ed200f50a6942ca5bc8b5cdec27ff22";

type Movie = {
  id: number;
};



const Home = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  //const [loading, setLoading] = useState(true);

  const location = useLocation();
  


  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
  
    const storedUserId = localStorage.getItem('userId');
 
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); 

  const getTopMovies = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTopMovies(data.results);

      console.log(data.results);
    } catch (error: any) {
      console.error(`erro catch:  ${error.message}`);
    }
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;

    getTopMovies(topRatedUrl);
  }, []);

  const getPopularMovies = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPopularMovies(data.results);

      console.log(data.results);
    } catch (error: any) {
      console.error(`erro catch:  ${error.message}`);
    }
  };

  useEffect(() => {
    const popularUrl = `${moviesURL}popular?${apiKey}`;

    getPopularMovies(popularUrl);
  }, []);

  return (
    <>
      <div className="wrapper"> 
      

       
<div className="container-movies">
       <div className="container-top-movies">
         <h2 className="top-movies">Top movies</h2>
          {topMovies.length === 0 && <p>Loading...</p>}
          {topMovies.length > 0 && (
            <div className="movie-card-container">

                <Carousel movies={topMovies} userId = {userId!} /> 
          
            </div>
          )}
        </div>


        <div className="container-popular-movies">
        <h2 className="popular-movies">Popular movies</h2>
          {popularMovies.length === 0 && <p>Loading...</p>}
          {popularMovies.length > 0 && (
            <div className="movie-card-container">
           
                <Carousel movies={popularMovies} userId={userId!} />
              
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
};
export default Home;
