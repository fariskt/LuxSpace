import React, { useState } from "react";
import { searchProducts } from "../../../slices/productSlice";
import { useDispatch } from "react-redux";

const ProductSideBar = ({ filters, handleFilterChange }) => {
  const [searchValue, setSearchVale] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSearchVale(e.target.value);
  };

  const handleSearch = () => {
    const categoryValue = filters.category === "all" ? "" : filters.category;
    dispatch(
      searchProducts({
        name: searchValue,
        page: 1,
        limit: 10,
        category: categoryValue,
      })
    );
  };
  return (
    <div className="mt-14 ml-10 w-72 bg-white text-black p-6 shadow-lg rounded-lg max-h-screen">
      <div className="flex mb-5">
        <input
          type="text"
          placeholder="Search products"
          value={searchValue}
          onChange={handleInputChange}
          className="w-44 p-2  border border-gray-400"
        />
        <button
          className="bg-black text-white p-1 text-xs"
          onClick={handleSearch}
        >
          SEARCH
        </button>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-black">Category</h3>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-full p-2 bg-white text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
        >
          {["all", "bed", "sofa", "light", "table"].map((item) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-black">Price Range</h3>
        <select
          value={filters.price}
          onChange={(e) => handleFilterChange("price", e.target.value)}
          className="w-full p-2 bg-white text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
        >
          <option value="">Choose range</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-black">Color</h3>
        <select
          value={filters.color}
          onChange={(e) => handleFilterChange("color", e.target.value)}
          className="w-full p-2 bg-white text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
        >
          <option value="">Choose color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="brown">Brown</option>
          <option value="gray">Gray</option>
        </select>
      </div>
    </div>
  );
};

export default ProductSideBar;
