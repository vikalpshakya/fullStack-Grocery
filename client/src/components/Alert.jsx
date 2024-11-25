import { motion } from 'framer-motion'
import React from 'react'
import { fadeInOut } from '../animation'
import { FaCheck } from '../assets/icons'
import {  BsExclamationTriangleFill } from '../assets/icons'
import { BiInfoCircle } from 'react-icons/bi'


const Alert = ({type, message}) => {
    if(type === "success"){
        return (
            <motion.div {...fadeInOut} className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-emerald/40 shadow-md flex items-center gap-4">
              <FaCheck className="text-xl text-emerald/100" />
              <p className='text-xl text-emerald/100'>{message}</p>
            </motion.div>
        )
    }
    if(type === "warning"){
        return (
            <motion.div {...fadeInOut} className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-orange/40 shadow-md flex items-center gap-4">
              <BsExclamationTriangleFill className="text-xl text-orange/100" />
              <p className='text-xl text-orange/100'>{message}</p>
            </motion.div>
        )
    }
    if(type === "danger"){
        return (
            <motion.div {...fadeInOut} className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-red/40 shadow-md flex items-center gap-4">
              <BsExclamationTriangleFill className="text-xl text-red/100" />
              <p className='text-xl text-red/100'>{message}</p>
            </motion.div>
        )
    }
    if(type === "info"){
        return (
            <motion.div {...fadeInOut} className="fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-blue/40 shadow-md flex items-center gap-4">
              <BiInfoCircle className="text-xl text-blue/100" />
              <p className='text-xl text-blue/100'>{message}</p>
            </motion.div>
        )
    }
}

export default Alert