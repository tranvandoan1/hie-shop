import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Client/Home/Home'
import DetailIndex from '../Client/Detail/DetailIndex'
import "@brainhubeu/react-carousel/lib/style.css";
import '../../components/css/responsive.css'

import '../../components/css/cssAntd.css'
import Login from '../Client/Login/Login';
import SignUpScreen from '../Client/Login/SignUpScreen';
import Admin from '../Admin/Admin';
import Dashboard from '../Admin/Dashboard/Dashboard';
import Products from '../Admin/Product/Products';
import Categories from '../Admin/Categories/Categories';
import Cart from '../Admin/Cart/Cart';
import Setting from '../Admin/Setting/Setting';
import AddProduct from '../Admin/Product/addProduct/AddProduct';
import PrivateRoute from './privateRoute';
import PrivateRouteLogin from './privateRouteLogin';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PrivateRouteLogin>
            <Login />
          </PrivateRouteLogin>
        } />
        <Route path="/Home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>

        } />
        <Route path="/login" element={
          <Login />
        } />
        <Route path="/signup" element={
          // <PrivateRoute>
            <SignUpScreen />
          // </PrivateRoute>
        } />
        <Route path="/detail" element={

          <PrivateRoute>
            <DetailIndex />
          </PrivateRoute>} />
        <Route path="/admin" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="setting" element={<Setting />} />

        </Route>

      </Routes>
    </BrowserRouter>

  )
}

export default Router