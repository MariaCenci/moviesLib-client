import React from "react";
import axios from "axios";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";


import { auth } from "../../services/firebaseConfig";
import "./register.scss";

const Register: React.FC = () => {

    const api = axios.create({
        baseURL: "http://localhost:4000",
      });
    

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorRegister, setError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  /*
    const handleRegister  = async() => {
        try{
           const response = await api.post('/api/register', {email, password}) 
           
if(response.status == 200){
    const data = response.data
    window.location.href = '/'
}

        }catch(error){
          
            console.log(error)
        }


    }*/

  function handleSignIn(e) {
    e.preventDefault();
    console.log('E-mail:', email);
console.log('Senha:', password);

    createUserWithEmailAndPassword(email, password);
  }

  if (loading) {
   return <p>carregando...</p>;
  }
  return (
    <div className="container">
      <header className="header">
     
        <span>Please complete these fields</span>
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

        <button onClick={handleSignIn} className="button">
          Register <img src="" alt="->" />
        </button>
        <div className="footer">
          <p>Already have an account?</p>
          <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register

/*

import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import { auth } from "../../services/firebaseConfig";
import "./register.scss";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorRegister, setError] = useState("");
  const navigate = useNavigate(); // Para redirecionar o usuário após o registro

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleRegister = (e) => {
    e.preventDefault(); 
    createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Registro bem-sucedido, você pode redirecionar o usuário para a página de login ou outra página
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (

    <div className="container">
      <header className="header">
        <span>Please complete these fields</span>
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

        <button onClick={handleRegister} className="button">
          Register
        </button>
        <div className="footer">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
        {errorRegister && <p className="error-message">{errorRegister}</p>}
       </form>
    </div> 
    
  

  );
};

export default Register;
*/