import { HddOutlined, FileTextOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import List from "./ListStatistical/List";
import styles from "./CssAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Spin } from "antd";
// @ts-ignore

import { getOrder } from "../../../features/Order";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaProductHunt, FaOpencart } from "react-icons/fa";
// @ts-ignore
import { getProductAll } from "../../../features/Products";
// @ts-ignore
import { getCategoriAll } from "../../../features/CateSlice";
const ListStatistical = ({on}) => {
  const dispatch = useDispatch();
  const orders = useSelector((data) => data.orders.value);
  const products = useSelector((data) => data.products);
  const productsValue = products?.value;
  const categories = useSelector((data) => data.categories);
  console.log(orders, 'orders')
  useEffect(() => {
    dispatch(getOrder());
    dispatch(getProductAll());
    dispatch(getCategoriAll());
  }, []);
  const listOrder = () => {
    if (orders !== undefined) {
      let orders = [];
      orders.filter((item) => {
        const time = new Date(item.createdAt);
        if (
          `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}` ==
          `${moment().date()}-${moment().month() + 1}-${moment().year()}`
        ) {
          orders.push(item);
        }
      });
      return orders.length;
    }
  };
  return (
    <div style={{ background: "#fff", flex: 1 }}>
      <React.Fragment>
        <div className={styles.title}>
          <h6 style={{ display: "flex", alignItems: "center" }}>
            <HddOutlined
              style={{
                fontSize: 20,
                color: "chocolate",
                marginRight: 10,
              }}
            />{" "}
            Thống kê
          </h6>
        </div>
        <hr style={{ background: "rgb(161, 161, 161)", height: 0.5 }} />

        <div className="list">
          <Row>
            <Col xs={12} sm={4} md={12} lg={8} xl={6}>
              <Link to="/admin/categories" onClick={() => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["2"]));
              }}>
                <div
                  className={styles.list_cate}
                  style={{ fontSize: 15, height: 50 }}
                >
                  <FileTextOutlined
                    style={{
                      marginRight: 10,
                      fontSize: 30,
                      color: "chocolate",
                    }}
                  />{" "}
                  Danh mục :{" "}
                  {categories?.value !== undefined ? (
                    categories?.value.length
                  ) : (
                    <Spin style={{ marginLeft: 10 }} />
                  )}
                </div>
              </Link>
            </Col>
            <Col xs={12} sm={4} md={12} lg={8} xl={6}>
              <Link to="/admin/products" onClick={() => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["3"]));
              }}>
                <div
                  className={styles.list_cate}
                  style={{ fontSize: 15, height: 50 }}
                >
                  <FaProductHunt
                    style={{
                      color: "chocolate",
                      fontSize: 30,
                      marginRight: 10,
                    }}
                  />
                  Sản phẩm :{" "}
                  {productsValue !== undefined ? (
                    productsValue.length
                  ) : (
                    <Spin style={{ marginLeft: 10 }} />
                  )}
                </div>
              </Link>
            </Col>
            <Col xs={12} sm={4} md={12} lg={8} xl={6}>
              <Link to="/admin/order" onClick={() => {
                localStorage.removeItem("key");
                localStorage.setItem("key", JSON.stringify(["4"]));
              }}>
                <div
                  className={styles.list_cate}
                  style={{ fontSize: 15, height: 50 }}
                >
                  <FaOpencart
                    style={{
                      color: "chocolate",
                      fontSize: 30,
                      marginRight: 10,
                    }}
                  />
                  Đơn hôm nay :{" "}
                  {listOrder() !== undefined ? (
                    listOrder()
                  ) : (
                    <Spin style={{ marginLeft: 10 }} />
                  )}
                </div>
              </Link>
            </Col>

          </Row>
        </div>
        <br />
        <List />
      </React.Fragment>
    </div>
  );
};

export default ListStatistical;
