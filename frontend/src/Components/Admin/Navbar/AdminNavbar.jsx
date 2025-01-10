import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa6";


const AdminNavbar = ({isMobile,setIsMobile}) => {
  return (
    <div className="flex fixed z-10 w-full bg-white pl-8 top-0 h-20 pr-10 justify-between items-center shadow-md"> {/* Use w-full for full width */}
      <h1 className="hidden md:block text-lg md:ml-[300px] text-gray-500 font-bold">WELCOME</h1>
      <button className="md:hidden text-3xl" onClick={()=> setIsMobile(!isMobile)}><FaBars/></button>
      <div className="flex gap-4 items-center ">
      
        <div className="flex gap-4">
         
          <p className="text-2xl text-gray-600 cursor-pointer">
            <CgProfile />
          </p>
          <p>Admin</p>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;

