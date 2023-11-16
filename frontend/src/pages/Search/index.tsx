import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import "./search.scss";
import { Movie, SearchProps } from "../../types/interfaces";

export const Search: React.FC <SearchProps> = () => {
  const searchURL = "https://api.themoviedb.org/3/search/movie";
  const apiKey = "api_key=8ed200f50a6942ca5bc8b5cdec27ff22";

  const [searchParams] = useSearchParams();

  const location = useLocation();

  const [movies, setMovies] = useState<Movie[]>([]);
  const query = searchParams.get("q");
  const userId = new URLSearchParams(location.search).get("userId");


  const getSearchedMovies = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);

      console.log(data.results);
    } catch (error: any) {
      console.error(`erro catch:  ${error.message}`);
    }
  };

  useEffect(() => {
    const searchWithQuery = `${searchURL}?query=${query}&${apiKey}`;

    getSearchedMovies(searchWithQuery);
  }, [query]);


  return (
    <div className="container-search">
      <h2 className="title-search">
        Results for: <span className="query"> {query}</span>
      </h2>
      <div className="container-movies">

        {
        movies.length === 0 ? (
          <p id="error-search">Movie not found </p>
        ): (
          (
        //@ts-ignore
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} userId={userId} />)
          ))
        }
       
      
      </div>
    </div>
  );
};
export default Search;
