import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";
import SideBar from "../Sidebar/SideBar";
import DashBoard from "../../../Pages/Admin/DashBoard";
import AdminProducts from "../../../Pages/Admin/Products/AdminProducts";
import Users from "../../../Pages/Admin/UsersList/Users";
import OrderDetails from "../../../Pages/Admin/OrderPage/OrderDetails";

const AdminLayout = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(()=> {
    return sessionStorage.getItem("activeAdminPage") || ""
  });
  const hideNavbar = location.pathname === "/admin/login";

  const Components = {
    dashboard: <DashBoard />,
    products: <AdminProducts />,
    users: <Users />,
    orders: <OrderDetails />
  };
  


  return (
    <div className="flex w-full" style={{ backgroundColor: "#f1f5f9" }}>
      {!hideNavbar && <AdminNavbar />}
      <SideBar setActivePage={setActivePage} activePage={activePage} />
      <div className="admin-content flex-grow p-4 ml-[280px]">
        {Components[activePage] || <DashBoard />}
      </div>
    </div>
  );
};

export default AdminLayout;
