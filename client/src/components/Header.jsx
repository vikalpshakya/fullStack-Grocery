import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Avatar, Logo } from '../assets'
import { isActiveStyle, isNotActiveStyle } from '../utils/styles'
import { motion } from 'framer-motion'
import { buttonClick, sildeTop } from '../animation'
import { MdLogout, MdShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../config/firebase.config'
import { getAuth } from 'firebase/auth'
import { setUserNull } from '../context/actions/userAction'
import { setCartOn } from "../context/actions/displayCartAction"

const Header = () => {
    const user=useSelector(state=>state.user);
    const cart = useSelector((state) => state.cart);
    
    const [isMenu, setIsMenu] = useState(false);
    const firebaseAuth = getAuth(app);
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const signOut = () => {
        firebaseAuth.signOut().then(()=> {
            dispatch(setUserNull());
            navigate("/login", {replace: true});
        }).catch((err) => console.log(err.message));  
    };
  return (
    <header className='fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6'>
        <NavLink to={"/"} className={"flex items-center justify-center gap-4"}>
                <img src={Logo} className='w-12' alt=""/>
                <p className='font-semibold text-xl text-headingColor'>BASKET BUZZ
                </p>
        </NavLink>
        <nav className='flex items-center justify-center gap-8'>
            <ul className='hidden md:flex items-center justify-center gap-16'>
                <NavLink className={({isActive}) => isActive? isActiveStyle:isNotActiveStyle} to={"/"}>Home</NavLink>
                <NavLink className={({isActive}) => isActive? isActiveStyle:isNotActiveStyle} to={"/user-orders"}>Orders</NavLink>
                <NavLink className={({isActive}) => isActive? isActiveStyle:isNotActiveStyle} to={"/services"}>Services</NavLink>
                <NavLink className={({isActive}) => isActive? isActiveStyle:isNotActiveStyle} to={"/aboutus"}>About Us</NavLink>
            </ul>
            <motion.div {...buttonClick} 
                onClick={() => dispatch(setCartOn())}
                className='relative cursor-pointer'>
                <MdShoppingCart className='text-3xl text-textColor'/>
                {cart?.length > 0 && (
                    <div className='w-6 h-6 rounded-full bg-red5 flex items-center justify-center absolute -top-4 -right-1'>
                        <p className='text-primary text-base font-semibold '>{cart?.length}</p>
                    </div>
                )}
            </motion.div>
            {user?(
            <>
                <div className='relative cursor-pointer' onMouseEnter={() => setIsMenu(true)} onMouseLeave={() => setIsMenu(false)}>
                    <div className='w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center'>
                        <motion.img 
                            className='w-full h-full object-cover' 
                            src={user?.picture ? user?.picture : Avatar } 
                            whileHover={{scale:1.15}}  
                            referrerPolicy='no-referrer'
                        />
                    </div>
                    {isMenu && (
                        <motion.div 
                        {...sildeTop}
                        className='px-6 py-4 w-48 bg-white backdrop-blur-md rounded-md absolute top-12 right-0 flex flex-col gap-4'>

                        {user?.user_id === process.env.REACT_APP_ADMIN_ID && (
                            <Link className=' hover:text-green5 text-xl text-textColor' 
                            to={"/dashboard/home"}
                        >
                            Dashboard
                        </Link>
                        )}
                        <Link className=' hover:text-green5 text-xl text-textColor' 
                            to={"/profile"}
                        >
                            My Profile
                        </Link>
                        <Link className=' hover:text-green5 text-xl text-textColor' 
                            to={"/user-orders"}
                        >
                            Orders
                        </Link>
                        
                       
                        <hr />
                        <motion.div 
                            onClick={signOut}
                            {...buttonClick} className='group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray1 hover:bg-gray2 gap-3'>
                            <MdLogout className='text-3xl text-textColor group-hover::text-headingColor'/>
                            <p className='text-xl text-textColor group-hover:text-green4'>
                                Sin out
                            </p>
                        </motion.div>
                    </motion.div>
                    )}
                    
                </div>
            </>
            )
            :(<>
                <NavLink to={"/login"} >
                    <motion.button {...buttonClick} className='px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-green5 cursor-pointer'>
                        Login
                    </motion.button>
                </NavLink>
            </>)}
        </nav>
    </header>
  )
}

export default Header