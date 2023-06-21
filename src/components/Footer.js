import "../sass/Components-sass/Footer.css";
import { AuthContext } from "../context/authContext.js";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="footer">
      <img className="footer-logo" src="./img/logoAR.png" alt="logo" />
      <div className="footer-info">
        <div className="footer-ref">
          <Link className="navbar-link" to="/">
            Home
          </Link>
          <Link className="navbar-link" to="/Register">
            Register
          </Link>
          {currentUser ? (
            <button className="footer-button" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link className="navbar-link" to="/Login">
              Login
            </Link>
          )}
        </div>
        <div className="footer-link">
          <a
            href="https://www.linkedin.com/in/hugo-david-miranda-betancourt-3626b6235/"
            target="_blanck"
          >
            Linked
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
