import { motion } from 'framer-motion'
import React from 'react'
import { HiCurrencyRupee, IoBasket } from '../assets/icons'
import { buttonClick } from '../animation'
import { addNewItemToCart, getAllCartItems } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { alertNull, alertSuccess } from '../context/actions/alertAction'
import { setCartItems } from '../context/actions/cartAction'

const SliderCard2 = ({data, index}) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    dispatch(alertSuccess('Added to cart'));
    addNewItemToCart(user?.user_id, data).then(res => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });

      setInterval(() => {
        dispatch(alertNull());
      }, 3000);
    })
    
  }
  return (
    <div className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-340 h-260 md:w-340 md:min-w-350 gap-3">
      <img src={data.imageURL} className="w-40 h-40 object-contain" alt="" />
      <div className='relative pt-8'>
        <p className='text-xl text-textColor font-semibold'>
          {data.product_name.length > 25? data.product_name.slice(0, 25) + "..." : data.product_name}
          {/* {data.product_name} */}
        </p>
        <p className='text-lg font-semibold text-textColor flex items-center justify-center gap-1'>
           <HiCurrencyRupee className='text-green5' />{" "}
           {parseFloat(data.product_price).toFixed(2)}
        </p>
      <motion.div
          {...buttonClick}
          onClick={sendToCart}
          className="w-8 h-8 rounded-full bg-orange5 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
          >
          <IoBasket className="text-2xl text-primary" />
        </motion.div>
      </div>
    </div>
  )
}

export default SliderCard2