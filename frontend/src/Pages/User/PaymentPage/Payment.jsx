import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { CartContext } from "../../../context/CartContext";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import toast from "react-hot-toast";

const Payment = () => {
  const { id } = useParams();
  const { products, loadOrder } = useContext(AppContext);
  const { user, token } = useContext(AuthContext);
  const { cartQuantity } = useContext(CartContext);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const productToOrder = products.find((item) => item._id === id);

  const placeOrder = async () => {
    const orderData = {
      userId: user.id,
      products: [
        {
          product: productToOrder._id,
          category: productToOrder.category,
          price: productToOrder.price,
          color: productToOrder.color,
          img: productToOrder.img,
        },
      ],
      shippingAddress: {
        name: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
      },
      totalAmount: productToOrder.price,
    };
    try {
      const response = await axios.post(
        `http://localhost:8000/api/orders`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Your order is placed");
      await loadOrder();
      navigate("/");
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        location: "",
      });
    } catch (error) {
      console.log("Error adding orders ", error);
    }
  };

  return (
    <div className="pt-28 w-[80%] mx-auto flex gap-20 justify-center items-center">
      <div className="w-full max-w-md border border-gray-300 bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Enter Details</h1>
          <div className="flex items-center gap-2">
            <img
              src="https://download.logo.wine/logo/Visa_Inc./Visa_Inc.-Logo.wine.png"
              alt="visa"
              className="h-10"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLcyTIX-OifXAR50FVc6itTEsGOJI0Q3ortjrBnT0-N4UmKWnq9u_L9oadSwbvp7KQ4Ck&usqp=CAU"
              alt="debit"
              className="h-10"
            />
            <img
              src="https://cdn.worldvectorlogo.com/logos/maestro-2.svg"
              alt="maestro"
              className="h-10"
            />
          </div>
        </div>

        <form className="flex flex-col gap-4">
          <label className="text-gray-600 text-sm">Enter your full name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="text-gray-600 text-sm">Enter email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address here"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <label className="text-gray-600 text-sm">Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter email address here"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <label className="text-gray-600 text-sm">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter email address here"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </form>
      </div>

      <div className="w-full max-w-md border border-gray-300 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold">Order Summary</h1>
        <h4 className="text-gray-600">{cartQuantity} Items</h4>

        <div className="border-b border-gray-400 py-4 flex items-center gap-4">
          <img
            src={productToOrder.img}
            className="w-20 h-20 object-cover rounded-md shadow-md"
            alt="product"
          />
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-700">
              Price: ₹ {productToOrder.price * cartQuantity}
            </h4>
            <h5 className="text-sm text-gray-500">
              Name: {productToOrder.name}
            </h5>
            <h5 className="text-sm text-gray-500">
              Color: {productToOrder.color}
            </h5>
            <h5 className="text-sm text-gray-500">Quantity: {cartQuantity}</h5>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <div className="flex justify-between my-2">
            <h5>Subtotal</h5>
            <h5>₹ {productToOrder.price * cartQuantity}</h5>
          </div>
          <div className="flex justify-between my-2">
            <h5>Delivery</h5>
            <h5>Free</h5>
          </div>
          <div className="flex justify-between my-2">
            <h5>Discount</h5>
            <h5>₹ 100</h5>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <h5>Total to pay</h5>
            <h5>₹ {productToOrder.price * cartQuantity - 100}.00</h5>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={placeOrder}
            className="bg-green-600 text-white w-full py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
