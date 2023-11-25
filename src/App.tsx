import React from "react";
import {  Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/userLogin" element={<Login />} />
          <Route path="/userRegister" element={<Register />} />
          <Route path="/*" element={<AuthenticatedRoutes />} />
          <Route index element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
