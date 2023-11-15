import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./hamburguer.scss";
import { useNavigate } from "react-router-dom";


const HamburguerMenu: React.FC = () => {
  const body = document.querySelector("body") as HTMLElement;
  //setMenu to true or false according to opened or closed
  const [activeMenu, setActiveMenu] = useState(false);
  const navigate = useNavigate();
  //open and close menu
  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  //closes menu when a link is clicked
  const closeMenu = () => {
    setActiveMenu(false);
  };

  // disactivate scroll bar opened menu
  if (activeMenu) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }

  const userId = localStorage.getItem("userId");
  const handleLogout = () => {

    localStorage.removeItem("userId"); 

  
    navigate("/userLogin", { replace: true }); 
  };

  return (
    <>
      <div className="container-hamburguer">
        <div
          onClick={toggleMenu}
          className={activeMenu ? "toggleActive" : "toggle"}
        >
          <div className=" hamburguer-icon"></div>
        </div>

        <div className={activeMenu ? "menuOpen" : "menuClose"}>
          {activeMenu && (
            <div className="menu-list">
              <ul className="list-pages">
                <li>
                  <Link to="/home" onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/favorite" onClick={closeMenu}>
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/watchlist" onClick={closeMenu}>
                    Watch list
                  </Link>
                </li>
                     <li>
               
              
                  <a id="logout-link" onClick={handleLogout}>Logout
                  <span>
                    <img src="src/icons/logout.png" alt="" />
                  </span>
                  </a>
              
                  </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default HamburguerMenu;
