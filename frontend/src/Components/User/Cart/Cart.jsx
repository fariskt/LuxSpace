import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Summary from "./Summary";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCartQuantity,
  fetchUserCart,
  increaseCartQuantity,
  removeFromCart,
  updateCartLocally,
} from "../../../features/cartSlice";

const Cart = () => {
  const { cart, loading  } = useSelector((state) => state.cart);

  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser?._id) {
      dispatch(fetchUserCart(authUser?._id));      
    }
  }, [dispatch, authUser?._id]);

  const hanldeRemove = (productId) => {
    const filteredCart = cart.filter((item) => item._id !== productId);

    dispatch(updateCartLocally(filteredCart));
    dispatch(removeFromCart({ productId }));
  };

  

const handleIncrease = (productId) => {
  const updatedCart = cart.map((item) => {
    if (item._id === productId) {
      if (item.quantity < item.productId.stock) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        toast.error("Cannot add more, stock limit reached!")
        return item;
      }
    }
    return item;
  });

  const filteredCart = updatedCart.filter((item) => item.quantity > 0);

  dispatch(updateCartLocally(filteredCart));
  dispatch(increaseCartQuantity({ productId }));
};


  const handleDecrease = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity - 1 } : item);
    const filteredCart = updatedCart.filter((item) => item.quantity > 0);

    dispatch(updateCartLocally(filteredCart));
    dispatch(decreaseCartQuantity({ productId }));
  };

  return (
    <div
      className="flex flex-col md:flex-row mt-28 w-[90%] md:w-[70%]  mx-auto justify-between shadow-md border rounded-md"
      style={{ minHeight: "500px" }}
    >
      <div className="py-4 px-8 w-full">
        <div className="flex justify-between border-b-2 py-6 items-center">
          <h1 className="text-2xl p-2 font-bold mb-2">Shopping Cart</h1>
          <h3 className="text-md mr-4 font-bold text-gray-600">
            {cart?.length || 0} items
          </h3>
        </div>

        {cart && cart?.length > 0 ? (
          <div
            className="flex flex-col  gap-10 py-6 h-[400px]  md:w-[700px] overflow-y-auto"
            style={{ maxHeight: "400px" }}
          >
            {loading ? "loading..." : cart?.map((item, index) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-center gap-8 border-b py-4 items-center"
              >
                <img
                  src={item.productId?.img}
                  className="w-[100px] h-[100px]"
                  alt="an image"
                />
                <div className="flex flex-col gap-2 md:w-[400px]">
                  <p>Type: {item.productId?.category}</p>
                  <p className="w-fit">Name : {item.productId?.name}</p>
                  <div className="border border-gray-300 rounded-md bg-white w-[120px] flex  items-center">
                    <button
                      className="py-2 px-4 font-extrabold border-r"
                      disabled={item.quantity === 1}
                      onClick={() => handleDecrease(item._id)}
                    >
                      -
                    </button>
                    <button className="py-2 px-4 border-r">
                      {item.quantity}
                    </button>
                    <button
disabled={item.quantity > item.productId?.stock}
                      className="py-2 px-4 font-extrabold"
                      onClick={() => handleIncrease(item._id)}
                    >
                      +
                    </button>
                    <button
                      title="delete"
                      className="text-lg w-[100px] text-gray-700 ml-10"
                      onClick={() => hanldeRemove(item._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="w-[100px]">₹ {item.productId.price * item.quantity}.00</p>
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
      </div>
      {cart && cart.length > 0 && <Summary cart={cart} />}
    </div>
  );
};

export default Cart;
