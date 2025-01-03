import React, { useContext, useEffect } from "react";
import { CartContext } from "../../../context/CartContext";
import { MdDelete } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Summary from "./Summary";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import apiClient from "../../../api/apiClient";

const Cart = () => {
  const { cart, removeFromCart, setCart } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  const updateQuantity = async (prId, action) => {
    try {
      const currentItem = cart.products.find((item) => item.productId === prId);
      if (currentItem) {
        const newQuantity =
          action === "increment"
            ? currentItem.quantity + 1
            : Math.max(currentItem.quantity - 1, 1);

        setCart((prevCart) => ({
          ...prevCart,
          products: prevCart.products.map((cartItem) =>
            cartItem.productId === prId
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          ),
        }));

        const response = await apiClient.patch(`/api/cart/${user.id}`, {
          productId: prId,
          quantity: newQuantity,
        });

        if (response.status !== 200) throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="flex flex-col md:flex-row mt-28 w-[90%] md:w-[70%]  mx-auto justify-between shadow-md border rounded-md"
      style={{ minHeight: "500px" }}
    >
      <div className="py-4 px-8 w-full">
        <div className="flex justify-between border-b-2 py-6 items-center">
          <h1 className="text-2xl p-2 font-bold mb-2">Shopping Cart</h1>
          <h3 className="text-md mr-4 font-bold text-gray-600">
            {cart?.products?.length || 0} items
          </h3>
        </div>

        {cart && cart.products && cart.products.length > 0 ? (
          <div
            className="flex flex-col  gap-10 py-6 h-[400px]  md:w-[700px] overflow-y-auto"
            style={{ maxHeight: "400px" }}
          >
            {cart.products.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-center gap-8 border-b py-4 items-center"
              >
                <img
                  src={item.productId.img}
                  className="w-[100px] h-[100px]"
                  alt="an image"
                />
                <div className="flex flex-col gap-2 md:w-[400px]">
                  <p>Type: {item.productId.category}</p>
                  <p className="w-fit">Name : {item.productId.name}</p>
                  <div className="border border-gray-300 rounded-md bg-white w-[120px] flex  items-center">
                    <button
                      className="py-2 px-4 font-extrabold border-r"
                      onClick={() => updateQuantity(item._id, "decrement")}
                    >
                      -
                    </button>
                    <button className="py-2 px-4 border-r">
                      {item.quantity}
                    </button>
                    <button
                      className="py-2 px-4 font-extrabold"
                      onClick={() => updateQuantity(item._id, "increment")}
                    >
                      +
                    </button>
                    <button
                      title="delete"
                      className="text-lg w-[100px] text-gray-700 ml-10"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="w-[100px]">
                    ₹ {item.productId.price * item.quantity}.00
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1
            style={{
              textAlign: "center",
              fontSize: "2rem",
              margin: "30px 0",
            }}
          >
            Your cart is empty
          </h1>
        )}

        <div className="flex items-center gap-2 py-2 mt-4">
          <span className="text-green-800 text-xl">
            <IoIosArrowBack />
          </span>
          <Link to="/">
            <h2 className="cursor-pointer">Go to Shopping</h2>
          </Link>
        </div>
      </div>
      {cart && cart.products && cart.products.length > 0 && <Summary />}
    </div>
  );
};

export default Cart;
