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
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
     const response = await api.post("/login", {
        email,
        password
        
       
      });

      const { userId } = response.data;

setUserId(userId)
localStorage.setItem('userId', userId);

      console.log("login ok");
      console.log(userId)
    } catch (error) {
      console.error("Erro ao fazer login", error);
      setError(error.response.data.error);
    }
  };


  useEffect(() => {
    // Este efeito ocorre ao montar o componente
    if (userId) {
      // Usuário já logado, redirecione para a página desejada
      navigate("/home", { state: { userId } });
    }
  }, [userId]);

  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



const getUserFromDatabase = async (uid, email) => {
    try {
      await api.post('/auth/login', { userId: uid, email });
      console.log('user found in the database');
    } catch (error) {
      console.error('cannot find user in the database:', error);
    }
  };

  function handleLogin(e) {
    e.preventDefault();
  
  }
  

/*


  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
console.log(email, password)
    navigate('/home')
  }

  if (loading) {
     return <p>carregando...</p>;
  }
  if (signedInUser) {
    console.log(signedInUser);
  }

useEffect(()=>{
    const user = auth.currentUser;

if (user) {
  console.log('Usuário autenticado:', user);
} else {
  console.log('Nenhum usuário autenticado.');
}

if (user) {
    const uid = user.uid;
  
    const email = user.email;

    console.log('UID:', uid);
    console.log('Email:', email);
    
  }
  
},[])

useEffect(()=>{
    const saveUserToDatabase = async (user) => {
    try {
        const user = auth.currentUser;

        if (user && user.uid) {
          console.log('Usuário autenticado:', user);
          const uid = user.uid;
          const email = user.email;
          console.log('UID:', uid);
          console.log('Email:', email);
        
          // Agora você pode chamar a função para salvar o usuário no banco de dados.
          saveUserToDatabase(uid, email);
        } else {
          console.log('Nenhum usuário autenticado.');
        }
    }catch(error){
        console.log(error)
    }      
}  
  
  // Chamando a função após a autenticação
 saveUserToDatabase(auth.currentUser);

    },[])
    */

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
          <p>Don't have an account?</p>
          <Link to="/userRegister">Sign in</Link>
        </div>
        <p style={{ color: 'red' }}>{error}</p>
        </form>
      </div>
    </>
  );
};

export default Login;
