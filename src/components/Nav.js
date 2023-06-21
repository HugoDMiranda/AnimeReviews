import "../sass/Components-sass/nav.css";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../context/authContext.js";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid con-navbar">
        <div className="dropdown">
          <button class="navbar-brand">
            <FaBars />
          </button>
          <div className="navbar-info">
            <ul className="navbar-menu">
              <li>
                <Link className="navbar-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="navbar-link" to="/Register">
                  Register
                </Link>
              </li>
              <li>
                {currentUser ? (
                  <button className="navbar-button" onClick={logout}>
                    Logout
                  </button>
                ) : (
                  <Link className="navbar-link" to="/Login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
            <div>
              {currentUser ? (
                <span className="user-logo in"></span>
              ) : (
                <span className="user-logo out"></span>
              )}
              <h2>{currentUser?.name}</h2>
              <h4>#{currentUser?.id}</h4>
            </div>
          </div>
        </div>
        <Link className="navbar-link" to="/">
          <img className="logo" src="./img/logoAR.png" alt="logo" />
        </Link>

        {currentUser ? (
          <span className="user-logo in"></span>
        ) : (
          <span className="user-logo out"></span>
        )}
      </div>
    </nav>
  );
}

export default Nav;
