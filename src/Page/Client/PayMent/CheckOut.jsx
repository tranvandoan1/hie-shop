import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { getAllUser, getUser } from "../../../features/UserSlice";
// @ts-ignore
import { addOrder } from "../../../features/Order";
// @ts-ignore
import { Button, Col, Row, message } from "antd";
import ShowAddAddress from "./ShowAddAdress";
import { PlusOutlined } from "@ant-design/icons";
import Loading from "../../../components/Loading";
import moment from "moment";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { getDataUserLoca } from '../../../app/getDataLoca';
import LZString from 'lz-string';

const CheckOut = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const decodedString = localStorage.getItem('data') == null ? '' : JSON.parse(LZString.decompressFromBase64(localStorage.getItem('data')));

    const infoUsers = useSelector((data) => data.infoUsers.value);
    const users = useSelector((data) => data.users.users)
    const userShop = users?.data?.find((item) => item.code == getDataUserLoca()?.code)
    const dataAdressUser = infoUsers?.find((item) => item.status == true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // @ts-ignore
    const dataOrderLoca = JSON.parse(localStorage.getItem("order"));


    const [dataOrder, setDataOrder] = useState();
    useEffect(() => {
        setDataOrder(dataOrderLoca);
        dispatch(getAllUser({ check: 2, token: decodedString?.token }));
    }, []);

    let sum = 0;
    for (let i = 0; i < dataOrder?.length; i++) {
        sum += +(
            Math.ceil(dataOrder[i].price * ((100 - dataOrder[i].sale) / 100)) *
            dataOrder[i].amount
        );
    }

    const date = moment().date();
    const month = moment().month();
    const year = moment().year();
    const now = moment();
    const hour = now.hours();
    const minute = now.minutes();
    const second = now.seconds();
    const savePay = async () => {
        if (dataAdressUser == undefined) {
            message.warning("Bạn chưa có địa chỉ !");
        } else {
            setLoading(true);
            const newData = {
                values: JSON.stringify(dataOrderLoca),
                user_id: getDataUserLoca()?._id,
                code_shop: getDataUserLoca()?.code,
                price: sum,
                info_user_id: dataAdressUser._id,
            };

            await dispatch(
                addOrder({
                    data: newData,
                    user: user,
                    phone: dataAdressUser?.phone,
                    sum: sum,
                    email_shop: userShop.email,
                    adress: `${dataAdressUser?.address ? `${dataAdressUser?.address},` : ""
                        }   ${dataAdressUser?.ward ? `${dataAdressUser?.ward}, ` : ""} ${dataAdressUser?.district ? `${dataAdressUser?.district}` : ""
                        } ${dataAdressUser?.city ? `, ${dataAdressUser?.city}` : ""}`,

                    time: `${String(date).length <= 1 ? `0${date}` : date}-${String(month).length <= 1 ? `0${month}` : month
                        }-${String(year).length <= 1 ? `0${year}` : year}/${String(hour).length <= 1 ? `0${hour}` : hour
                        }:${String(minute).length <= 1 ? `0${minute}` : minute}:${String(second).length <= 1 ? `0${second}` : second
                        }`,
                })
            );
            localStorage.removeItem("order");
            navigator("/manage/cart");
            setLoading(false);
        }

    };

    console.log(dataOrder, 'dataOrder')
    return (
        <div style={{ background: "#e8e8e8" }}>
            {loading == true && <Loading />}
            <Header />

            <div>
                <div className="pay">
                    <div className="pay-box">
                        <div className="pay-logo">
                            <img src={getDataUserLoca()?.user?.logo} alt="" />
                        </div>
                        <h4>Thanh toán</h4>
                    </div>
                </div>

                <div className="pay-pro">
                    <div className="pay-pro-info">
                        <div className="pay-pro-info-title">
                            <Row>
                                <Col
                                    xs={12}
                                    sm={4}
                                    md={12}
                                    lg={8}
                                    xl={6}
                                    style={{ textAlign: "center", fontWeight: "500" }}
                                >
                                    Ảnh
                                </Col>
                                <Col
                                    xs={12}
                                    sm={4}
                                    md={12}
                                    lg={8}
                                    xl={8}
                                    style={{ textAlign: "center", fontWeight: "500" }}
                                >
                                    Tên
                                </Col>
                                <Col
                                    xs={12}
                                    sm={4}
                                    md={12}
                                    lg={8}
                                    xl={6}
                                    style={{ textAlign: "center", fontWeight: "500" }}
                                >
                                    Giá tiền
                                </Col>
                                <Col
                                    xs={12}
                                    sm={4}
                                    md={12}
                                    lg={8}
                                    xl={4}
                                    style={{ textAlign: "center", fontWeight: "500" }}
                                >
                                    Số lượng
                                </Col>
                            </Row>
                        </div>

                        {dataOrder?.map((item, index) => {
                            return (
                                <div
                                    className="pay-pro-info-item"
                                    style={{ marginTop: index == 0 ? 0 : 10 }}
                                >
                                    <Row>
                                        <Col xs={3} sm={4} md={12} lg={8} xl={4}>
                                            {" "}
                                            <div className="pay-pro-logo">
                                                <img src={item?.photo} alt="" />
                                            </div>
                                        </Col>
                                        <Col
                                            xs={12}
                                            sm={4}
                                            md={12}
                                            lg={8}
                                            xl={10}
                                            style={{ textAlign: "left" }}
                                        >
                                            {" "}
                                            <span style={{ fontSize: 18 }}>{item.name_pro}</span><br />
                                            <span style={{ fontSize: 15, opacity: .7, fontStyle: 'italic' }}>{item.classification}</span>,
                                            <span style={{ fontSize: 15, opacity: .7, fontStyle: 'italic' }}>{item.commodity_value}</span>
                                        </Col>
                                        <Col
                                            xs={5}
                                            sm={4}
                                            md={12}
                                            lg={8}
                                            xl={6}
                                            style={{ textAlign: "center" }}
                                        >
                                            <div className="pay-price-pro">
                                                <span style={{ color: "red", fontWeight: "500" }}>
                                                    {Math.ceil(item.price * ((100 - item?.sale) / 100))
                                                        .toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    đ
                                                </span>
                                                <span
                                                    style={{
                                                        color: "rgb(174, 174, 174)",
                                                        textDecoration: "line-through",
                                                    }}
                                                >
                                                    {item.price
                                                        .toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    đ
                                                </span>
                                            </div>
                                        </Col>
                                        <Col
                                            xs={3}
                                            sm={4}
                                            md={12}
                                            lg={8}
                                            xl={4}
                                            style={{ textAlign: "center", fontWeight: "500" }}
                                        >
                                            {" "}
                                            <span>x{item.amount}</span>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })}
                    </div>
                    <div className="pay-pro-sum">
                        <div className="pay-pro-sum-info">
                            <h4>Thông tin thanh toán </h4>
                            <hr />
                            <div className="pay-pro-sum-info3_s">
                                <div className="pay-pro-adress">
                                    <div className="pay-pro-adress-title">
                                        <span>Địa chỉ : </span>
                                        <span
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            {dataAdressUser == undefined
                                                ? "Chưa có"
                                                : `${String(dataAdressUser?.address).length > 0
                                                    ? `${dataAdressUser?.address},`
                                                    : ""
                                                } ${dataAdressUser?.ward}, ${dataAdressUser?.district
                                                }, ${dataAdressUser?.city}`}
                                        </span>
                                    </div>
                                    <PlusOutlined
                                        style={{
                                            cursor: "pointer",
                                            color: "blue",
                                            width: "13%",
                                            marginTop: 5,
                                        }}
                                        onClick={() => setIsModalOpen(true)}
                                    />
                                </div>
                                <div>
                                    <div className="pay-pro-quantity">
                                        <span>Số lượng sản phẩm : </span>
                                        <span>{dataOrder?.length}</span>
                                    </div>
                                    <div className="pay-pro-summ">
                                        <span>Tổng tiền thanh toán : </span>
                                        <span>
                                            {sum?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => savePay()}
                            disabled={dataAdressUser == undefined ? true : false}
                        >
                            Thanh toán
                        </Button>
                    </div>
                </div>
            </div>
            <ShowAddAddress
                isModalOpen={isModalOpen}
                setIsModalOpen={(e) => setIsModalOpen(e)}
                infoUsers={infoUsers}
            />
            <Footer />
        </div>
    );
};

export default CheckOut;
