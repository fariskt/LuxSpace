import React from "react";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { HiMiniShoppingBag, HiUsers } from "react-icons/hi2";
import { IoBagCheck } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";

const SideBar = ({ setActivePage, activePage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    localStorage.removeItem("accessToken")
  };

  const handleActivePage = (page) => {
    setActivePage(page);
    sessionStorage.setItem("activeAdminPage", page);
  };

  return (
    <div className="fixed top-0 h-full left-0 z-10 w-[300px] bg-gray-800 text-white flex flex-col justify-between pt-8">
      <div>
        <div className="flex items-center">
          <img src="/weblogo.png" alt="Logo" className="h-16 ml-4" />
          <h1 className="text-xl font-bold">LuxSpace</h1>
        </div>
        <div className="p-8">
          <div className="flex flex-col gap-4">
            <div
              onClick={() => handleActivePage("dashboard")}
              className={`flex items-center gap-4 cursor-pointer p-2 text-gray-400 hover:text-white duration-200 ${
                activePage === "dashboard" ? "bg-gray-700 text-white rounded-md" : ""
              }`}>
              <span className="text-2xl"><LuLayoutDashboard /></span>
              <h4>Dashboard</h4>
            </div>
            <div
              onClick={() => handleActivePage("products")}
              className={`flex items-center gap-4 cursor-pointer p-2 text-gray-400 hover:text-white duration-200 ${
                activePage === "products" ? "bg-gray-700 text-white rounded-md" : ""
              }`}>
              <span className="text-2xl"><HiMiniShoppingBag /></span>
              <h4>Products</h4>
            </div>
            <div
              onClick={() => handleActivePage("users")}
              className={`flex items-center gap-4 cursor-pointer p-2 text-gray-400 hover:text-white duration-200 ${
                activePage === "users" ? "bg-gray-700 text-white rounded-md" : ""
              }`}>
              <span className="text-2xl"><HiUsers /></span>
              <h4>Users</h4>
            </div>
            <div
              onClick={() => handleActivePage("orders")}
              className={`flex items-center gap-4 cursor-pointer p-2 text-gray-400 hover:text-white duration-200 ${
                activePage === "orders" ? "bg-gray-700 text-white rounded-md" : ""
              }`}>
              <span className="text-2xl"><IoBagCheck /></span>
              <h4>Orders</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-8 py-10 mb-4 gap-6">
        <div
          className="flex items-center gap-4 cursor-pointer text-gray-400 hover:text-white duration-200"
          onClick={handleLogout}>
          <span className="text-2xl">
            <LuLogOut />
          </span>
          <h4>Logout</h4>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
