import React, { useContext } from "react";
import {AppContext} from "../../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const { isAdminLogin } = useContext(AppContext);
    
  if (!isAdminLogin) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedAdmin;
