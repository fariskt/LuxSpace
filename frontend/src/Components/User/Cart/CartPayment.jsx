import React, { useContext, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import {AppContext} from "../../../context/AppContext";
import axios from "axios";
import {CartContext} from "../../../context/CartContext";

const CartPayment = ({ setShowPayment, cart }) => {
  const { setOrders, userId ,userName} = useContext(AppContext);
  const { setCart } = useContext(CartContext);
  const [isOrdered, setIsOrdered] = useState(false);
  const modalRef = useRef(null);

  const total_price = cart.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  const placeOrder = async () => {
    const orderData = {
      userId: userId,
      username: userName,
      items: cart,
      totalAmount: total_price,
      orderdate: new Date().toISOString(),
    };
    try {
      setIsOrdered(true);
      setTimeout(() => {
        setIsOrdered(false);
      }, 8000);
      setCart([]);
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        cart: [],
      });
      await axios.post("http://localhost:3000/orders", orderData);
      setOrders((prevOrder) => [...prevOrder, orderData]);
    } catch (error) {
      console.log("Error adding orders ", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowPayment(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPayment]);

  return (
    <>
      {isOrdered && (
        <div className="z-50">
          <Confetti />
        </div>
      )}
      {isOrdered && (
        <div className="flex top-[80%] right-8 w-[400px] rounded-lg py-6 px-2 absolute bg-green-600 z-50">
          <h4 className="text-xl text-center text-white">
            Your order has been placed successfully! Thank you for shopping with
            us
          </h4>
        </div>
      )}
      <div className="fixed top-14 pb-10  left-0 z-40 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div
          ref={modalRef}
          className="relative bg-white w-[600px] rounded-lg shadow-lg p-8 overflow-y-auto h-[600px]"
        >
          <button
            className="absolute top-4  right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            onClick={() => setShowPayment(false)}
          >
            &times;
          </button>

          <div className="flex justify-between items-center mt-5 mb-6">
            <h1 className="text-3xl font-semibold text-gray-700">Payment</h1>
            <div className="flex gap-2 items-center">
              <img
                src="https://download.logo.wine/logo/Visa_Inc./Visa_Inc.-Logo.wine.png"
                alt="visa"
                className="h-10 object-contain"
              />
              <img
                src="./maestro.png"
                alt="maestro"
                className="h-10 object-contain"
              />
              <img
                src="./mastercard.png"
                alt="mastercard"
                className="h-10 object-contain"
              />
            </div>
          </div>

          <div className="mb-6">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Card holder's name:
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="card"
                  className="block text-sm font-medium text-gray-600"
                >
                  Card Number:
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                  placeholder="xxxx xxxx xxxx xxxx"
                />
              </div>

              <div className="flex justify-between gap-4">
                <div className="w-1/2">
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Expiry Date:
                  </label>
                  <input
                    type="date"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-600"
                  >
                    CVV:
                  </label>
                  <input
                    type="password"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                    placeholder="xxx"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p>{cart.length} Items</p>
            {cart.map((item, index) => (
              <div key={index} className="border-b py-4 flex items-start gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
                <div>
                  <h4 className="font-bold text-gray-700">
                    ₹ {item.price * item.quantity}
                  </h4>
                  <p className="text-sm text-gray-500">Name: {item.name}</p>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <div className="flex justify-between text-sm my-2">
                <span>Subtotal:</span>
                <span>₹ {total_price}</span>
              </div>
              <div className="flex justify-between text-sm my-2">
                <span>Delivery:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount:</span>
                <span>₹ 100</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total to Pay:</span>
                <span>₹ {total_price - 100}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={placeOrder}
              className="bg-green-600 text-white w-full py-3 rounded-lg shadow-lg hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPayment;
