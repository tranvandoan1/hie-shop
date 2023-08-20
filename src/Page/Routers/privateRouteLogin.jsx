import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRouteLogin = ({ children }) => {
  const navigate=useNavigate()
  console.log('dưkscod')
  const userLoca = JSON.parse(localStorage.getItem('user'))
  if (userLoca==undefined) {
    return <Navigate to='/login' replace />
  }
  return <Navigate to='/home' replace />
}

export default PrivateRouteLogin;
