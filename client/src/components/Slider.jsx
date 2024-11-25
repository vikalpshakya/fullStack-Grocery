import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [snacks, setSnacks] = useState(null);
  useEffect(() => {
    setSnacks(products?.filter((data) => data.product_category === "Dairy & Bakery"));
    console.log(snacks);
  }, [products]);

  return (
    <div className="w-full pt-12">
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        autoplay={{ delay: 1000 }}
        loop={true}        
       
        spaceBetween={30}
        grabCursor={true}
        
        className="mySwiper"
      >
        {snacks &&
          snacks.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i} />
              
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
