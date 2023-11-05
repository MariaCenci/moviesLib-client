import React from "react";
    import { Routes, Route, BrowserRouter } from "react-router-dom";
    import Home from "./pages/Home";
    import Register from "./pages/Register";
       import Login from "./pages/Login";
    import Movie from "./pages/Movie";
    import Search from "./pages/Search";
    import WatchList from "./pages/Watchlist";
    import Favorite from "./pages/Favorite";
    import NavBar from "./components/Navbar";
    import AuthenticatedRoutes from "./AuthenticatedRoutes";
 

  const App: React.FC = () => {
 
      return (
        <>     
        <BrowserRouter>

   
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<AuthenticatedRoutes />} />
          </Routes>
          </BrowserRouter>
        </>
      );
    }
    
    export default App;
 