import { message } from 'antd';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateOrder = ({ children }) => {
  const dataLoace = localStorage.getItem('order')
  if (dataLoace == undefined||dataLoace == null) {
    message.warning('Chưa chọn sản phẩm !')
    return <Navigate to='/cart' replace />
  }
  return children
}

export default PrivateOrder;
