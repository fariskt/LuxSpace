import React from "react";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, fetchUserCart } from "../../../features/cartSlice";
import toast from "react-hot-toast";
import { BsCart2 , BsCartCheckFill} from "react-icons/bs";


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { accessToken, authUser } = useSelector((state) => state.auth);
  const { _id, img, category, name, price } = product;

  const handleAddToCart = (id) => {
    if (accessToken) {
      dispatch(addToCart({ productId: id, quantity: 1 }))
        .unwrap()
        .then(() => {
          dispatch(fetchUserCart(authUser?._id));
          toast.success("Product added to the cart");
        })
        .catch((err) => toast.error(err.message));
    } else {
      toast.error("Please login to account");
    }
  };

  const isInCart = cart?.some((item) => item?.productId?._id === _id);

  return (
    <div className="relative bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4">
      <span className="absolute text-gray-200 text-6xl font-bold top-4 left-4 -z-10 uppercase tracking-wide">
        {category}
      </span>

      <Link
        to={`/product/${_id}`}
        className="flex justify-center items-center bg-gray-100 rounded-lg h-44 mb-4"
      >
        <img
          src={img}
          alt={name}
          className="w-auto h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </Link>

      {/* Product Details */}
      <div className="text-center min-h-36">
        <p className="text-gray-600 text-sm mb-1">{category}</p>
        <Link
          to={`/product/${_id}`}
          className="block text-lg max-h-14 overflow-hidden font-medium text-gray-800 hover:text-blue-400 transition-all"
        >
          {name}
        </Link>
        <p className="text-sm text-gray-500 mt-2">2021 • White & Black</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-xl font-bold text-gray-800">₹{price}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleAddToCart(_id)}
            disabled={isInCart}
            className={`p-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition ${
              isInCart ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isInCart ? <BsCartCheckFill/> : <BsCart2/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
