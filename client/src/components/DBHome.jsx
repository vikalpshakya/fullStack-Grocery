import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { CChart } from '@coreui/react-chartjs';

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const Produce = products?.filter((item) => item.product_category === "Produce");
  const DailyStaples = products?.filter((item) => item.product_category === "Daily Staples"); 
  const Beverages = products?.filter((item) => item.product_category === "Beverages");
  const SnacksPackagedFoods = products?.filter((item) => item.product_category === "cc");
  const DairyBakery = products?.filter((item) => item.product_category === "Dairy & Bakery");
  const CleaningHouseholdEssentials = products?.filter((item) => item.product_category === "Cleaning & Household Essentials");
  const BeautyHygiene = products?.filter((item) => item.product_category === "Beauty & Hygiene");
  const HomeKitchen = products?.filter((item) => item.product_category === "Home & Kitchen");
  const BabyCare = products?.filter((item) => item.product_category === "Baby Care");
  const PetCare = products?.filter((item) => item.product_category === "Pet Care");

  useEffect(() => {
    if(!products){
      getAllProducts().then((data) =>{
        dispatch(setAllProducts(data));
      })
    }
  }, []);
  return (
    <div className='flex items-center justify-center flex-col pt-6 w-full h-full' >

    <div className='grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full '>
      <div className='flex items-center justify-center'>
      <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "Produce",
                  "DailyStaples",
                  "Beverages",
                  "SnacksPackagedFoods",
                  "DairyBakery",
                  "CleaningHouseholdEssentials",
                  "BeautyHygiene",
                  "HomeKitchen",
                  "BabyCare",
                  "PetCare",
                ],
                datasets: [
                  {
                    label: "Category wise Count",
                    backgroundColor: "#f87979",
                    data: [
                      Produce?.length,
                      DailyStaples?.length,
                      Beverages?.length,
                      SnacksPackagedFoods?.length,
                      DairyBakery?.length,
                      CleaningHouseholdEssentials?.length,
                      BeautyHygiene?.length,
                      HomeKitchen?.length,
                      BabyCare?.length,
                      PetCare?.length,
                    ],
                  },
                ],
              }}
              labels="months"
            />
          </div>
      </div>
      <div className='w-full h-full flex items-center justify-center'>
      <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "Orders",
                  "Delivered",
                  "Cancelled",
                  "Paid",
                  "Not Paid",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#51FF00",
                      "#00B6FF",
                      "#008BFF",
                      "#FFD100",
                      "#FF00FB",
                    ],
                    data: [40, 20, 80, 34, 54],
                  },
                ],
              }}
            />
          </div>
      </div>
    </div>

    </div>
  )
}

export default DBHome