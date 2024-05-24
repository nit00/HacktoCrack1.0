import React, { useState } from 'react';
import './App.css';
import { FaGoogle, FaApple, FaTwitter, FaGithub } from 'react-icons/fa';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { BrowserRouter as Router, Route, useNavigate} from 'react-router-dom';




const firebaseConfig = {
  apiKey: "AIzaSyAehyHTDCrbJk1kTyNXgGsLyl5EBDo8KKY",
  authDomain: "chatbot-a0443.firebaseapp.com",
  projectId: "chatbot-a0443",
  storageBucket: "chatbot-a0443.appspot.com",
  messagingSenderId: "78737727577",
  appId: "1:78737727577:web:3069d55cb52d0150199148",
  measurementId: "G-Q80BMDRJNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [user] = useAuthState(auth);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      navigate(`/protected?userId=${user.uid}&userName=${user.displayName}&photo=${user.photoURL}`);
    }).catch((error) => {
      // Handle errors
      console.error(error);
    });
  };

  return (
    <div className='Main'>
      <div className="heading">
        <div className="content">
          {/* Content can be added here */}
        </div>
      </div>
      <div className='form-section'>
        <div className='card'>
          <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
            {/* Login Face */}
            <div className='card-face login-face'>
              <div className='form-head'>
                <h2 className='login-section'>Login</h2>
                <form action='/protected'>
                  <input className='user-input' type='text' placeholder='Username or Email' disabled/><br />
                  <input className='user-pass' type='password' placeholder='Password'  disabled/>
                  <div className='forgot-pass'>
                    <span>Forgot Password?</span>
                  </div>
                  <div className='login-btn'>
                    <button type='submit' name='login-submit' disabled>Login</button>
                  </div>
                </form>
                <div className='hor-line'>
                  <hr />
                  <span>OR</span>
                  <hr />
                </div>
                <div className='social-icons'>
                  <FaGoogle onClick={signInWithGoogle} className="social-icon" />
                  <FaApple className="social-icon" disabled/>
                  <FaTwitter className="social-icon" />
                  <FaGithub className="social-icon" />
                </div>
                <div>
                  <p style={{color:"white", marginTop:"50px"}}>** Currently Login only available via Google SignIn. Click on the icon to proceed **</p>
                </div>
                {/* <div className='signup-btn'>
                  <span>Create New Account? <button onClick={handleFlip}>Signup</button></span>
                </div> */}
                
              </div>
              
            </div>
            
            {/* Signup Face */}
            <div className='card-face signup-face'>
              <div className='form-head'>
                <h2 className='signup-section'>Signup</h2>
                <form>
                  <input className='user-email' type='email' placeholder='Email' />
                  <input className='user-username' type='text' placeholder='Choose Username' /><br />
                  <input className='user-newpass' type='password' placeholder='Set Password' />
                  <input className='user-confirmpass' type='password' placeholder='Confirm Password' /><br />

                  <div className='login-btn'>
                    <button type='submit' name='signup-submit'>Signup</button>
                  </div>
                </form>
                <div className='hor-line'>
                  <hr />
                  <span>OR</span>
                  <hr />
                </div>
                <div className='social-icons-new'>
                  <FaGoogle className="social-icon-new" />
                  <FaApple className="social-icon-new" />
                  <FaTwitter className="social-icon-new" />
                  <FaGithub className="social-icon-new" />
                </div>
                
                <div className='login-btn-new'>
                  <button onClick={handleFlip}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export {auth}

export default App;
