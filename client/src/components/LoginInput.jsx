import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInOut } from '../animation';
const LoginInput = ({placeHolder, icon, inputState, inputStateFunc, type,  isSignUp}) => {
  
    const [isFocus, setIsFocus] = useState(false);

    return (
    <motion.div
      {...fadeInOut}
    
     className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2 
    ${isFocus ? "shadow-md shadow-red-500" : "shadow-none"}`}>
        {icon}
        <input
          type={type}
          className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
          placeholder={placeHolder}
          value={inputState}
          onChange={(e) => inputStateFunc(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
    </motion.div>
  );
};

export default LoginInput