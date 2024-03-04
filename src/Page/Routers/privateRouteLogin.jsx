import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouteLogin = ({ children }) => {
  localStorage.removeItem('order')
  if (localStorage.getItem('data') == null) {
    return children
  }
  return <Navigate to='/home' replace />
}

export default PrivateRouteLogin;
