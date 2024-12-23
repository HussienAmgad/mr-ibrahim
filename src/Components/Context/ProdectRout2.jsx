import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // تأكد من أن المكتبة تستخدم export named

export default function ProdectRout2({ children }) {
    const token = localStorage.getItem("userToken");

    if (!localStorage.getItem("userToken")) { 
        return children; 
    } else {
        const token = localStorage.getItem("userToken");
      if (token) {
        try {
          // فك التوكن
          const decodedToken = jwtDecode(token);
          if (decodedToken.statues === "user") {
            return <Navigate to={"/student"} />;
        } else if (decodedToken.statues === "assist") {
            return <Navigate to={"/assistant"} />;
        } else if (decodedToken.statues === "admin") {
            return <Navigate to={"/admin"} />;

        }
          
        } catch (error) {
          console.error("Error decoding token:", error.message);
        }
      }
    }
}
