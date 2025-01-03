import React, { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import apiClient from "../api/apiClient";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAdminLogin, setIsAdminLogin] = useState(() => {
    return sessionStorage.getItem("isAdminLogin") === "true";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          withCredentials: true,
        });
        if (response.data.success) {
          setProducts(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.response?.data?.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadOrder = async () => {
    try {
      const response = await apiClient.get(`/api/users/orders/${user.id}`);
      setOrders(response.data.order);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadOrder();
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const values = {
    products,
    setProducts,
    orders,
    setOrders,
    isAdminLogin,
    setIsAdminLogin,
    loadOrder,
  };

  return (
    <AppContext.Provider value={{ ...values }}>{children}</AppContext.Provider>
  );
};
