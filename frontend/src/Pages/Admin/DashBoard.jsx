import React, { useEffect } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardDetails } from "../../features/adminSlice";

const DashBoard = () => {
  const dispatch = useDispatch();

  const { accessToken, isAdminAuthenticated } = useSelector((state) => state.auth);
  const { totalUsers, totalProducts, totalOrders, totalIncome, dashboardLoading } =
    useSelector((state) => state.admin);

  useEffect(() => {
    if (accessToken && isAdminAuthenticated) {
      dispatch(fetchDashboardDetails());
    }
  }, [accessToken, isAdminAuthenticated, dispatch]);

  // Render the skeleton loader if the data is still loading
  const renderSkeletonCard = () => (
    <div className="animate-pulse bg-gray-100 flex items-center gap-4 p-8 rounded-md shadow-md w-fit">
      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
      <div className="flex flex-col gap-2">
        <div className="h-5 w-32 bg-gray-300 rounded-md"></div>
        <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-[90vh] w-full ml-2 p-6 mt-16">
      <h1 className="text-3xl pt-8 ml-10">Dashboard</h1>
      <div className="flex gap-10 items-center pt-10 ml-10 flex-wrap">
        {dashboardLoading ? (
          <>
            {renderSkeletonCard()}
            {renderSkeletonCard()}
            {renderSkeletonCard()}
            {renderSkeletonCard()}
          </>
        ) : (
          <>
            <div className="bg-white flex items-center gap-4 p-8 rounded-md shadow-md w-fit">
              <span className="text-2xl bg-gray-100 p-4 rounded-lg text-blue-700">
                <MdShoppingCartCheckout />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg">Total Products</h3>
                <h3 className="font-semibold text-2xl">{totalProducts}</h3>
              </div>
            </div>
            <div className="bg-white flex items-center gap-4 p-8 rounded-md shadow-md w-fit">
              <span className="text-3xl bg-gray-100 p-3 rounded-lg text-orange-600">
                <MdAttachMoney />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg">Total Revenue</h3>
                <h3 className="font-semibold text-2xl">₹{totalIncome}</h3>
              </div>
            </div>
            <div className="bg-white flex items-center gap-4 p-8 rounded-md shadow-md w-fit">
              <span className="text-2xl bg-gray-100 p-4 rounded-lg text-violet-600">
                <BsCartCheck />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg">Total Orders</h3>
                <h3 className="font-semibold text-2xl">{totalOrders}</h3>
              </div>
            </div>
            <div className="bg-white flex items-center gap-4 p-8 rounded-md shadow-md w-fit">
              <span className="text-2xl bg-gray-100 p-4 rounded-lg text-green-600">
                <AiOutlineUser />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg">Total Users</h3>
                <h3 className="font-semibold text-2xl">{totalUsers}</h3>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
