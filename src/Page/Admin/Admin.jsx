import React, { useEffect, useState } from "react";
import {
  InfoCircleOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RollbackOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./css/admin.css";
import { FaProductHunt } from "react-icons/fa";
import Comfim from "../../components/Comfim";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { getAllUsers, uploadUser } from '../../features/UserSlice'
// @ts-ignore
import { getDataUserLoca } from '../../app/getDataLoca';
const { Header, Sider, Content } = Layout;

const Admin = () => {
  const navigator = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const [logoutComfim, setLogouComfim] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // @ts-ignore
  const key = JSON.parse(localStorage.getItem("key"));
  // @ts-ignore
  const dispatch = useDispatch()
  // @ts-ignore

  const users = useSelector((data) => data.users.value)
  console.log(users, 'users12312123')
  const user = users?.data?.find((item) => item._id == getDataUserLoca()._id)
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  const logout = () => {

    localStorage.removeItem('data')
    localStorage.removeItem('key')
    localStorage.removeItem("value");
    navigator('/login')
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#FFF",
          }}
        >
          <div
            className={"admin-logo"}
            style={{
              width: "100%",
            }}
          >
            <img
              src={user?.logo}
              alt=""
            />
          </div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={
            key == null ? 1 : key
          }
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dashboard",
              itemIcon: <NavLink to="dashboard" />,
              style: { color: "black" },
              onClick: () => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["1"]));
              },
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Danh mục",
              itemIcon: <NavLink to="categories" />,
              style: { color: "black" },
              onClick: () => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["2"]));
              },
            },
            {
              key: "3",
              icon: <FaProductHunt />,
              label: "Sản phẩm",
              itemIcon: <NavLink to="products" />,
              style: { color: "black" },
              onClick: () => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["3"]));
              },
            },
            {
              key: "4",
              icon: <ShoppingCartOutlined />,
              label: "Đơn hàng",
              itemIcon: <NavLink to="order" />,
              style: { color: "black" },
              onClick: () => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["4"]));
              },
            },
            {
              key: "5",
              icon: <SettingOutlined />,
              label: "Cài đặt",
              itemIcon: <NavLink to="setting" />,
              style: { color: "black" },
              onClick: () => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["5"]));
              },
            },
            {
              key: "6",
              icon: <InfoCircleOutlined />,
              label: "Thông tin",
              itemIcon: <NavLink to="info" />,
              style: { color: "black" },
              onClick: () => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["6"]));
              },
            },
            {
              key: "7",
              icon: <RollbackOutlined />,
              label: "Quay lại",
              itemIcon: <NavLink to="/home" />,
              style: { color: "black" },
              onClick: () => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["7"]));
              },
            },
            {
              key: "7",
              icon: <LoginOutlined />,
              label: "Đăng xuất",
              itemIcon: null,
              style: { color: "black" },
              onClick: () => {
                setLogouComfim(true)

              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              // background: "#4096ff",
              // color: "#fff",
            }}
          />
          <div style={{ paddingRight: 30, display: 'flex', alignItems: 'center' }}>
            <Avatar size={34} src={user?.avatar}
            />
            <span
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "red",
                marginLeft: 10,
              }}
            >
              {user?.name}
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: "14px 0  0 14px",
            padding: 24,
            height: 280,
            background: colorBgContainer,
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <Comfim
        title="Đăng xuất"
        conent="Bạn có muốn đăng xuất không ?"
        okText="Đăng xuất"
        cancelText="Không"
        btnComfim={() => logout()}
        btnReject={() => setLogouComfim(false)}
        isModalOpen={logoutComfim}
      />
    </Layout>
  );
};

export default Admin;
