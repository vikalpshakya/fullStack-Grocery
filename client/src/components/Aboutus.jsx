import React from 'react';
import Header from './Header';

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <Header />
        {/* Main Content */}
        <div className="relative mt-8 overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Column (Text) */}
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                ABOUT US
              </h1>
              <p className="max-w-xl text-lg text-gray-600">
                At BASKET BUZZ, we are your one-stop shop for convenient, fast, and reliable grocery delivery right to your doorstep. 
                With a wide selection of fresh produce, pantry staples, household essentials, and more, we strive to bring the grocery store experience to you, saving you valuable time and effort. Our commitment to quality, competitive pricing, and excellent customer service ensures you receive the best possible shopping experience, whenever and wherever you need it.
              </p>
              <div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="relative flex items-center justify-center h-full">
              <img
                src="https://static.vecteezy.com/system/resources/previews/022/835/620/non_2x/modern-logo-vegetable-in-box-with-wheels-for-grocery-delivery-logo-design-vector.jpg"
                alt="Grocery Delivery Logo"
                className="h-[70%] w-auto object-contain rounded-lg" // Adjusted size
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
