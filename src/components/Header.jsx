import styles from "../css/Home/home.module.css";
import "../css/Home/home.css";
// @ts-ignore
import React, { useEffect, useMemo, useState } from "react";
import { Input, Badge, Drawer, Popover } from "antd";
import {
    ShoppingCartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LoginOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { Size } from "../assets/size";
import { FaUsersCog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { getUser } from "../features/UserSlice";
// @ts-ignore
import { getSaveOrderAll } from "../features/SaveOrderSlice.js";
import Comfim from "./Comfim.jsx";
// @ts-ignore
import { getDataUserLoca } from "../app/getDataLoca";
// @ts-ignore
const { Search } = Input;
const Header = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const sizeWindonw = Size();
    const [statusMenu, setStatusMenu] = useState(false);
    const [comfimLogOut, setComfimLogOut] = useState(false);
    // @ts-ignore
    // const onSearch = (value) => console.log(value);

    // @ts-ignore
    const user = useSelector((data) => data.users.value.data);
 
    const saveorders = useSelector((data) => data.saveorders.value);
    const newDataSaveOrder = saveorders
        ?.slice()
        .reverse()
        // @ts-ignore
        .filter((item, index) => index < 4);


    const [avtiveMenu, setActiveMenu] = useState(
        localStorage.getItem("value")
    );
    const logout = () => {
        localStorage.removeItem("data");
        localStorage.removeItem("key");
        localStorage.removeItem("value");
        navigator("/login");
    };
    useEffect(() => {
        dispatch(getUser(getDataUserLoca()?._id));
        dispatch(getSaveOrderAll());
    }, []);
    const content = (
        <div>
            <div
                onClick={() => {
                    localStorage.removeItem("key");
                    localStorage.setItem("key", JSON.stringify(["1"]));
                    navigator(
                        getDataUserLoca()?.role == 0
                            ? "/admin/dashboard"
                            : "/manage/info-user"
                    );
                }}
                style={{
                    cursor: "pointer",
                    fontSize: 16,
                    padding: `0px 10px 10px 10px`,
                }}
            >
                <span style={{ fontSize: 18, marginRight: 10 }}>
                    <FaUsersCog />
                </span>
                <span>Quản lý</span>
            </div>

            <div
                onClick={() => setComfimLogOut(true)}
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
        </div>
    );

    const renderSaveOrder = (
        <div style={{ width: 300, cursor: "pointer" }}>
            {newDataSaveOrder?.map((item) => {
                return (
                    <div className="saveorder">
                        <div
                            style={{
                                marginTop: 10,
                                padding: "10px 5px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <span className="name-pro-order">{item?.name_pro}</span>
                            <span style={{ color: "red", fontWeight: "500" }}>
                                {item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                            </span>
                        </div>
                        <div
                            style={{
                                padding: "0 5px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <span className="name-pro-order">
                                {item?.classification} ({item?.amount})
                            </span>
                            <span style={{ color: "red", fontWeight: "500" }}>
                                {item?.commodity_value}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderUserCart = () => (
        <div className={styles.iconleft}>
            <div className="icon-search-cart" onClick={() => navigator("/cart")}>
                <SearchOutlined
                    style={{ fontSize: 25, cursor: "pointer", marginRight: 10 }}
                />
                <Popover
                    content={renderSaveOrder}
                    title={
                        saveorders?.length > 0 ? "Sản phẩm đã thêm" : "Chưa có sản phẩm"
                    }
                >
                    <Badge count={saveorders?.length}>
                        <ShoppingCartOutlined className={styles.icon} />
                    </Badge>
                </Popover>
            </div>

            {user == undefined ? (
                <span
                    className={styles["btn-login"]}
                    onClick={() => navigator("/login")}
                >
                    Đăng nhập
                </span>
            ) : (
                <Popover content={content}>
                    <span className={styles["btn-login"]}>{user?.name}</span>
                </Popover>
            )}
        </div>
    );
    return (
        <div className={styles.header}>
            <div className="header-content" id="navbar">
                <div className={"logo"} onClick={() => navigator("/")}>
                    {user?.avatar == undefined ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                height: "100%",
                                alignItems: "center",
                                width: "100%",
                                color: "red",
                                fontWeight: "600",
                            }}
                        >
                            Chưa có logo
                        </div>
                    ) : (
                        <img src={ user?.avatar} alt="" />
                    )}
                </div>
                {/* <div className="header-input">
                    <Search placeholder="Tìm kiếm..." onSearch={onSearch} />
                </div> */}
                <div className="header-menu">
                    <span
                        onClick={() => {
                            navigator("/home");
                            setActiveMenu("home");
                            localStorage.setItem('value', 'home')
                        }}
                        style={{
                            borderBottom:
                                avtiveMenu == "home" ? "3px solid #e74c3c" : "0",
                        }}
                    >
                        Home
                    </span>
                    <span
                        style={{
                            borderBottom:
                                avtiveMenu == "products" ? "3px solid #e74c3c" : "0",
                        }}
                        onClick={() => {
                            navigator("/products");
                            setActiveMenu("products");
                            localStorage.setItem('value', 'products')
                        }}
                    >
                        Sản phẩm
                    </span>
                    <span
                        style={{
                            borderBottom:
                                avtiveMenu == "contact" ? "3px solid #e74c3c" : "0",
                        }}
                        onClick={() => {
                            navigator("/contact");
                            setActiveMenu("contact");
                            localStorage.setItem('value', 'contact')
                        }}
                    >
                        Liên hệ
                    </span>
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
            <Comfim
                title="Đăng xuất"
                conent="Bạn có muốn đăng xuất không ?"
                okText="Đăng xuất"
                cancelText="Không"
                btnComfim={() => logout()}
                btnReject={() => setComfimLogOut(false)}
                isModalOpen={comfimLogOut}
            />
        </div>
    );
};

export default Header;
