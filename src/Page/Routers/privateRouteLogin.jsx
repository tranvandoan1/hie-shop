import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getDataUserLoca } from '../../app/getDataLoca';

const PrivateRouteLogin = ({ children }) => {
  console.log(getDataUserLoca(),'ưqsx')
  localStorage.removeItem('order')
  if (localStorage.getItem('data') == null) {
    return <Navigate to='/login' replace />
  }
  return <Navigate to='/home' replace />
}

export default PrivateRouteLogin;
