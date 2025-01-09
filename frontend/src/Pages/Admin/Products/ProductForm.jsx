import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  addProduct,
  fetchProducts,
  updateProduct,
} from "../../../features/productSlice";

const ProductForm = ({ isOpen, setIsOpen, selectedProduct }) => {
  const { loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    color: "",
    description: "",
    img: "",
    stock: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      console.log(selectedProduct);
      
      setFormData(selectedProduct);
    } else {
      resetForm();
    }
  }, [selectedProduct]);

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      color: "",
      img: "",
      stock: "",
      description: "",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", updatedFormData.name);
      formDataToSend.append("price", updatedFormData.price);
      formDataToSend.append("category", updatedFormData.category);
      formDataToSend.append("color", updatedFormData.color);
      formDataToSend.append("description", updatedFormData.description);
      formDataToSend.append("stock", updatedFormData.stock);
      formDataToSend.append("img", updatedFormData.img);

      if (selectedProduct) {
        await dispatch(
          updateProduct({
            productId: selectedProduct._id,
            product: formDataToSend,
          })
        ).unwrap();
        Swal.fire({ text: "Product Updated successfully", icon: "success" });
      } else {
        await dispatch(addProduct(formDataToSend)).unwrap();
        Swal.fire({ text: "Product added successfully", icon: "success" });
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      Swal.fire({ text: error.message || "Submission failed", icon: "error" });
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              {selectedProduct ? "Edit Product" : "Add Product"}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
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
              <div>
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
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
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
              <div>
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
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Enter Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="Enter stock"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Enter Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter product description"
                rows="5"
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
                {loading ? "loading..." : selectedProduct ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ProductForm;
