import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import WatchList from "./pages/Watchlist";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Login from "./pages/Login"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";

//import { Navbar } from "./components/Navbar";
/*
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, 
    children: [
      { path: 'register', element: <Register /> },
      { path: 'home', element: <Home /> },
      { path: 'movie/:id', element: <Movie /> },
      { path: 'search', element: <Search /> },
      { path: 'favorite', element: <Favorite /> },
      { path: 'watchlist', element: <WatchList /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
*/


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);