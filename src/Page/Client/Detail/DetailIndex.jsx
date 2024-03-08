// @ts-ignore
import React, { useReducer, useState } from "react";
import Header from "../../../components/Header.jsx";
// @ts-ignore
import "@brainhubeu/react-carousel/lib/style.css";
import "./css/detail.css";
import "@brainhubeu/react-carousel/lib/style.css";
import { Button, Col, Input, Modal, Rate, Row, Statistic, message } from "antd";
import { BsCartPlus } from "react-icons/bs";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Footer from "../../../components/Footer.jsx";
import Comment from "./Comment.jsx";
import { useEffect } from "react";
import Comfim from "../../../components/Comfim.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { getProductAll } from "../../../features/Products.js";
// @ts-ignore
import {
  addSaveOrder,
  uploadSaveOrder,
  // @ts-ignore
} from "../../../features/SaveOrderSlice.js";
// @ts-ignore
import { getSaveOrderAll } from "../../../features/SaveOrderSlice.js";
// @ts-ignore
import { getDataUserLoca } from "../../../app/getDataLoca.js";
import { getAllComment } from "../../../features/CommentSlice.js";
import { getAllUser } from "../../../features/UserSlice.js";
import LZString from "lz-string";
const { Countdown } = Statistic;
const data = [
  {
    id: 1,
    name: "Áo thu mùa đông đẹp tuyệt vời sang xịn mịn 1",
    image:
      "https://thuthuatnhanh.com/wp-content/uploads/2022/08/ao-thun-in-hinh-theo-yeu-cau.jpg",
    price: "31000",
    sale: 13,
  },
  {
    id: 2,
    name: "Áo thu mùa đông đẹp tuyệt vời sang xịn mịn 2",
    image:
      "https://thuthuatnhanh.com/wp-content/uploads/2022/08/ao-thun-in-hinh-theo-yeu-cau.jpg",
    price: "32000",
    sale: 5,
  },
  {
    id: 3,
    name: "Áo thu mùa đông đẹp tuyệt vời sang xịn mịn 3",
    image:
      "https://down-vn.img.susercontent.com/file/febb990a8125cc09630ba1fe6a744f83",
    price: "33000",
    sale: 9,
  },
  {
    id: 4,
    name: "Áo thu mùa đông đẹp tuyệt vời sang xịn mịn 4",
    image:
      "https://thuthuatnhanh.com/wp-content/uploads/2022/08/ao-thun-in-hinh-theo-yeu-cau.jpg",
    price: "34000",
    sale: 14,
  },
  {
    id: 5,
    name: "Áo thu mùa đông đẹp tuyệt vời sang xịn mịn 5",
    image:
      "https://thuthuatnhanh.com/wp-content/uploads/2022/08/ao-thun-in-hinh-theo-yeu-cau.jpg",
    price: "35000",
    sale: 12,
  },
  {
    id: 6,
    name: "Áo thu mùa đông đẹp tuyệt vời sang xịn mịn 6",
    image:
      "https://innhanh24h.net/wp-content/uploads/2019/05/%C3%81o-thun-n%E1%BB%AF-hot-%C4%91%E1%BA%B9p.jpg",
    price: "36000",
    sale: 8,
  },
  {
    id: 7,
    name: "Áo thu mùa đông đẹp tuyệt vời sang xịn mịn 7",
    image:
      "https://www.sangia.vn/uploads/Image/2020/11/14/%C3%81o%20thun%20in%20h%C3%ACnh%20%C4%91%E1%BA%B9p.jpg",
    price: "37000",
    sale: 10,
  },
];
// @ts-ignore
const DetailIndex = () => {

  const dispatch = useDispatch();
  // @ts-ignore
  const { id, name } = useParams();
  // @ts-ignore
  document.title = name;//set tên title

  const decodedString = localStorage.getItem('data') == null ? '' : JSON.parse(LZString.decompressFromBase64(localStorage.getItem('data')));

  // @ts-ignore
  const [quantityValue, setQuantityValue] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onModalAddCart, setOnModalAddCart] = useState(false);
  // @ts-ignore
  const [selectHove, setSelectHove] = useState();
  const [selectClassifies, setSelectClassifies] = useState({
    valuePl1: undefined,
    valuePl2: undefined,
  });

  const products = useSelector((data) => data.products);
  const classifies = useSelector((data) => data.classifies);
  const saveorders = useSelector((data) => data.saveorders.value);
  const comments = useSelector((data) => data.comments.value);
  const users = useSelector((data) => data.users.users);


  const commentPro = comments.filter(item => item.pro_id == id)

  // lấy sản phẩm được chọn
  const productsValue = products?.value;
  const productDetail = productsValue?.find((item) => item._id == id);
  const newProClassifies = classifies?.value?.filter(
    (item) => item.linked == productDetail?.linked
  );
  const productShop=products?.value?.filter(item=>item.code_shop==getDataUserLoca().code)
  // kiểm tra xem có phân loại 2 không
  const condition =
    productDetail?.name_commodityvalue == undefined ||
    productDetail?.name_commodityvalue == null ||
    String(productDetail?.name_commodityvalue).length <= 0;
  // lọc giá trị phân loại
  const dataPrice = [];
  newProClassifies?.map((item) => {
    if (condition) {
      dataPrice?.push(item.price);
    } else {
      item.values.map((itemValue) => {
        dataPrice?.push(itemValue.price);
      });
    }
  });
  const minPrice = Math.min.apply(Math, dataPrice);
  const maxPrice = Math.max.apply(Math, dataPrice);

  useEffect(() => {
    dispatch(getProductAll());
    dispatch(getSaveOrderAll());
    dispatch(getAllComment());
    dispatch(getAllUser({ check: 2, token: decodedString?.token }));
    window.scroll(0, 0);
  }, []);

  // chọn phân loại 1
  const classifieSelect1 = (item) => {
    setSelectHove(undefined);
    if (selectClassifies?.valuePl1?._id == item._id) {
      setSelectClassifies({ valuePl1: undefined, valuePl2: undefined });
    } else {
      setSelectClassifies({ valuePl1: item, valuePl2: undefined });
    }
  };
  // chọn phân loại 2
  const classifieSelect2 = (item) => {
    setSelectHove(undefined);
    if (selectClassifies?.valuePl1 == undefined) {
      message.warning("Chưa chọn phân loại !");
    } else {
      if (
        (selectClassifies?.valuePl2?._id || selectClassifies?.valuePl2?.id) ==
        (item._id || item.id)
      ) {
        setSelectClassifies({
          valuePl2: undefined,
          valuePl1: selectClassifies?.valuePl1,
        });
      } else {
        setSelectClassifies({
          valuePl2: item,
          valuePl1: selectClassifies?.valuePl1,
        });
      }
    }
  };

  // bắt sự kiện hove vào ảnh
  const hoverImage = (item) => {
    setSelectClassifies({ valuePl1: undefined, valuePl2: undefined });
    if (selectClassifies?.valuePl2?._id == item._id) {
      setSelectHove(undefined);
    } else {
      setSelectHove(item);
    }
  };

  const selectValuePro = (pro) => {
    setQuantityValue(
      pro == "reduce"
        ? quantityValue == 1
          ? 1
          : quantityValue - 1
        : quantityValue + 1
    );
  };

  const saveOrder = async () => {
    if (
      condition == true
        ? selectClassifies?.valuePl1 == undefined
        : (selectClassifies?.valuePl1 == undefined ||
          selectClassifies?.valuePl2 == undefined)
    ) {
      message.warning("Chưa chọn phân loại !");
    } else {
      const dk =
        productDetail?.name_commodityvalue == null ||
        productDetail?.name_commodityvalue == undefined ||
        String(productDetail?.name_commodityvalue).length <= 0;
      // xem sản phẩm trọn có chưa
      const checkDataSaveOrder = saveorders?.find((item) =>
        dk
          ? item.classification == selectClassifies?.valuePl1?.name &&
          item.user_id == getDataUserLoca()._id &&
          item.code_shop == getDataUserLoca().code &&
          item.pro_id == productDetail?._id
          : item.classification == selectClassifies?.valuePl1?.name &&
          item.commodity_value == selectClassifies?.valuePl2?.name &&
          item.user_id == getDataUserLoca()._id &&
          item.code_shop == getDataUserLoca().code &&
          item.pro_id == productDetail?._id
      );
      if (checkDataSaveOrder == undefined) {
        const newData = {
          code_shop: productDetail.code_shop,
          pro_id: productDetail?._id,
          sale: productDetail?.sale,
          photo: selectClassifies?.valuePl1?.photo,
          name_pro: productDetail?.name,
          price:
            selectClassifies?.valuePl2 == undefined
              ? selectClassifies?.valuePl1?.price
              : selectClassifies?.valuePl2?.price,
          classification: selectClassifies?.valuePl1?.name,
          commodity_value:
            selectClassifies?.valuePl2 == undefined
              ? ""
              : selectClassifies?.valuePl2?.name,
          amount: quantityValue,
          user_id: getDataUserLoca()._id,
        };
        await dispatch(addSaveOrder(newData));
        message.success("Thêm thành công");
      } else {
        await dispatch(
          uploadSaveOrder({
            _id: checkDataSaveOrder._id,
            amount: quantityValue + checkDataSaveOrder.amount,
          })
        );
        setSelectClassifies({ valuePl1: undefined, valuePl2: undefined });
        message.success("Sửa thành công");
      }
      setOnModalAddCart(false)
      setQuantityValue(1);
      setSelectClassifies({ valuePl1: undefined, valuePl2: undefined });
    }
  };

  const handleOk = () => {
    setOnModalAddCart(false);
  };
  const handleCancel = () => {
    setOnModalAddCart(false);
  };
  // const onChange = (val) => {
  //   if (val <= 1) {
  //   console.log('first')
  //   }
  // }
  return (
    <div className="detail">
      <Header />
      {/* <Countdown title="Countdown" format="mm:ss" value={Date.now() + 10 * 1000} onChange={onChange} /> */}
      <div className="detail-pro">
        <div className="product-briefing">

          <div className="product-briefing-info_pro">
            <div className="product-briefing-image">
              <img
                src={
                  selectClassifies?.valuePl1 == undefined
                    ? selectHove == undefined
                      ? productDetail?.photo
                      : selectHove?.photo
                    : selectClassifies?.valuePl1?.photo
                }
                alt=""
              />
            </div>
            <div className="product-briefing-pro_image">
              {newProClassifies?.map((item) => {
                return (
                  <div
                    onMouseEnter={() => hoverImage(item)}
                    // onClick={() => selectImage(item)}
                    style={{
                      border: `1px solid ${item._id == selectHove?._id ? "red" : "#fff"
                        } `,
                      cursor: "pointer",
                    }}
                  >
                    <img src={item.photo} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="product-briefing-info">
            <div className="product-briefing-name">
              <h4>{productDetail?.name}</h4>
            </div>
            <div className="product-briefing-review">
              <Rate allowHalf defaultValue={2.5} className="star" />
              <div className="product-review">
                <span>Đánh giá : {productDetail?.view}</span>
              </div>
              <div className="product-sold">
                <span>{productDetail?.sold} đã bán</span>
              </div>
            </div>

            <div className="product-briefing-price">
              {productDetail?.sale > 0 && (
                <div className="product-price_sale" style={{ marginRight: 30 }}>
                  {selectClassifies?.valuePl1 !== undefined ? (
                    <span className="product-briefing-price_sale">
                      đ{" "}
                      {(condition
                        ? selectClassifies?.valuePl1?.price
                        : selectClassifies?.valuePl2?.price == undefined
                          ? minPrice
                          : selectClassifies?.valuePl2?.price
                      )
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </span>
                  ) : (
                    <React.Fragment>
                      <span className="product-briefing-price_sale">
                        đ{" "}
                        {minPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </span>
                      -
                      <span className="product-briefing-price_sale">
                        đ{" "}
                        {maxPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </span>
                    </React.Fragment>
                  )}
                </div>
              )}
              <div className="product-briefing-price-sale">
                {selectClassifies?.valuePl1 == undefined ? (
                  <React.Fragment>
                    <span className="product-briefing-prices">
                      đ{" "}
                      {Math.ceil(minPrice * ((100 - productDetail?.sale) / 100))
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      - đ{" "}
                      {Math.ceil(maxPrice * ((100 - productDetail?.sale) / 100))
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <span className="product-briefing-prices">
                      đ{" "}
                      {Math.ceil(
                        (condition
                          ? selectClassifies?.valuePl1?.price
                          : selectClassifies?.valuePl2 == undefined
                            ? minPrice
                            : selectClassifies?.valuePl2?.price) *
                        ((100 - productDetail?.sale) / 100)
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    </span>
                  </React.Fragment>
                )}

                {productDetail?.sale > 0 && (
                  <span className="product-briefing-sale">
                    {productDetail?.sale}% giảm
                  </span>
                )}
              </div>
            </div>

            <div className="classify-button">
              <div className="product-briefing-classify">
                <div className="classify1">
                  <span>{productDetail?.name_classification}</span>
                  <div>
                    {newProClassifies?.map((item) => {
                      return (
                        <span
                          className={`value-classify1 ${selectClassifies?.valuePl1?._id == item._id &&
                            "value-classify1-active"
                            }`}
                          onClick={() => classifieSelect1(item)}
                        >
                          {item.name}
                          {selectClassifies?.valuePl1?._id == item._id && (
                            <span className="_v">
                              {" "}
                              <i className="fas fa-check"></i>
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              {condition ? null : (
                <div className="product-briefing-classify">
                  <div className="classify2">
                    <span>{productDetail?.name_commodityvalue}</span>
                    <div>
                      {(selectClassifies?.valuePl1 == undefined
                        ? JSON.parse(productDetail?.valueClassify)
                        : selectClassifies?.valuePl1?.values
                      )?.map((item) => (
                        <span
                          className={`value-classify2 ${selectClassifies?.valuePl2?.name ==
                            (item.name || item) && "value-classify2-active"
                            }`}
                          onClick={() => {
                            classifieSelect2(item);
                          }}
                        >
                          {item.name || item}
                          {selectClassifies?.valuePl2?.name == item.name && (
                            <span className="_v">
                              <i className="fas fa-check"></i>
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="quantity">
                <span>Số lượng</span>
                <div className="button-quantity">
                  <div className="button-quantity-input">
                    <Button onClick={() => selectValuePro("reduce")}>
                      <MinusOutlined />
                    </Button>
                    <Input value={quantityValue} />
                    <Button onClick={() => selectValuePro("increase")}>
                      <PlusOutlined />
                    </Button>
                  </div>
                  {(condition
                    ? selectClassifies?.valuePl1
                    : selectClassifies?.valuePl2) !== undefined && (
                      <div className="button-quantity_pro">
                        <span>
                          {selectClassifies?.valuePl2?.quantity} sản phẩm
                        </span>
                      </div>
                    )}
                </div>
              </div>

              <div className="button-add">
                <button className="button-add-pro" onClick={() => saveOrder()}>
                  <BsCartPlus /> <span>Thêm sản phẩm</span>
                </button>
                <button
                  className="button-add-buy"
                  onClick={() => setIsModalOpen(true)}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>

        </div>
        <br />
        <div className="detail-pro-info">
          <div className="detail-pro-info_left">
            <div className="detail-pro-info_left_1">

              <h4>mô tả sản phẩm</h4>
              <div className="product-description">
                <span>
                  <p
                    style={{ width: "100%", fontSize: 14 }}
                    dangerouslySetInnerHTML={{
                      __html: productDetail?.description,
                    }}
                  />
                </span>
              </div>
            </div>
            <Comment comments={commentPro} users={users?.data} />
            <br />
            <div className="product-other">
              <h5>sản phẩm khác của shop</h5>
              <Row >
                {productShop.map((item) => {
                  return (
                    <Col xs={12} sm={8} md={6} lg={4} xl={6} key={item} style={{padding:3}}>
                      <div className="product_other">
                        <div className="product-other-photo">
                          <img src={item.photo} alt="" />
                        </div>
                        <span className="product-other-sale">
                          -{item.sale}%
                        </span>
                        <div className="product-other-title">
                          <span className="product-other-name">
                            {item.name}
                          </span>
                          <div className="product-other-price">
                            <span>{item.price}đ</span>
                            <span>Đã bán : 30k</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
          <div className="detail-pro-info_right">
            {data.map((item) => {
              return (
                <div className="product-hot" key={item}>
                  <div className="product-hot-photo">
                    <img src={item.image} alt="" />
                  </div>
                  <span className="product-hot-sale">-{item.sale}%</span>
                  <div className="product-hot-title">
                    <span className="product-hot-name">{item.name}</span>
                    <div className="product-hot-price">
                      <span>{item.price}đ</span>
                      <span>Đã bán : 30k</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Comfim
        title="Xóa bình luận"
        conent="Bạn có muốn xóa bình luận này không ?"
        btnComfim={() => setIsModalOpen(false)}
        btnReject={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
      />

      <Footer />
      {/* button mobi */}
      <div className="button-add-mobi">
        <button className="button-add-pro" onClick={() => setOnModalAddCart(true)}>
          <BsCartPlus /> <span>Thêm sản phẩm</span>
        </button>
        <button className="button-add-buy" onClick={() => setIsModalOpen(true)}>
          Mua ngay
        </button>
      </div>

      <div className="modal-add-cart">
        <Modal title="Thêm sản phẩm" open={onModalAddCart} footer={false} onOk={handleOk} onCancel={handleCancel}>
          <div className="classify-button-mobile">
            <div className="product-briefing-classify">
              <div className="classify1">
                <span>{productDetail?.name_classification}</span>
                <div>
                  {newProClassifies?.map((item) => {
                    return (
                      <span
                        className={`value-classify1 ${selectClassifies?.valuePl1?._id == item._id &&
                          "value-classify1-active"
                          }`}
                        onClick={() => classifieSelect1(item)}
                      >
                        {item.name}
                        {selectClassifies?.valuePl1?._id == item._id && (
                          <span className="_v">
                            {" "}
                            <i className="fas fa-check"></i>
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            {condition ? null : (
              <div className="product-briefing-classify">
                <div className="classify2">
                  <span>{productDetail?.name_commodityvalue}</span>
                  <div>
                    {(selectClassifies?.valuePl1 == undefined
                      ? JSON.parse(productDetail?.valueClassify)
                      : selectClassifies?.valuePl1?.values
                    )?.map((item) => (
                      <span
                        className={`value-classify2 ${selectClassifies?.valuePl2?.name ==
                          (item.name || item) && "value-classify2-active"
                          }`}
                        onClick={() => {
                          classifieSelect2(item);
                        }}
                      >
                        {item.name || item}
                        {selectClassifies?.valuePl2?.name == item.name && (
                          <span className="_v">
                            <i className="fas fa-check"></i>
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="quantity">
              <span>Số lượng</span>
              <div className="button-quantity">
                <div className="button-quantity-input">
                  <Button onClick={() => selectValuePro("reduce")}>
                    <MinusOutlined />
                  </Button>
                  <Input value={quantityValue} />
                  <Button onClick={() => selectValuePro("increase")}>
                    <PlusOutlined />
                  </Button>
                </div>
                {(condition
                  ? selectClassifies?.valuePl1
                  : selectClassifies?.valuePl2) !== undefined && (
                    <div className="button-quantity_pro">
                      <span>
                        {selectClassifies?.valuePl2?.quantity} sản phẩm
                      </span>
                    </div>
                  )}
              </div>
            </div>

            <div className="button-add">
              <button className="button-add-pro" onClick={() => saveOrder()}>
                <BsCartPlus /> <span>Thêm sản phẩm</span>
              </button>
              <button
                className="button-add-buy"
                onClick={() => setIsModalOpen(true)}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </Modal>
      </div>

    </div>
  );
};

export default DetailIndex;
