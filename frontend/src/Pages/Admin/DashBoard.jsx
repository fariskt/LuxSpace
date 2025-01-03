import React, { useContext } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import {AppContext} from "../../context/AppContext";
import { AiOutlineUser } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";

const DashBoard = () => {
  const { products, users ,orders } = useContext(AppContext);

  const totalRevenue = products.reduce((acc, val) => {
    return acc + parseInt(val.price);
  }, 0);

  return (
    <div className="relative min-h-[90vh] w-full ml-2 p-6 mt-16">
      <h1 className="text-3xl pt-8 ml-10">Dashboard</h1>
      <div className="flex gap-10 items-center pt-10 ml-10 flex-wrap">
        <div className="bg-white flex items-center gap-4 p-8 rounded-md shadow-md w-fit">
          <span className="text-2xl bg-gray-100 p-4 rounded-lg text-blue-700">
            <MdShoppingCartCheckout />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg">Total Products</h3>
            <h3 className="font-semibold text-2xl">{products.length}</h3>
          </div>
        </div>
        <div className="bg-white flex items-center gap-4 p-8 rounded-md shadow-md w-fit">
          <span className="text-3xl bg-gray-100 p-3 rounded-lg text-orange-600">
            <MdAttachMoney />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg">Total Revenue</h3>
            <h3 className="font-semibold text-2xl">₹{totalRevenue}</h3>
          </div>
        </div>
        <div className="bg-white flex items-center gap-4 p-8 rounded-md shadow-md w-fit">
          <span className="text-2xl bg-gray-100 p-4 rounded-lg text-violet-600">
            <BsCartCheck />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg">Total Orders</h3>
            <h3 className="font-semibold text-2xl">{orders.length}</h3>
          </div>
        </div>
        <div className="bg-white flex items-center gap-4 p-8 rounded-md shadow-md w-fit">
          <span className="text-2xl bg-gray-100 p-4 rounded-lg text-green-600">
            <AiOutlineUser />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg">Total Users</h3>
            <h3 className="font-semibold text-2xl">{users.length}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
