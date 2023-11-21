import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

import "./login.scss";

const Login: React.FC = () => {
 const api = axios.create({
    baseURL: "http://localhost:4000",
  });



  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { userId } = response.data;

      setUserId(userId);
      localStorage.setItem("userId", userId);

      console.log("login ok");
      console.log(userId);
    } catch (error) {
      console.error("Error during login", error);
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    
    if (userId) {
     
      navigate("/home", { state: { userId } });
    }
  }, [userId]);

  return (
    <>
      <div className="container">
        <header className="header">
          <h3>Login</h3>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="inputContainer">
            <label htmlFor="email">Mail</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********************"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="button">
            Login <img src="src/icons/arrow.png" alt="->" />
          </button>
          <div className="footer">
            <p>Don't you have an account?</p>
            <Link to="/userRegister">Sign in</Link>
          </div>
          <p style={{ color: "red" }}>{error}</p>
        </form>
      </div>
    </>
  );
};

export default Login;
