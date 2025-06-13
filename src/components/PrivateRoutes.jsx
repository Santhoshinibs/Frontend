import React from 'react';
import { Navigate } from 'react-router-dom';


function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  // If no user found in localStorage, redirect to login
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the children components (protected page)
  return children;
}

export default PrivateRoute;
