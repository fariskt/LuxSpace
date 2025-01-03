import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const Orders = () => {
  const { orders } = useContext(AppContext);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length > 0 ? (
        <div className="flex space-x-4 mb-4">
          <button className="py-2 px-4 bg-gray-200 rounded-lg font-medium">
            On Shipping
          </button>
          <button className="py-2 px-4 text-gray-500">Arrived</button>
          <button className="py-2 px-4 text-gray-500">Canceled</button>
        </div>
      ) : (
        <div>
          <h3>No order found</h3>
        </div>
      )}

      {orders?.map((order) => (
        <div key={order._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-bold text-lg">Order ID: {order._id}</p>
              <p className="text-gray-500">{order.shippingAddress.location}</p>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-lg text-sm ${
                  order.orderStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {order.orderStatus}
              </span>
              <p className="text-sm text-gray-400 mt-1">
                Payment: {order.paymentStatus}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {order.products.map((item) => (
              <div key={item._id} className="flex items-center space-x-4">
                <img
                  src={item.img}
                  alt={item.category}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium capitalize">{item.category}</p>
                  <p className="text-sm text-gray-500">
                    Price: ₹{item.price} &middot; Color: {item.color}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="font-bold">
              Total: ₹{order.totalAmount}{" "}
              <span className="text-gray-500">
                ({order.products.length} Items)
              </span>
            </p>
            <button className="py-2 px-4 bg-gray-900 text-white rounded-lg">
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
