import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

export default function Layout() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          // فك التوكن
          const decodedToken = jwtDecode(token);
          if (decodedToken.statues === "assist") {
            setUserData(true);
          } else {
            setUserData(false);
          }
        } catch (error) {
            console.error("Error decoding token:", error.message);
        }
    } else if (!token) {
          setUserData(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {userData ? <Navbar /> : null}
      <Outlet />
    </div>
  )
}
