import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRouteLogin = ({ children }) => {
  localStorage.removeItem('order')
  if (localStorage.getItem('data') == null) {
    return <Navigate to='/login' replace />
  }
  return <Navigate to='/home' replace />
}

export default PrivateRouteLogin;
