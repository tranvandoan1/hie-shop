import { Button, Input, Table } from "antd";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import {
  getSaveOrderAll,
  removeSaveOrder,
  // @ts-ignore
} from "./../../../features/SaveOrderSlice";
import { DeleteOutlined } from "@ant-design/icons";
import Comfim from "../../../components/Comfim";
import Loading from "../../../components/Loading";
// @ts-ignore
import { uploadSaveOrder } from "../../../features/SaveOrderSlice.js";
// @ts-ignore
import { getProductAll } from "../../../features/Products";
import Footer from "../../../components/Footer";
import ShowAddAddress from "../PayMent/ShowAddAdress.js";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const saveorders = useSelector((data: any) => data.saveorders.value);
  const products = useSelector((data: any) => data.products);
  const productsValue = products?.value;

  console.log(productsValue, 'productsValue')
  const newdataSaveorders: any = [];
  saveorders?.map((item: any) =>
    newdataSaveorders.push({ ...item, key: item._id })
  );
  const [comfimDelete, setComfimDelete] = useState({
    status: false,
    data: undefined,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectOrder, setSelectOrder] = useState<any>();
  const [sum, setSum] = useState<any>(0);

  useEffect(() => {
    dispatch(getSaveOrderAll());
    dispatch(getProductAll());
  }, []);

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "photo",
      key: "photo",
      render: (photo: any) => (
        <div className="cart-image">
          <img src={photo} alt="" />
        </div>
      ),
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name_pro",
      key: "name_pro",
      render: (name_pro: any) => <span>{name_pro}</span>,
    },
    {
      title: "Giá Trị Sản Phẩm",
      dataIndex: "key",
      key: "key", // @ts-ignore
      render: (key: any, data: any) => (
        <div>
          {
            productsValue?.map((item: any) => {
              if (item._id == data.pro_id) {
                const dk = item?.name_commodityvalue == null || item?.name_commodityvalue == undefined || String(item?.name_commodityvalue).length <= 0
                if (dk) {
                  return (
                    <div>
                      <span style={{ textTransform: 'capitalize' }}>{item.name_classification} : </span>
                      <span>{data.classification}</span>
                    </div>
                  )
                } else {
                  return (
                    <div>
                      <div>
                        <span style={{ textTransform: 'capitalize' }}>{item.name_classification} : </span>
                        <span>{data.classification}</span>

                      </div>
                      <div>
                        <span style={{ textTransform: 'capitalize' }}>{item.name_commodityvalue} : </span>
                        <span>{data.commodity_value}</span>

                      </div>
                    </div>
                  )
                }
              }
            })
          }
        </div>
      ),
    },
    {
      title: "Số Tiền",
      dataIndex: "price",
      key: "price",
      render: (price: any, data: any) => (
        <div>
          <span style={{ color: "red" }}>
            {(Math.ceil(price * ((100 - data?.sale) / 100))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </span><br />
          <span style={{ color: "rgb(174, 174, 174)", textDecoration: 'line-through' }}>
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </span>
        </div>
      ),
    },

    {
      title: "Số Lượng",
      dataIndex: "amount",
      key: "amount",
      render: (amount: any, data: any) => (
        <div
          className="button-quantity"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="button-quantity-input">
            <Button
              onClick={() => selectValuePro({ value: data, check: "reduce" })}
              style={{ width: 30, height: 30 }}
            >
              -
            </Button>
            <Input
              value={amount}
              style={{ width: 60, height: 30, fontSize: 14 }}
            />
            <Button
              onClick={() => selectValuePro({ value: data, check: "increase" })}
              style={{ width: 30, height: 30 }}
            >
              +
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Tổng Tiền",
      dataIndex: "key",
      key: "key", // @ts-ignore
      render: (key: any, data: any) => (
        <span style={{ color: "red", fontWeight: "500" }}>
          {" "}
          {(Math.ceil(data.price * ((100 - data?.sale) / 100)) * data.amount)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          đ
        </span>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "key",
      key: "key", // @ts-ignore
      render: (key: any, data: any) => (
        <DeleteOutlined
          onClick={() => setComfimDelete({ status: true, data: data })}
        />
      ),
    },
  ];


  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    // @ts-ignore
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectOrder(selectedRows);
      let sum = 0;
      for (let i = 0; i < selectedRows?.length; i++) {
        sum += +(
          Math.ceil(
            selectedRows[i].price * ((100 - selectedRows[i].sale) / 100)
          ) * selectedRows[i].amount
        );
      }
      setSum(sum);
    },
  };
  // thêm bớt số lượng
  const selectValuePro = async (item: any) => {

    // upload sản đang chọn
    if (item.value.amount > 1) {

      if (selectOrder?.length > 0) {
        for (let i = 0; i < selectOrder.length; i++) {
          if (selectOrder[i]._id == item.value._id) {
            selectOrder[i].amount = item.check == "increase" ? item.value.amount + 1 : item.value.amount - 1
          }

        }
        let sum = 0
        for (let i = 0; i < selectOrder?.length; i++) {
          sum += +(
            Math.ceil(
              selectOrder[i].price * ((100 - selectOrder[i].sale) / 100)
            ) * selectOrder[i].amount
          );
        }
        setSelectOrder(selectOrder)
        setSum(sum)
      }
    } else {
      const newData = selectOrder?.filter((itemValue: any) => itemValue._id !== item.value._id)
      let sum = 0
      for (let i = 0; i < newData?.length; i++) {
        sum += +(
          Math.ceil(
            newData[i].price * ((100 - newData[i].sale) / 100)
          ) * newData[i].amount
        );
      }
      setSelectOrder(newData)
      setSum(sum)
    }
    // chọn tăng giảm số lượng
    if (item.check == "increase") {
      setLoading(true);

      await dispatch(
        uploadSaveOrder({ _id: item.value._id, amount: 1 + item.value.amount })
      );
      setLoading(false);
    } else {
      if (item.value.amount <= 1) {
        setComfimDelete({ status: true, data: item.value });
      } else {
        setLoading(true);
        await dispatch(
          uploadSaveOrder({
            _id: item.value._id,
            amount: item.value.amount - 1,
          })
        );
        setLoading(false);
      }
    }
  };
  // xóa order
  const deleterOrder = async () => {
    setLoading(true);
    // @ts-ignore
    await dispatch(removeSaveOrder({ _id: comfimDelete.data._id }));
    setLoading(false);
    setComfimDelete({ status: false, data: undefined });
  };

  const checkOut = () => {
    navigator('/check-out');
    localStorage.setItem("order", JSON.stringify(selectOrder));
  }
  
  return (
    <div style={{ height: "100vh", overflow: "auto" }}>
      {loading == true && <Loading />}
      <Header />
      <div className="cart">
        <br />
        <Table
          pagination={false}
          columns={columns}
          rowSelection={{
            ...rowSelection,
          }}
          dataSource={newdataSaveorders}
        />
        <br />
        <div className="cart-sum">
          <div className="cart-sum-title">
            <h4>Tổng tiền : </h4>
            <span>{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</span>
          </div>
          <div>
            {selectOrder?.length > 0 && <span style={{ fontSize: 18 }}>({selectOrder?.length} sản phẩm)</span>}<Button disabled={selectOrder?.length > 0 ? false : true} onClick={() => checkOut()}>Thanh toán</Button>
          </div>
        </div>
      </div>

      <Comfim
        title="Xóa order"
        conent="Bạn có muốn xóa sản phẩm này không ?"
        btnReject={() => setComfimDelete({ status: false, data: undefined })}
        btnComfim={() => deleterOrder()}
        cancelText="Hủy"
        isModalOpen={comfimDelete.status}
        okText="Xóa"
      />
      <Footer />
      <ShowAddAddress />
    </div>
  );
};

export default Cart;
