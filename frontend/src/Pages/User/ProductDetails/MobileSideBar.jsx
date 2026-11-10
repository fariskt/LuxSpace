import React from "react";
import { IoMdClose } from "react-icons/io";

const MobileSideBar = ({ filters, handleFilterChange, setShowMobileSideBar }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="relative bg-white w-full h-full p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => setShowMobileSideBar(false)}
          className="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 text-black font-bold rounded-full text-2xl p-2"
          aria-label="Close Sidebar"
        >
          <IoMdClose />
        </button>

        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-semibold text-black">Filters</h2>

          {/* Filters */}
          <div>
            <h3 className="font-medium text-lg mb-2 text-gray-800">Category</h3>
            <div className="relative">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="block w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {["all", "bed", "sofa", "light", "table"].map((item) => (
                  <option key={item} value={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2 text-gray-800">Price Range</h3>
            <div className="relative">
              <select
                value={filters.price}
                onChange={(e) => handleFilterChange("price", e.target.value)}
                className="block w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Choose range</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2 text-gray-800">Color</h3>
            <div className="relative">
              <select
                value={filters.color}
                onChange={(e) => handleFilterChange("color", e.target.value)}
                className="block w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
