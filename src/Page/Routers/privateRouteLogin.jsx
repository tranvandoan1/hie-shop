import React from 'react';
import { Navigate } from 'react-router-dom';
import LZString from 'lz-string'

const PrivateRouteLogin = ({ children }) => {
  localStorage.removeItem('order')
  // const decodedString = JSON.parse(LZString.decompressFromBase64(localStorage.getItem('data')));
  if (localStorage.getItem('data') == null || localStorage.getItem('data') == undefined) {
    return children
  }
  return <Navigate to='/home' replace />
}

export default PrivateRouteLogin;
