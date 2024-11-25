import {motion} from 'framer-motion'
import React from 'react';
import { HiCurrencyRupee } from '../assets/icons';
import { buttonClick, staggerFadeInOut } from '../animation';
import { getAllOrder, updateOrderSts } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import { useDispatch } from "react-redux";

const OrderData = (index, data, admin) => {
    const dispatch = useDispatch();
    const handleClick = (orderId, sts) => {
        updateOrderSts(orderId, sts).then((response) => {
            getAllOrder().then((data) => {
                   dispatch(setOrders(data));
            });
        });
    };
   return (
                <motion.div
                {...staggerFadeInOut(index)}
                className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-md gap-4"
                
                >
                   
        
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl text-headingColor font-semibold">Orders</h1>

          <div className=" flex items-center gap-4">
            <p className="flex items-center gap-1 text-textColor">
                Total : <HiCurrencyRupee className="text-lg text-red5" />{" "}
                <span className="text-headingColor font-bold">{index?.data?.total}</span>
                {/* {index?.data.total} */}
            
            </p>

          <p className="px-2 py-[2px] text-sm text-headingColor font-semibold capitalize  rounded-md bg-emerald400 drop-shadow-md">
            {index?.data?.status}
          </p>

          <p
            className={`text-base font-semibold capitalize border border-gray3 px-2 py-[2px] rounded-md ${
              (index?.data.sts === "preparing" && "text-orange500 bg-orange100") ||
              (index?.data.sts === "Shiped" && "text-blue bg-blue1") ||
              (index?.data.sts === "cancelled" && "text-red5 bg-red100") ||
              (index?.data.sts === "delivered" && "text-emerald500 bg-emerald100") 
            }`}
          >
            {index?.data?.sts}
          </p>

          {index?.admin && (
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-semibold text-headingColor">Mark As</p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(index?.data.orderId, "preparing")}
                className={`text-orange500 text-base font-semibold capitalize border border-gray3 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Preparing
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(index?.data.orderId, "Shiped")}
                className={`text-blue text-base font-semibold capitalize border border-gray3 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Shiped
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(index?.data.orderId, "cancelled")}
                className={`text-red5 text-base font-semibold capitalize border border-gray3 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Cancelled
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(index?.data.orderId, "delivered")}
                className={`text-emerald500 text-base font-semibold capitalize border border-gray3 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Delivered
              </motion.p> 
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-start flex-wrap w-full">
        <div className="flex items-center justify-center gap-4">
          {index?.data?.items &&
            index?.data.items.map((item, j) => (
              <motion.div
                {...staggerFadeInOut(j)}
                key={j}
                className="flex items-center justify-center gap-1"
              >
                <img
                  src={item.imageURL}
                  className="w-10 h-10 object-contain"
                  alt=""
                />

                <div className="flex items-start flex-col">
                  <p className="text-base font-semibold text-headingColor">
                    {item.product_name}
                  </p>
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-textColor">
                      {" "}
                      Qty : {item.quantity}
                    </p>
                    <p className="flex items-center gap-1 text-textColor">
                      <HiCurrencyRupee className="text-base text-red5" />
                      {parseFloat(item.product_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        <div className="flex items-start justify-start flex-col gap-2 px-6 ml-auto w-full md:w-460">
          <h1 className="text-lg text-headingColor font-semibold">
            {index?.data.shipping_details.name}
          </h1>

          <p className="text-base text-headingColor -mt-2">
            {index?.data.customer.email} {index?.data.customer.phone}
          </p>

          <p className="text-base text-textColor -mt-2">
            {index?.data.shipping_details.address.line1},
            {index?.data.shipping_details.address.line2}{" "}
            {index?.data.shipping_details.address.country},
            {index?.data.shipping_details.address.state} -
            {index?.data.shipping_details.address.postal_code}
          </p>
        </div>
      </div>

    </motion.div>
  );
};

export default OrderData;