import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../../components/MovieCard";
import "./search.scss";
import { Movie } from "../../types/interfaces";

export const Search = () => {
  const searchURL = "https://api.themoviedb.org/3/search/movie";
  const apiKey = "api_key=8ed200f50a6942ca5bc8b5cdec27ff22";

  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const query = searchParams.get("q");

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
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};
export default Search;
