import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Client/Home/Home";
import DetailIndex from "../Client/Detail/DetailIndex";
import "@brainhubeu/react-carousel/lib/style.css";
import "../../components/css/responsive.css";

import "../../components/css/cssAntd.css";
import Login from "../Client/Login/Login";
import SignUpScreen from "../Client/Login/SignUpScreen";
import Admin from "../Admin/Admin";
import Dashboard from "../Admin/Dashboard/Dashboard";
import Products from "../Admin/Product/Products";
import Categories from "../Admin/Categories/Categories";
import Cart from "../Client/Cart/Cart";
import Setting from "../Admin/Setting/Setting";
import AddProduct from "../Admin/Product/addProduct/AddProduct";
// @ts-ignore
import PrivateRoute from "./privateRoute";
// @ts-ignore
import PrivateRouteLogin from "./privateRouteLogin";
import ForgotPassword from "../Client/Login/ForgotPassword";
import UploadProduct from "../Admin/Product/uploadProduct/UploadProduct";
import Info from "../Admin/Info/Info";
import Order from "../Admin/Order/Order.";
import CheckOut from "../Client/PayMent/CheckOut";
// @ts-ignore
import PrivateOrder from "./privateOrder";
import Manage from "../Client/Manage/Manage";
import InfoUser from "../Client/Manage/InfoUser";
import UploadPassword from "../Client/Manage/UploadPassword";
import ManageCart from "../Client/Manage/ManageCart";
import DetailCart from "../Client/Manage/DetailCart";
import ProductsPage from "../Client/Products/ProductsPage";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouteLogin>
              <Login />
            </PrivateRouteLogin>
          }
        />
        <Route
          path="/forgot-password"
          element={
            // <PrivateRouteLogin>
            <ForgotPassword />
            // </PrivateRouteLogin>
          }
        />
        <Route
          path="/Home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={
            // <PrivateRoute>
            <SignUpScreen />
            // </PrivateRoute>
          }
        />
        <Route
          path="/detail/:name/:id"
          element={
            <PrivateRoute>
              <DetailIndex />
            </PrivateRoute>
          }
        />
        <Route path="cart" element={<Cart />} />
        <Route
          path="check-out"
          element={
            <PrivateOrder>
              <CheckOut />
            </PrivateOrder>
          }
        />
        <Route path="products" element={<ProductsPage />} />
        <Route path="manage" element={<Manage />}>
          <Route path="info-user" element={<InfoUser />} />
          <Route path="upload-password" element={<UploadPassword />} />
          <Route path="cart" element={<ManageCart />} />
          <Route path="cart/:id" element={<DetailCart />} />
        </Route>

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:name/:id" element={<UploadProduct />} />
          <Route path="order" element={<Order />} />
          <Route path="setting" element={<Setting />} />
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
