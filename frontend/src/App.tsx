import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Movie from "./pages/Movie";
import { Search } from "./pages/Search";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
