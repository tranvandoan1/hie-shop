import React, { useEffect, useState } from "react";
import { Button, Descriptions, Space, Table } from "antd";

import "./product.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { getProductAll, removeProduct } from "../../../features/Products";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
// @ts-ignore
import { getCategoriAll } from "../../../features/CateSlice";
// @ts-ignore
import { getAllClassifies } from "../../../features/Classifies";
// @ts-ignore
import Loading from "../../../components/Loading";
// @ts-ignore
import { messaging } from "../../../firebase/index";
import Comfim from "../../../components/Comfim";
import ShowValue from "./ShowValue";



const Products = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const products = useSelector((data) => data.products);
  const productsValue = products?.value;

  const categories = useSelector((data) => data.categories);
  const classifies = useSelector((data) => data.classifies);
  // @ts-ignore

  const [dataDeletePro, setDataDeletePro] = useState();
  const [showValue, setShowValue] = useState({
    status: false,
    data: undefined,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [comfimDelete, setComfimDelete] = useState({
    status: false,
    data: undefined,
  });
  const categoriesValue = categories?.value;
  const dataProducts = productsValue?.map((item) => {
    return { ...item, key: item?._id };
  });

  useEffect(() => {
    dispatch(getProductAll());
    dispatch(getCategoriAll());
    dispatch(getAllClassifies());
  }, []);
  const [textPro, setTextPro] = useState({ status: false, id: null });

  const dataDeleteProduct = async (data) => {
    setLoading(true)
    const dataClass = classifies?.value?.filter(
      (item) => item.linked == data.linked
    );
    await dispatch(removeProduct({ product: data, classify: dataClass }));
    setLoading(false)
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Danh mục",
      dataIndex: "cate_id",
      // @ts-ignore
      render: (cate_id) => (
        <div>
          {categoriesValue?.map((item) => {
            if (item._id == cate_id) {
              return (
                <span style={{ color: "red", fontWeight: "600" }}>
                  {item.name}
                </span>
              );
            }
          })}
        </div>
      ),
    },
    {
      title: "Ảnh",
      key: "photo",
      dataIndex: "photo",
      render: (photo) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div className={"categori-logo"}>
            <img src={photo} alt="" />
          </div>
        </div>
      ),
    },
    {
      title: "Giảm giá",
      dataIndex: "sale",
    },
    {
      title: "Tên phân loại",
      dataIndex: "_id",
      key: "_id",
      render: (_id, data) => (
        <div>
          {classifies?.value?.map((item) => {
            if (data.linked == item.linked) {
              return (
                <div className="pro-flex">
                  <span
                    style={{ color: "red", fontWeight: "600", marginLeft: 10 }}
                  >
                    {item.name},
                  </span>

                </div>
              );
            }
          })}
        </div>
      ),
    },
    {
      title: "Giá trị phân loại",
      key: "_id",
      render: (_id, data) => (
        <div
          onClick={() => setShowValue({ status: true, data: data })}
          style={{ cursor: "pointer" }}
        >

          <EyeOutlined />

        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "_id",
      render: (_id, data) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <Space
              size="middle"
              style={{ marginRight: 10 }}
              onClick={() =>
                navigator(`/admin/products/edit/${data.name}/${data._id}`)
              }
            >
              <EditOutlined />
            </Space>
          </div>
          <div style={{ cursor: "pointer" }}>
            <Space
              size="middle"
              onClick={() => setComfimDelete({ status: true, data: _id })}
            >
              <DeleteOutlined />
            </Space>
          </div>
        </div>
      ),
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setTextPro({ status: false, id: null });
      setDataDeletePro(selectedRowKeys);
    },
  };
  const handleExpand = (expanded) => {
    if (expanded) {
      setTextPro({ status: false, id: null });
    } else {
      setTextPro({ status: false, id: null });
    }
  };
  return (
    <div style={{ overflow: "auto" }}>
      {loading == true && <Loading />}
      <div className="admin-product">
        <h4>Sản phẩm ({productsValue?.length})</h4>
        <Button onClick={() => navigator("add")}>Thêm sản phẩm </Button>
      </div>
      <hr />

      <div className="admin-product-table">
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          expandable={{
            expandedRowRender: (record) => {
              return (
                // @ts-ignore
                <div key={record} className={"table-product"}>
                  <Descriptions>
                    {categoriesValue?.map((item) => {
                      if (item._id == record.cate_id) {
                        return (
                          <Descriptions.Item
                            label={
                              <span style={{ fontSize: 15 }}>Danh mục</span>
                            }
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 14,
                              }}
                            >
                              {item.name}
                            </p>
                          </Descriptions.Item>
                        );
                      }
                    })}

                    {record?.view && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Lượt xem</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.view}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.name_classification && (
                      <Descriptions.Item
                        label={
                          <span style={{ fontSize: 15 }}>Tên phân loại</span>
                        }
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.name_classification}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.name_commodityvalue && (
                      <Descriptions.Item
                        label={
                          <span style={{ fontSize: 15 }}>
                            {<span style={{ fontSize: 15 }}>Lượt xem</span>}
                          </span>
                        }
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.name_commodityvalue}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.linked && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Kho hàng</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.warehouse}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.origin && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Nguồn gốc</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.origin}
                        </p>
                      </Descriptions.Item>
                    )}

                    {record?.sent_from && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Gửi từ</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.sent_from}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.trademark && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Nhãn hiệu</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.trademark}
                        </p>
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                  <div className={"pro-detail"}>
                    <p style={{ fontSize: 15 }}>Chi tiết sản phẩm</p>
                    <p
                      style={{ width: "100%", fontSize: 14 }}
                      dangerouslySetInnerHTML={{
                        __html:
                          textPro.id == record._id
                            ? record?.description
                            : record?.description.substring(
                              0,
                              String(record?.description).length / 10
                            ) + "...",
                      }}
                    />
                    <Button
                      type="primary"
                      onClick={() =>
                        setTextPro(
                          textPro.id == record._id
                            ? { status: false, id: null }
                            : { status: true, id: record._id }
                        )
                      }
                    >
                      {textPro.id !== record._id ? "Xem thêm" : "Rút gọn"}
                    </Button>
                  </div>
                </div>
              );
            },

            onExpand: handleExpand, //ấn hiện chi tiết
          }}
          columns={columns}
          dataSource={dataProducts?.slice().reverse()}
        />
      </div>

      <Comfim
        title="Xóa sản phẩm"
        conent="Bạn có muốn xóa sản phẩm này không ?"
        btnComfim={() => {
          setLoading(true);
          dataDeleteProduct(comfimDelete?.data);
          setComfimDelete({ status: false, data: undefined });
          setLoading(false);
        }}
        btnReject={() => setComfimDelete({ status: false, data: undefined })}
        isModalOpen={comfimDelete?.status}
      />
      <ShowValue
        title={showValue?.data?.name}
        status={showValue?.status}
        callBack={(e) => setShowValue(e)}
        data={showValue?.data}
        dataClass={classifies?.value}
      />
    </div>
  );
};

export default Products;
