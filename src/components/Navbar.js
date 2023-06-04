// import React from 'react';
import React, { useEffect, useState } from 'react';
import '../App.css';
import '../NavbarStyle.css';
import { Link ,useNavigate} from 'react-router-dom';
import { auth } from './config/firebase';

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
    auth.signOut() // Sign out the user using Firebase auth
      .then(() => {
        console.log('User signed out successfully.');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
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
      <div className={`toggle ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
      {/* Content */}
    </div>
    <div className={`navigation ${isActive ? 'active' : ''}`}>
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
              <span className="title">Public choice</span>
            </Link>
          </li>
         
          {!isLoggedIn && (
  <Link to="auth">
    <li>
      <a href="#">
        <span className="icon">📺</span>
        <span className="title">Sign up</span>
      </a>
    </li>
  </Link>
)}
          {isLoggedIn && (
  <Link to="recommend">
    <li>
      <a href="#">
        <span className="icon">➕</span>
        <span className="title">Recommend </span>
      </a>
    </li>
  </Link>
)}
          {isLoggedIn && (
            <li>
              <a style={{cursor:'pointer'}} onClick={handleSignOut}>
                <span className="icon">📤</span>
                <span className="title">Sign Out</span>
              </a>
            </li>
          )}
        </ul>
      </div>
      {/* <div class="toggle" onclick="toggleMenu()"></div> */}
  {/* <script type="text/javascript">
    function toggleMenu() {
      let navigation = document.querySelector('.navigation');
      let toggle = document.querySelector('.toggle');
      navigation.classList.toggle('active');
      toggle.classList.toggle('active');
    }
  </script> */}
    </div>
  );
};

export default Navbar;
