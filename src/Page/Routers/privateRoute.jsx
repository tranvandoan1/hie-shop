import React from 'react';
import { Navigate } from 'react-router-dom';
import LZString from 'lz-string'

const PrivateRoute = ({ children }) => {
  localStorage.removeItem('order')

  if (localStorage.getItem('data') == null || localStorage.getItem('data') == undefined) {


    return <Navigate to='/login' replace />
  }
  return children
}

export default PrivateRoute;
