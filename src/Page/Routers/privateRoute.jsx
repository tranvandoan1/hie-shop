import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  localStorage.removeItem('order')
  
  if (localStorage.getItem('data') == null) {

    return <Navigate to='/login' replace />
  }
  return children
}

export default PrivateRoute;
