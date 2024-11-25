import React from 'react'

const Spinner = () => {
  return (
    <div className="relative">
      <div className="w-10 h-10 border-2 border-red6 rounded-full animate-ping"></div>
      <div className="absolute inset-0 w-10 h-10 border-2 border-red6 rounded-full blur-md"></div>
    </div>

    // <div className='w-full  flex  flex-col items-center justify-center'>

    //     <div className=" w-10 h-10  border-red6 animate-ping rounded-full flex items-center justify-center relative">
    //         <div className='absolute w-full h-full inset-0  rounded-full border-red6 blur-xl'></div>
    //     </div>

    // </div>

    // <div className="w-full flex flex-col items-center justify-center min-h-[200px]">
    //   <div className="relative">
    //     <div className="w-10 h-10 border-4 border-red6 rounded-full animate-ping"></div>
    //     <div className="absolute inset-0 w-10 h-10 border-4 border-red6 rounded-full blur-md"></div>
    //   </div>
    // </div>
    
  );
};

export default Spinner;