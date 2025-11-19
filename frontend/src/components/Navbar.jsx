import React from "react";

const Navbar = () => {
  return (
 <div
      className="w-full mx-auto  px-6 py-3
     md:px-40 shadow-lg h-16 fixed"
    >
      <div className="flex justify-between">
         
        <h1 className="text-2xl cursor-pointer font-bold">
        
          Word
          <span className="text-3xl text-amber-400">To</span>
          Pdf
        </h1>
        <h1 className="text-2xl cursor-pointer font-bold hover:scale-125 duration-300">Home</h1>
      </div>
    </div>
  

);
};

export default Navbar;
