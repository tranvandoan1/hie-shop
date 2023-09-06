import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import { getProductAll } from "../../../features/Products";
// @ts-ignore
import { getOrder } from "./../../../features/Order";
import { ArrowLeftOutlined } from "@ant-design/icons";
type Props = {};

const DetailCart = (props: Props) => {
    const { id } = useParams();
    const navigator = useNavigate()
    const dispatch = useDispatch();
    const orders = useSelector((data: any) => data.orders.value);
    const products = useSelector((data: any) => data.products.value);
    const order = orders?.find((item: any) => item._id == id);
    const time = new Date(order?.createdAt);
    const valueOrder = JSON?.parse(order?.values);
    console.log(valueOrder,'valueOrder')
    // tính tổng tiền
    let sum = 0;
    for (let i = 0; i < valueOrder.length; i++) {
        sum += Math.ceil(valueOrder[i].sumPrice * ((100 - valueOrder[i].sale) / 100));
    }
    console.log(sum, 'sum')
    useEffect(() => {
        dispatch(getProductAll());
        dispatch(getOrder());
    }, []);
    return (
        <div>
            <h5>
                <span style={{ cursor: 'pointer', marginRight: 10 }} onClick={() => navigator('/manage/cart')}><ArrowLeftOutlined /></span> Chi tiết đơn hàng <span className="detail-order-title">#{id}</span>
            </h5>
            <span>Thời gian đặt : </span>
            <span className="detail-order-title-time">
                {`${String(time.getDate()).length <= 1
                    ? `0${time.getDate()}`
                    : time.getDate()
                    }-${String(time.getMonth() + 1).length <= 1
                        ? `0${time.getMonth() + 1}`
                        : time.getMonth() + 1
                    }-${String(time.getFullYear()).length <= 1
                        ? `0${time.getFullYear()}`
                        : time.getFullYear()
                    }`}
            </span>
            <hr />
            <div className="detail-order-pro-title">
                <span>Ảnh sản phẩm</span>
                <span>Tên sản phẩm</span>
                <span>Thể loại</span>
                <span>Số lượng</span>
                <span>Số tiền</span>
            </div>
            {valueOrder?.map((item: any) => {
                return (
                    <div className="detail-order-pro-list">
                        <div className="detail-order-pro-image">
                            <img src={item.photo} alt="" />
                        </div>
                        <span className="detail-order-pro-name">{item.name_pro}</span>
                        <span>
                            {products?.map((itemPro: any) => {
                                const dk =
                                    itemPro?.name_commodityvalue == null ||
                                    itemPro?.name_commodityvalue == undefined ||
                                    String(itemPro?.name_commodityvalue).length <= 0;
                                if (item.pro_id == itemPro._id) {
                                    return (
                                        <div>
                                            <span>
                                                {itemPro.name_classification} : {item.classification}
                                            </span>

                                            <br />
                                            {!dk && (
                                                <span>
                                                    {itemPro.name_commodityvalue} : {item.commodity_value}
                                                </span>
                                            )}
                                        </div>
                                    );
                                }
                            })}
                        </span>
                        <span>{item.amount}</span>
                        <span className="detail-order-pro-price">
                            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                        </span>
                    </div>
                );
            })}


        </div>
    );
};

export default DetailCart;
