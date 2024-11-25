import React, { useEffect, useState } from 'react';
import { LoginBg, Logo } from '../assets';
import { LoginInput } from '../components';
import { FaEnvelope, FaLock, FcGoogle } from '../assets/icons';
import { motion } from 'framer-motion';
import { buttonClick } from '../animation';

import { useNavigate } from 'react-router-dom';

import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import {app} from '../config/firebase.config'; 
import { validateUserJWTToken } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../context/actions/userAction';
import { alertInfo, alertWarning } from '../context/actions/alertAction';
const Login = () => {

  const [userEmail, setUserEmail] =useState("");    
  const [isSignUp, setisSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate =useNavigate();
  const dispatch = useDispatch();

  const user =useSelector((state) => state.user);
  const alert =useSelector((state) => state.alert);
  useEffect(() => {
    if (user) {
      navigate("/", {replace: true});
    }
  }, [user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then( (data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", {replace: true});
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password  === ""|| confirm_password === "") {
      
      dispatch(alertInfo("Required Fields should not be empty"));
    }else{
      if (password === confirm_password) {
        setUserEmail("");
        setPassword("");
        setConfirm_password("");
        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  
                  dispatch(setUserDetails(data));
                });
                navigate("/", {replace: true});
              });
            }
          });
        });
        
      }else{
        
        dispatch(alertWarning("Password doesn't match"));
        
      }
    }
  }

  // actions 

  // reducer

  // store -> Globalized

  // dispatch

  const signInWithEmailAndPass = async () =>{
    if (userEmail !=="" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                
                dispatch(setUserDetails(data));
              });
              navigate("/", {replace: true});
            });
          }
        });
      });
    }else{
         //alert msg
    }
  }

  return (
    <div className=" w-screen  max-h-screen h-auto overflow-hidden flex">
      {/* Background image */}
        <img
            src={LoginBg}
            className="w-full h-full  object-cover absolute top-0 left-0"
            alt=""
        />
      
        
        {/* Content box */}
            
        <div className="flex flex-col items-center  bg-lightOverlay w-[50%] md:w-[400px] h-screen z-10 backdrop-blur-md p-4 px-4 py-12 gap-6"> 
            <div className="flex items-center justify-start gap-4 w-full">
                <img src={Logo} className='w-8' alt=''/>
                <p className='text-headingColor font-semibold text-2xl'>BasketBuzz</p>
            </div>

            {/* Welcome text */}
            <p className='text-3xl font-semibold text-headingColor'>Welcome Back</p>
            <p className='text-xl text-textColor -mt-6'>{isSignUp ? "Sign-Up" : "Sign-In"} with following</p>

            <div className="w-full flex flex-col items-center gap-6 px-4 md:px-12 py-4">
              <LoginInput 
                placeHolder={"Email Here"} 
                icon={<FaEnvelope className="text-xl text-textColor"/>} 
                inputState={userEmail} 
                inputStateFunc={setUserEmail} 
                type="email" 
                isSignUp={isSignUp} 
              />

              <LoginInput 
                placeHolder={"Password Here"} 
                icon={<FaLock className="text-xl text-textColor"/>} 
                inputState={password} 
                inputStateFunc={setPassword} 
                type="password" 
                isSignUp={isSignUp} 
              />    

              {isSignUp && (
                <LoginInput 
                  placeHolder={"Confirm Password Here"} 
                  icon={<FaLock className="text-xl text-textColor"/>} 
                  inputState={confirm_password} 
                  inputStateFunc={setConfirm_password} 
                  type="password" 
                  isSignUp={isSignUp} 
                />
              )}  

              {!isSignUp ? (
              <p>Doesn't have an account? 
                <motion.button {...buttonClick}
                className='text-red5 underline cursor-pointer bg-transparent'
                onClick={() => setisSignUp(true)}
                >
                  Sign Up
                </motion.button>
              </p>)
              :(
                <p>Already have an account? 
                  <motion.button {...buttonClick}
                  className='text-red5 underline cursor-pointer bg-transparent'
                  onClick={() => setisSignUp(false)}
                  >
                    Sign In
                  </motion.button>
                </p>)}

                {/* Login button */}
                {isSignUp ?
                (<motion.button {...buttonClick}
                  className='w-full p-2 rounded-lg text-xl text-primary  cursor-pointer  bg-red5 transition-all duration-150'
                    onClick={signUpWithEmailPass}
                  >
                    Sign Up
                  </motion.button>) 
                  : (
                  <motion.button {...buttonClick}
                className='w-full p-2 rounded-lg text-xl text-primary  cursor-pointer  bg-red5 transition-all duration-150'
                    onClick={signInWithEmailAndPass}
                >
                  Sign In
                </motion.button>)
                }  
            </div>
                <div
                className='flex items-center justify-center gap-16'>
                  <div className='w-24 h-[1px] rounded-md bg-primary'></div>
                  <p className='text-primary'>Or</p>
                  <div className='w-24 h-[1px] rounded-md bg-primary'></div>
                </div>

            {/* Login with google button */}
            <motion.button {...buttonClick}
              className='flex iteam-center justify-center p-4 px-12 py-2 bg-lightOverlay backdrop-blur-md rounded-3xl shadow-md cursor-pointer gap-4'
              onClick={loginWithGoogle}
            >
              <FcGoogle className='text-3xl' />
              <p className='capitalize text-base text-headingColor'>
                Sigin with Google
              </p>
            </motion.button>

        </div>

    </div>
  );
}

export default Login;
