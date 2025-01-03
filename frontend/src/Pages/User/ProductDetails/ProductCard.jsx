import React from "react";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const { _id, img, category, name, price, color } = product;

  return (
    <div className="bg-white border shadow-lg rounded-lg overflow-hidden my-12">
      <Link
        to={`/product/${_id}`}
        className="relative h-44 flex items-center justify-center p-6 border-b"
      >
        <img src={img} alt="Product" className="w-56 h-22 object-contain" />
      </Link>
      <div className="p-6">
        <span className="text-xs font-semibold text-gray-400 uppercase">
          {category}
        </span>
        <Link
          to={`/product/${_id}`}
          className="block text-lg font-bold text-gray-700 hover:text-yellow-500 mt-2"
        >
          {name}
        </Link>
        <p className="text-sm text-gray-600 mt-4">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div>
            <span className="text-sm line-through text-gray-500">
              ₹{price + 100}
            </span>
            <span className="text-lg font-bold text-orange-500 ml-2">
              ₹{price}
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="bg-gray-900 py-2 px-4 text-white rounded-md hover:bg-gray-700 transition"
          >
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
