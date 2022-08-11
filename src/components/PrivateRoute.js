import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
   const [auth,setAuth]=useState(localStorage.getItem("token-auth"));

  return (auth ? children : <Navigate to="/signin"/>);
}
