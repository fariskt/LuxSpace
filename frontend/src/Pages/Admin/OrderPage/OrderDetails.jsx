import React, { useContext } from "react";
import {AppContext} from "../../../context/AppContext";

const OrderDetails = () => {
  const { orders } = useContext(AppContext);
  console.log(orders);

  return (
    <div className="container pt-28 mx-auto py-8 px-10 bg-gray-50 min-h-[90vh]">
      <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        Orders
      </h1>
      {orders.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Username: {order.username}
              </h2>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order ID: {order.id}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Order Date: {new Date(order.orderdate).toLocaleDateString()}
              </p>
              <div className="text-lg text-gray-800 font-bold mb-6">
                Total: ₹{order.totalAmount}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-700 mb-4">Items:</h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                    >
                      <img
                        src={item.img}
                        alt="product"
                        className="w-16 h-16 object-cover rounded-md shadow-sm"
                      />
                      <div>
                        <p className="text-gray-800 font-semibold">
                          Product ID: {item.productId}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-gray-600">Price: ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No orders found</p>
      )}
    </div>
  );
};

export default OrderDetails;
