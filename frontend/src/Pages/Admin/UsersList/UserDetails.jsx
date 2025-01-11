import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { blockOrUnblockUser } from "../../../features/adminSlice";
import { TailSpin } from "react-loader-spinner";

const UserDetails = ({ setShowDetails }) => {
  const dispatch = useDispatch();
  const { user ,loading} = useSelector((state) => state.admin);
  const { userOrders } = useSelector((state) => state.order);

  const handleBlockUser = async () => {
    try {
      await dispatch(blockOrUnblockUser(user?._id));
    } catch (error) {
      console.log("error blocking user ", error);
    }
  };

  return (
    <div className="mt-24 md:w-[92%] md:ml-16 bg-white py-8 rounded-lg shadow-md transition duration-300">
      <div className="flex justify-between items-center mb-8 px-6 border-b pb-4 border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <span
            className="cursor-pointer text-gray-400 text-3xl"
            onClick={() => setShowDetails(false)}
          >
            <IoIosArrowBack />
          </span>
          User Details
        </h1>
        <button
          onClick={() => setShowDetails(false)}
          className="text-lg bg-gray-200 rounded-lg py-2 px-4 hover:bg-gray-300 transition duration-200"
        >
          Close
        </button>
      </div>

      {loading ? (
        <div className="loader-container ml-20 ">
          <TailSpin
            visible={true}
            height="40"
            width="40"
            color="blue"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : user ? (
        <div className="px-6 space-y-10">
          <div className="space-y-6">
            <h2 className="font-semibold text-xl text-gray-800">Profile</h2>
            <div className="flex flex-col md:flex-row items-center space-x-6">
              <img
                className="hidden md:block w-36 h-36 rounded-full border border-gray-300 shadow-md"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="User Profile"
              />
              <div className="w-full flex justify-between px-4">
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-700">
                    Name:{" "}
                    <span className="font-normal text-gray-600">
                      {user.name}
                    </span>
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    Email:{" "}
                    <span className="font-normal text-gray-600">
                      {user.email}
                    </span>
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    Joined Date:{" "}
                    <span className="font-normal text-gray-600">
                      {user.createdAt.slice(0, 10)}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <button
                    className={` ${
                      user.isBlocked ? "bg-green-600" : "bg-red-600"
                    } px-4 py-2  text-white rounded-md`}
                    onClick={handleBlockUser}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-semibold text-2xl text-gray-800">Orders</h2>
            <div className="bg-white border rounded-lg p-6 shadow-lg space-y-6">
              {userOrders?.length > 0 ? (
                userOrders
                  .filter((orderData) => orderData.userId === user?._id)
                  .map((order, index) => (
                    <div
                      key={index}
                      className="border-b pb-6 mb-6 last:border-none last:pb-0 last:mb-0"
                    >
                      <div className="flex flex-col md:flex-col justify-between md:items-center mb-4">
                        <div className="space-y-1">
                          <p className="md:text-lg font-semibold text-gray-700">
                            Order ID:{" "}
                            <span className="text-gray-600">{order._id}</span>
                          </p>
                          <p className="text-gray-500">
                            Date: {order.createdAt.slice(0, 10)}
                          </p>
                        </div>
                        <div className="text-lg font-semibold text-blue-600">
                          Total: ${order.totalAmount}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 bg-gray-50 p-4 rounded-lg shadow-inner">
                        {order.products.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
                          >
                            <img
                              src={item.productId.img}
                              alt={`Product ${item.productId}`}
                              className="w-20 h-20 object-cover rounded-md border border-gray-300"
                            />
                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold text-gray-800">
                                {item.productId.name}{" "}
                              </h3>
                              <p className="text-gray-500">
                                Quantity: {item.productId.quantity}
                              </p>
                              <p className="text-gray-500">
                                Price:{" "}
                                <span className="text-gray-600 text-sm">
                                  ${item.productId.price}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-center">No orders found</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 px-6">No user selected.</p>
      )}
    </div>
  );
};

export default UserDetails;
