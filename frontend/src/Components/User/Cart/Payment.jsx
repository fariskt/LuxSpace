import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../features/cartSlice";
import axiosInstance from "../../../api/axiosInstance";
import { Oval } from "react-loader-spinner";

const Payment = () => {
  const { cart, totalAmount } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.order);
  const { authUser, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState("COD");
  const [shippingData, setShippingData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  const handleShippingMethodChange = (method) => {
    setShippingMethod(method);
  };

  const handlePayment = async () => {
    if (
      !shippingData.address ||
      !shippingData.email ||
      !shippingData.name ||
      !shippingData.phone ||
      !shippingData.location
    ) {
      toast.error("Please fill form fields");
      return;
    }
    try {
      const products = cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      const payload = {
        userId: authUser?._id,
        products,
        shippingAddress: shippingData,
        totalAmount,
        paymentMethod: shippingMethod,
      };

      if (shippingMethod === "COD") {
        await axiosInstance.post("api/users/orders/create-order", payload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        dispatch(clearCart());
        toast.success("Order placed successfully!.");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (shippingMethod === "online") {
        const { data } = await axiosInstance.post(
          "/api/users/orders/create-order",
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const { razorpayOrderId } = data;

        const options = {
          key: "rzp_test_Zn2JWAzzdF2QT4",
          amount: totalAmount * 100,
          currency: "INR",
          name: "LuxSpace",
          description: "Test Transaction",
          order_id: razorpayOrderId,
          handler: async (response) => {
            try {
              await axiosInstance.post(
                "/api/users/orders/verify-payment",
                {
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );

              toast.success("Payment successful! Your order has been placed.");
              dispatch(clearCart());
              setTimeout(() => {
                navigate("/");
              }, 1000);
            } catch (error) {
              console.log(error);
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: shippingData.name,
            email: shippingData.email,
            contact: shippingData.phone,
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error("Error handling payment:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="flex items-center mb-6">
            <button
              className={`px-4 py-2 mr-2 rounded-lg border ${
                shippingMethod === "COD"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handleShippingMethodChange("COD")}
            >
              Cash on Delivery
            </button>
            <button
              className={`px-4 py-2 rounded-lg border ${
                shippingMethod === "online"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handleShippingMethodChange("online")}
            >
              Online Payment
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={shippingData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={shippingData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={shippingData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Enter Address
              </label>
              <textarea
                type="text"
                name="address"
                value={shippingData.address}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter your address here..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Choose Location
              </label>
              <select
                name="location"
                value={shippingData.location}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">Choose State</option>
                <option value="kerala">Kerala</option>
                <option value="tamilnadu">Tamil nadu</option>
                <option value="karnataka">Karnataka</option>
              </select>
            </div>
          </form>
        </div>

        <div className="flex-1 md:p-4">
          <h2 className="text-xl font-semibold mb-4">Review Your Cart</h2>
          <div className="flex flex-col justify-between h-56 overflow-y-auto ">
            {cart &&
              cart.map((item) => (
                <div
                  className="flex gap-2 justify-between w-full  bg-gray-100 p-2 rounded-md max-h-36"
                  key={item._id}
                >
                  <div className="flex gap-5">
                    <img
                      className="h-16 w-16 rounded-md border border-gray-900"
                      src={item.productId.img}
                      alt="image"
                    />
                    <span className="text-sm max-h-16 overflow-hidden">
                      {" "}
                      <b>Name:</b> {item.productId.name} <br /> <b>Qty:</b> (
                      {item.quantity})
                    </span>
                  </div>
                  <span>₹{item.productId.price}</span>
                </div>
              ))}
          </div>
          <div className="mt-10 md:ml-10">
            <div className="flex md:flex-row flex-col justify-between gap-4">
              <span>Subtotal</span>
              <span className="font-semibold">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-gray-700">free delivery</span>
            </div>
            <div className="flex justify-between ">
              <span>Discount</span>
              <span className="text-gray-700">₹40</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Grand Total</span>
              <span>₹{totalAmount + 50}</span>
            </div>
            <button
              className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg shadow-lg hover:bg-gray-800 transition"
              onClick={handlePayment}
            >
              {loading ? (
                <span className="flex justify-center b">
                  <Oval
                    visible={true}
                    height="25"
                    width="40"
                    color="black"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    strokeWidth="5"
                  />
                </span>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
