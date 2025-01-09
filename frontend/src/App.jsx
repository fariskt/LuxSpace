import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/User/Home/Home";
import Categories from "./Pages/User/Categories/Categories";
import Cart from "./Components/User/Cart/Cart";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import ProductDetails from "./Pages/User/ProductDetails/ProductDetails";
import Layout from "./Components/User/Layouts/Layout";
import AdminLayout from "./Components/Admin/AdminLayout/AdminLayout";
import Product from "./Pages/User/ProductDetails/Product";
import Orders from "./Pages/User/Orders/Orders";
import ProtectedAdmin from "./Components/Admin/ProtectedAdmin";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/User/Cart/Payment";
import Wishlist from "./Components/User/WishList/Wishlist";

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster reverseOrder={false} position="top-right"/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:category" element={<Product />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
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
      </BrowserRouter>
    </>
  );
}

export default App;
