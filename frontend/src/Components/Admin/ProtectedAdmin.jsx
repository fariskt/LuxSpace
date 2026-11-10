import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
    const {isAdminAuthenticated , accessToken} = useSelector((state)=> state.auth)
  if (!isAdminAuthenticated || !accessToken) {
    return <Navigate to="/login" replace={true}/>;
  }
  return children;
};

export default ProtectedAdmin;
