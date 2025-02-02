// src/components/AdminPannel/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from "../../components/AuthContext/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthContext();
  console.log("AdminRoute - user:", user);  // Debug: vezi ce date ai

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user || !user.roles || !user.roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default AdminRoute;
