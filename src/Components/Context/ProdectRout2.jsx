import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProdectRout2({ children }) {
    if (!localStorage.getItem("userToken")) { 
        return children; 
    } else {
        return <Navigate to={"/assistant"} />;
    }
}
