import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import {auth} from "../../services/firebaseConfig";

import "./login.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const navigate = useNavigate()

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);

    navigate('/home')
  }

  if (loading) {
     return <p>carregando...</p>;
  }
  if (user) {
    console.log(user);
  }
  return (
    <>
    <div className="container">
      <header className="header">
        <span>Please enter your login infos</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">Mail</label>
          <input
            type="text"
            name="email"
            id="email"
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


        <button className="button" onClick={handleSignIn}>
          Login <img src="" alt="->" />
        </button>
        <div className="footer">
          <p>Haven't got an account?</p>
          <Link to="register">Sign in</Link>
        </div>
      </form>
    </div>
    </>
  );
}

export default Login