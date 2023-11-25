import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import "./search.scss";

const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const userId = localStorage.getItem("userId");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
    if (!search) return;

    navigate(`/search?q=${search}&userId=${userId}`);
    setSearch(""); // clean state after the search
  };

  const handleIconClick = () => {
    if (!search) return;
    navigate(`/search?q=${search}&userId=${userId}`);
    setSearch("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          value={search}
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>
      <button className="search-button">
        <AiOutlineSearch
          color={"#black"}
          className="search-icon"
          onClick={handleIconClick}
        />
      </button>
    </>
  );
};

export default SearchBar;
