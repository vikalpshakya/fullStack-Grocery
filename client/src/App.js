import React, { useEffect, useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import { Dashboard, Login, Main } from './containers'
import { app } from './config/firebase.config'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from 'firebase/auth'
import { getAllCartItems, validateUserJWTToken } from './api'
import { setUserDetails } from './context/actions/userAction'
import { fadeInOut } from './animation'
import { motion } from 'framer-motion'
import { Alert, MainLoader, CheckOutSuccess, UsersOrder } from './components'
import { setCartItems } from './context/actions/cartAction'
import Aboutus from './components/Aboutus'

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoding, setIsLoding] = useState(false);
  const alert =useSelector((state) => state.alert);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoding(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then( (data) => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                console.log(items);
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoding(false);
      }, 3000);
    });
  }, [])

  return (
    <>
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
        {isLoding && (
            <motion.div {...fadeInOut} className="fixed z-50  bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full h-full">
              <MainLoader />
            </motion.div>
        )}
        <Routes>
            <Route path="/*" element={<Main/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/checkout-success" element={<CheckOutSuccess />} />
            <Route path="/user-orders" element={<UsersOrder />} />
            <Route path="/aboutus" element = {<Aboutus />}/>
        </Routes>    
        {alert?.type && <Alert type={alert.type} message={alert.message} />}
    </div>
    </>
  )
}

export default App