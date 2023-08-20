import styles from "../css/Home/home.module.css";
// @ts-ignore
import React, { useEffect, useMemo, useState } from "react";
import { Input, Badge, Drawer, Popover } from "antd";
import {
    ShoppingCartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LoginOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { Size } from "./../assets/size";
import { FaUsersCog } from 'react-icons/fa'
const { Search } = Input;
const Header: React.FC = () => {
    const navigator = useNavigate();
    const sizeWindonw = Size();
    const [statusMenu, setStatusMenu] = useState(false);
    const onSearch = (value: any) => console.log(value);
    const userLoca = JSON.parse(localStorage.getItem("user"));
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("key");
        navigator("/login");
    };
    const content = (
        <div>
            <div
                onClick={() => logout()}
                style={{
                    cursor: "pointer",
                    fontSize: 16,
                    padding: "0 10px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <LoginOutlined />
                <span style={{ marginLeft: 10 }}>Đăng xuất</span>
            </div>
            <div
                onClick={() => navigator("/admin")}
                style={{ cursor: "pointer", fontSize: 16, padding: "10px 10px 0 10px" }}
            >
                <span style={{fontSize:18 ,marginRight:10}}>

                <FaUsersCog />
                </span>
                <span>Quản lý</span>
            </div>
        </div>
    );

    const renderUserCart = () => (
        <div className={styles.iconleft}>
            <Badge count={5}>
                <ShoppingCartOutlined className={styles.icon} />
            </Badge>
            {userLoca == undefined ? (
                <span
                    className={styles["btn-login"]}
                    onClick={() => navigator("/login")}
                >
                    Đăng nhập
                </span>
            ) : (
                <Popover content={content}>
                    <span className={styles["btn-login"]}>{userLoca.name}</span>
                </Popover>
            )}
        </div>
    );

    return (
        <div className={styles.header}>
            <div className="header-content" id="navbar">
                <div className={"logo"} onClick={() => navigator("/")}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/hieshop-df804.appspot.com/o/images%2Flogo.png?alt=media&token=9836e096-bfcf-46dd-b8a2-c5616bfa21ed"
                        alt=""
                    />
                </div>
                <div className="header-input">
                    <Search placeholder="Tìm kiếm..." onSearch={onSearch} />
                </div>

                {sizeWindonw?.width <= 480 ? (
                    statusMenu == false ? (
                        <MenuUnfoldOutlined
                            style={{ fontSize: 25, cursor: "pointer" }}
                            onClick={() => setStatusMenu(!statusMenu)}
                        />
                    ) : (
                        <MenuFoldOutlined
                            style={{ fontSize: 25, cursor: "pointer" }}
                            onClick={() => setStatusMenu(!statusMenu)}
                        />
                    )
                ) : (
                    renderUserCart()
                )}
            </div>
            <Drawer
                title="Basic Drawer"
                placement="right"
                onClose={() => setStatusMenu(!statusMenu)}
                open={statusMenu}
            >
                {renderUserCart()}
            </Drawer>
        </div>
    );
};

export default Header;
