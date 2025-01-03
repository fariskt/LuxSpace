import React, { useContext } from "react";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { HiMiniShoppingBag, HiUsers } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { IoBagCheck } from "react-icons/io5";
import { Navigate } from "react-router-dom";
import {AppContext} from "../../../context/AppContext";

const menuItems = [
  { id: "dashboard", icon: <LuLayoutDashboard />, label: "Dashboard" },
  { id: "products", icon: <HiMiniShoppingBag />, label: "Products" },
  { id: "users", icon: <HiUsers />, label: "Users" },
  { id: "orders", icon: <IoBagCheck />, label: "Orders" },
];

const SideBar = ({ setActivePage, activePage }) => {
  const { setIsAdminLogin } = useContext(AppContext);

  const handleLogout = () => {
    setIsAdminLogin(false);
    sessionStorage.removeItem("isAdminLogin");
    Navigate("/login");
  };
  
  return (
    <div className="fixed top-0 h-full left-0 w-[300px] bg-gray-800 text-white flex flex-col justify-between pt-8">
      <div>
        <div className="flex items-center">
          <img src="/weblogo.png" alt="Logo" className="h-16 ml-4" />
          <h1 className="text-xl font-bold">LuxSpace</h1>
        </div>
        <div className="p-8">
          <div className="flex flex-col gap-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-4 cursor-pointer  p-2 text-gray-400 hover:text-white duration-200 ${
                  activePage === item.id
                    ? "bg-gray-700 text-white rounded-md"
                    : ""
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <h4>{item.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col px-8 py-10 mb-4 gap-6">
        <div className="flex items-center gap-4 cursor-pointer text-gray-400 hover:text-white duration-200">
          <span className="text-2xl">
            <IoIosSettings />
          </span>
          <h4>Settings</h4>
        </div>
        <div className="flex items-center gap-4 cursor-pointer text-gray-400 hover:text-white duration-200">
          <span className="text-2xl">
            <LuLogOut />
          </span>
          <h4 onClick={handleLogout}>Logout</h4>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
