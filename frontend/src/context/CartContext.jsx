import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "./AuthContext";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(1);

  const loadCart = async () => {
    try {
      const response = await apiClient.get(`/api/users/cart/${user.id}`);    
      console.log(response.data);
        
      if (response.data.cart) {
        setCart(response.data.cart);
      } else {
        setCart(null);
      }
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  useEffect(() => {
    if (user?.id) loadCart();
  }, [token]);


  const addToCart = async (product) => {
    try {
      const response = await apiClient.post(`/api/cart/${user.id}`, {
        productId: product._id,
        quantity: cartQuantity,
      });

      if (response.data.message) {
        Swal.fire({
          text: response.data.message,
          icon: "warning",
        });
      } else {
        loadCart();
        toast.success("Item added to cart");
      }
    } catch (error) {
      console.error("Error syncing cart", error);
      Swal.fire({
        text: "Unable to sync cart. Please try again later.",
        icon: "error",
      });
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await apiClient.put(`/api/cart/${cart._id}`, { productId });
      loadCart();
    } catch (error) {
      console.error("Error removing product from cart", error);
    }
  };

  const values = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    cartQuantity,
    setCartQuantity,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
