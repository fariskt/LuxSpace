import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/User/Home/Home";
import Categories from "./Pages/User/Categories/Categories";
import Cart from "./Components/User/Cart/Cart";
import { AppProvider } from "./context/AppContext";
import { CartProvider } from "./context/CartContext";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import ProductDetails from "./Pages/User/ProductDetails/ProductDetails";
import Payment from "./Pages/User/PaymentPage/Payment";
import Layout from "./Components/User/Layouts/Layout";
import AdminLayout from "./Components/Admin/AdminLayout/AdminLayout";
import Product from "./Pages/User/ProductDetails/Product";
import Orders from "./Pages/User/Orders/Orders";
import ProtectedAdmin from "./Components/Admin/ProtectedAdmin";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/products" element={<Product />} />
                  <Route path="/products/:category" element={<Product />} />
                  <Route
                    path="/product/:productId"
                    element={<ProductDetails />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/payment/:id" element={<Payment />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdmin>
                      <AdminLayout />
                    </ProtectedAdmin>
                  }
                />
              </Routes>
            </CartProvider>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
