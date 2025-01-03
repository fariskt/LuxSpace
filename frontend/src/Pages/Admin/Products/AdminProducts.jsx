import React, { useContext, useState } from "react";
import {AppContext} from "../../../context/AppContext";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import ProductForm from "./ProductForm";
import axios from "axios";

const AdminProducts = () => {
  const { products, setProducts } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const [alertDelete, setAlertDelete] = useState(false);

  const handleEdit = (item) => {
    setSelectedProduct(item);
    setIsOpen(true);
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };
  const confirmDelete = (itemID) => {
    setProductId(itemID);
    setAlertDelete(true);
  };
  const handleDelete = async () => {
    if (!productId) return;
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      const filteredProduct = products.filter((item) => item.id !== productId);
      setProducts(filteredProduct);
      setAlertDelete(false)
    } catch (error) {
      console.log("error cannot delete ", error);
    }
  };

  return (
    <>
      {alertDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-[300px]">
            <p>Are you sure you want to delete this product?</p>
            <button
              onClick={() => setAlertDelete(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded mt-3 ml-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded mt-3 ml-8"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      )}

      <div className="mt-24 w-[92%] ml-16 bg-white py-8 rounded-lg">
        <div className="flex justify-between items-center mb-6 px-6">
          <h1 className="text-lg">All Product List</h1>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsOpen(true);
            }}
            className="bg-blue-600 text-white text-md px-3 py-2 rounded-lg hover:bg-blue-500"
          >
            Add product
          </button>
        </div>
        <div className="shadow-md overflow-hidden ">
          <table className="w-full table-auto p-3">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Color</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6 text-left flex items-center space-x-3">
                    <h1>{index + 1}</h1>
                    <img
                      src={item.img}
                      alt="product"
                      className="w-16 h-16 rounded bg-white border border-gray-200"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                    </div>
                  </td>
                  <td className="py-2 px-6">₹{item.price}.00</td>
                  <td className="py-2 px-6">{item.category}</td>
                  <td className="py-2 px-6">{item.color}</td>
                  <td className="py-2 px-6 text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="mx-4 text-lg bg-blue-100 rounded-lg py-2 px-4 text-blue-400 hover:bg-blue-700 hover:text-white"
                    >
                      <BiEditAlt />
                    </button>
                    <button
                      onClick={() => confirmDelete(item.id)}
                      className="text-lg bg-red-100 rounded-lg py-2 px-4 text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedProduct={selectedProduct}
        addProduct={addProduct}
        updateProduct={updateProduct}
      />
    </>
  );
};

export default AdminProducts;
