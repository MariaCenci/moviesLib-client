
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "../../components/Carousel";


import "../../main.scss";
import "./home.scss";
import { Genre } from "../../types/interfaces";

const moviesURL = "https://api.themoviedb.org/3/movie/";
const genresURL = "https://api.themoviedb.org/3/";
const apiKey = "api_key=8ed200f50a6942ca5bc8b5cdec27ff22";

type Movie = {
  id: number;
};

const Home: React.FC = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
    undefined
  );
  const location = useLocation();

  const [userId, setUserId] = useState<string | null>(null);

  //verifies if there's an userId in the local storage 
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const getTopMovies = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTopMovies(data.results);
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
    } catch (error: any) {
      console.error(`erro catch:  ${error.message}`);
    }
  };

  useEffect(() => {
    const popularUrl = `${moviesURL}popular?${apiKey}`;
    getPopularMovies(popularUrl);
  }, []);

  const getUpcomingMovies = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setUpcomingMovies(data.results);
    } catch (error: any) {
      console.error(`erro catch:  ${error.message}`);
    }
  };

  useEffect(() => {
    const popularUrl = `${moviesURL}upcoming?${apiKey}`;
    getUpcomingMovies(popularUrl);
  }, []);

  const getGenres = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setGenres(data.genres);
    } catch (error: any) {
      console.error(`Erro: ${error.message}`);
    }
  };

  useEffect(() => {
    const genresUrl = `${genresURL}genre/movie/list?${apiKey}`;
    getGenres(genresUrl);
  }, []);

  const getMoviesByGenre = async (genreId: string) => {
    try {
      const moviesByGenreUrl = `${genresURL}discover/movie?${apiKey}&with_genres=${genreId}`;
      const res = await fetch(moviesByGenreUrl);
      const data = await res.json();
      setTopMovies(data.results);
    } catch (error: any) {
      console.error(`Erro ao obter filmes por gênero: ${error.message}`);
    }
  };

  useEffect(() => {
    if (selectedGenre) {
      getMoviesByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  const handleGenreSelect = (selectedGenre: string) => {
    setSelectedGenre(selectedGenre);

    if (!selectedGenre) {
      const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
      getTopMovies(topRatedUrl);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="container-movies">
          <div className="container-top-movies">
            <div className="container-select">
              <h2 className="top-movies">By genre</h2>
              <div className="select-gender">
                <select
                  value={selectedGenre || ""}
                  onChange={(e) => handleGenreSelect(e.target.value)}
                >
                  <option value="">Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={String(genre.id)}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {topMovies.length === 0 && <p>Loading...</p>}
            {topMovies.length > 0 && (
              <div className="movie-card-container">
                <Carousel movies={topMovies} userId={userId!} />
              </div>
            )}
          </div>

          <div className="container-popular-movies">
            <h2 className="popular-movies">Popular</h2>
            {popularMovies.length === 0 && <p>Loading...</p>}
            {popularMovies.length > 0 && (
              <div className="movie-card-container">
                <Carousel movies={popularMovies} userId={userId!} />
              </div>
            )}
          </div>

          <div className="container-upcoming-movies">
            <h2 className="upcoming-movies">Upcoming</h2>
            {upcomingMovies.length === 0 && <p>Loading...</p>}
            {upcomingMovies.length > 0 && (
              <div className="movie-card-container">
                <Carousel movies={upcomingMovies} userId={userId!} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
