import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductForm = ({
  isOpen,
  setIsOpen,
  selectedProduct,
  addProduct,
  updateProduct,
}) => {
  
  const [formData, setFormData] = useState({
    id: String(Date.now()),
    name: "",
    price: "",
    category: "",
    color: "",
    img: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    } else {
      setFormData({
        id: String(Date.now()),
        name: "",
        price: "",
        category: "",
        color: "",
        img: "",
      });
    }
  }, [selectedProduct]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProduct) {
      await axios.put(
        `http://localhost:3000/products/${selectedProduct.id}`,
        formData
      );
      updateProduct(formData);
    } else {
      addProduct(formData);
      await axios.post("http://localhost:3000/products", formData);
      Swal.fire({
        text: "Product added successful",
        icon: "success",
      });
      setFormData({
        id: String(Date.now()),
        name: "",
        price: "",
        category: "",
        color: "",
        img: "",
      });
      fetchProducts();
    }
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              {selectedProduct ? "Edit Product" : "Add Product"}
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Product Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="Price"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value="bed">Bed</option>
                <option value="table">Table</option>
                <option value="sofa">Sofa</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Color
              </label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                placeholder="Color"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={formData.img}
                onChange={(e) =>
                  setFormData({ ...formData, img: e.target.value })
                }
                placeholder="Image URL"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
              >
                {selectedProduct ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ProductForm;
