import React, { useEffect, useState } from "react";
import "../App.css";
import "../NavbarStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./config/firebase";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user !== null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="navbary">
      <Link to="/">
        <div className="logo">
          Drama<span>Buzz</span>
        </div>
      </Link>
      <div
        className={`toggle ${isActive ? "active" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className={`navigation ${isActive ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/">
              <span className="icon">🔥</span>
              <span className="title">Home</span>
            </Link>
          </li>
          <li>
            <Link to="tv-shows">
              <span className="icon">📽</span>
              <span className="title">Tv Shows</span>
            </Link>
          </li>

          <li>
            <Link to="recommendations">
              <span className="icon">🎬</span>
              <span className="title">Public Choices</span>
            </Link>
          </li>

          {!isLoggedIn && (
            <li>
              <Link to="auth">
                <span className="icon">📺</span>
                <span className="title">Sign up</span>
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="recommend">
                <span className="icon">➕</span>
                <span className="title">Recommend </span>
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <a style={{ cursor: "pointer" }} onClick={handleSignOut}>
                <span className="icon">📤</span>
                <span className="title">Sign Out</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
