import React from "react";
import { Navigate } from "react-router-dom";

export default function ProdectRout({ children }) {
  const userToken = localStorage.getItem("userToken");

  return userToken ? children : <Navigate to="/" />; 
}
