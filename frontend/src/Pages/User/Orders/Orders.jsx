import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, fetchUserOrder } from "../../../features/orderSlice";

const Orders = () => {
  const { userOrders, loading } = useSelector((state) => state.order);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrder(authUser?._id));
  }, [authUser?._id]);



  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {loading ? (
        ""
      ) : userOrders && userOrders.length > 0 ? (
        <div className="flex space-x-4 mb-4">
          <button className="py-2 px-4 bg-gray-200 rounded-lg font-medium">
            On Shipping
          </button>
        </div>
      ) : (
        <div>
          <h3>No order found</h3>
        </div>
      )}

      {loading
        ? "loading..."
        : userOrders?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-6 mb-4"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-bold text-lg">Order ID: {order._id}</p>
                  <p className="text-gray-500">
                    {order.shippingAddress.location}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm ${
                      order.orderStatus === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

                <h1>Products list</h1>
              <div className="grid grid-cols-2 gap-4">
                {order.products.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    <img
                      src={item.productId?.img}
                      alt={item.productId?.category}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium capitalize">
                        {item.productId?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ₹{item.productId?.price}
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
                {/* <button className="bg-orange-400 p-1" onClick={()=> handleCancelOrder(order._id)}>Cancel order</button> */}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Orders;
