import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Search from "../pages/Search";
import WatchList from "../pages/Watchlist";
import Favorite from "../pages/Favorite";
import NavBar from "../components/Navbar";
import { useLocation } from 'react-router-dom';


const AutheticatedRoutes = () => {

  return (
    <>     
    

   <NavBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/search" element={<Search  />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/watchlist" element={<WatchList />} />
          </Routes>
      
        </>
  )
}

export default AutheticatedRoutes
