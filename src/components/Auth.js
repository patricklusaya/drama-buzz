import React, { useState } from 'react';
import { auth, googleProvider } from './config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import '../App.css';
import { useNavigate, Link } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.email;
        console.log(user);
        navigate('/recommend',{ state: { user } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSingUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const user = userCredential.user;
        const u =  auth.currentUser.displayName;
        console.log(u);
        console.log(user);
        navigate('/recommend');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="auth">
      <div className='rightSection'>
        <h2>Recommend A Great Movie to Others</h2>
        </div>
      
      
      <div className="center-buttons">
        <p>Create An Account Now</p>
        <button className="google-signin-button" onClick={handleSingUpWithGoogle}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt="Google Logo" className="google-logo" />SignUp With Google
        </button>

        <p style={{marginTop:10}}>Already have an account? </p>
        <button className="google-signin-button" onClick={handleSingUpWithGoogle}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt="Google Logo" className="google-logo" /> Continue With Google
        </button>
      </div>



     
    </div>
  );
};

export default Auth;
