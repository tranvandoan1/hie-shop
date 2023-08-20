import React, { useState } from "react";
import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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
const { Header, Sider, Content } = Layout;

const Admin: React.FC = () => {
  const navigator = useNavigate()
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [logoutComfim, setLogouComfim] = useState<boolean>(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // @ts-ignore
  const key = JSON.parse(localStorage.getItem("key"));
  const userLoca = JSON.parse(localStorage.getItem('user'))
  const logout = () => {
    
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('key')
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
              src="https://firebasestorage.googleapis.com/v0/b/hieshop-df804.appspot.com/o/images%2Flogo.png?alt=media&token=9836e096-bfcf-46dd-b8a2-c5616bfa21ed"
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
              itemIcon: <NavLink to="cart" />,
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
              icon: <SettingOutlined />,
              label: "Quay lại",
              itemIcon: <NavLink to="/home" />,
              style: { color: "black" },
              onClick: () => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["5"]));
              },
            },
            {
              key: "7",
              icon: <LoginOutlined />,
              label: "Đăng xuất",
              itemIcon:null,
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
          <div style={{ paddingRight: 30 }}>
            <Avatar size={34} src={userLoca.avatar}
            />
            <span
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "red",
                marginLeft: 10,
              }}
            >
              {userLoca.name}
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: "14px 0  0 14px",
            padding: 24,
            height: 280,
            background: colorBgContainer,
            overflow:'auto'
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
        btnComfim={()=>logout()}
        btnReject={()=>setLogouComfim(false)}
        isModalOpen={logoutComfim}
      />
    </Layout>
  );
};

export default Admin;
