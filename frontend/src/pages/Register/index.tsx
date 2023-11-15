import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./register.scss";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:4000",
  });

  const handleRegister = async () => {
    try {
      const response = await api.post("/register", {
        email,
        password,
      });

      if (response.status === 201) {
        setMessage("User registered successfully");
        navigate("/userLogin");
      }
    } catch (error) {
      console.log("error during registration");
      if (error.response) {
        setMessage(error.response.data.error);
        setError(error.response.data.error);
      } else {
        setMessage("An error occurred during registration.");
      }
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h3> Create your account</h3>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
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

        <button onClick={handleRegister} className="button">
          Register <img src="src/icons/arrow.png" alt="->" />
        </button>
        <div className="footer">
          <p>Already have an account?</p>
          <Link to="/userLogin">Login</Link>
        </div>
        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
};

export default Register;
