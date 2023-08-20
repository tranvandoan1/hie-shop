import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userLoca = JSON.parse(localStorage.getItem('user'))
  console.log(userLoca,'userLoca')
  if (userLoca==undefined) {
    return <Navigate to='/login' replace />
  }
  return children
}

export default PrivateRoute;
