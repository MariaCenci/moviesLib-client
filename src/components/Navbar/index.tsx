import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiMovie } from "react-icons/bi";
import "./navbar.scss";
import SearchBar from "../SearchBar";
import HamburguerMenu from "../hamburguerMenu";

const Navbar: React.FC = () => {
  return (
    <nav id="navbar">
      <div className="container-logo">
        <Link to="/home">
          <span className="logo">🎬MoviesLib </span>
        </Link>
      </div>

      <div className="search">
        <SearchBar />
      </div>
      <HamburguerMenu />
    </nav>
  );
};

export default Navbar;
