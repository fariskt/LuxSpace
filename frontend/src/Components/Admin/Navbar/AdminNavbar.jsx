import React from "react";
import { CgProfile } from "react-icons/cg";

const AdminNavbar = () => {
  return (
    <div className="flex fixed w-full bg-white pl-8 top-0 h-20 pr-10 justify-between items-center shadow-md"> {/* Use w-full for full width */}
      <h1 className="text-lg ml-[300px] text-gray-500 font-bold">WELCOME</h1>
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

