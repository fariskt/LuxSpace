import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../../features/adminSlice";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orders, totalOrders } = useSelector((state) => state.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState(null);


  useEffect(() => {
    dispatch(fetchAllOrders({ page: currentPage, limit: 10 }));
  }, [currentPage]);

  const totalPages = Math.ceil(totalOrders / 10);


  return (
    <div className="md:container pt-28 md:mx-auto py-8 md:px-10 px-2 bg-gray-50 min-h-[90vh] w-screen overflow-x-auto">
      <h1 className="md:text-4xl text-2xl m-4 font-bold text-gray-900 mb-10 md:text-center">
        Orders
      </h1>


      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-800 border-b">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-800 border-b">
                  Username
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-800 border-b">
                  Order Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-800 border-b">
                  Total Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-800 border-b">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-800 border-b">
                  Products
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <React.Fragment key={index}>
                  <tr
                    className={`hover:bg-gray-50 even:bg-gray-50 ${
                      order.totalAmount > 5000 ? "bg-green-100" : ""
                    }`}
                  >
                    <td className="px-6 py-4 border-b text-gray-700">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-700">
                      {order.shippingAddress.name}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-700 min-w-44 md:w-auto">
                      {order.createdAt.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-700">
                      ₹{order.totalAmount}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-700">
                      {order.orderStatus === "pending" ? (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          Pending
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Completed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-700">
                      <button
                        onClick={() =>
                          setExpandedOrder(
                            expandedOrder === order._id ? null : order._id
                          )
                        }
                        className="text-blue-500 underline"
                      >
                        {expandedOrder === order._id
                          ? "Hide Products"
                          : "View Products"}
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order._id && (
                    <tr className="bg-gray-100">
                      <td colSpan="6" className="p-4">
                        <ul className="grid grid-cols-2 gap-4">
                          {order.products.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-sm"
                            >
                              <img
                                src={item.productId?.img}
                                alt="product"
                                className="w-12 h-12 object-cover rounded-md"
                              />
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {item.productId?._id}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Quantity: {item.quantity}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Price: ₹{item.productId?.price}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {orders.length > 10 && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No orders found</p>
      )}
    </div>
  );
};

export default OrderDetails;
