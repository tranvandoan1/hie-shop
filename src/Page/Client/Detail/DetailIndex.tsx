// @ts-ignore
import React, { useReducer, useState } from "react";
import Header from "../../../components/Header";
// @ts-ignore
import "@brainhubeu/react-carousel/lib/style.css";
import "./css/detail.css";
import "@brainhubeu/react-carousel/lib/style.css";
import { Button, Col, Input, Rate, Row } from "antd";
import { BsCartPlus } from "react-icons/bs";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Footer from "../../../components/Footer";
import Comment from "./Comment";
import { useEffect } from "react";
import Comfim from "../../../components/Comfim";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { getProductAll } from "../../../features/Products";
// @ts-ignore
import { getAllClassifies } from "./../../../features/Classifies";
type Props = {};
// @ts-ignore
type State = {
  thumbnails: any;
  slides: any;
  value: any;
};
const image = [
  {
    id: 1,
    photo:
      "https://dongphuchaianh.com/wp-content/uploads/2019/08/nhung-hinh-anh-ao-lop-dep-nhat-01.jpg",
  },
  {
    id: 2,
    photo:
      "https://thoitrangmantis.com/wp-content/uploads/2019/01/ao-phong-co-tron-meo-3d1-tieu.jpg",
  },
  {
    id: 3,
    photo:
      "https://kabuto.vn/wp-content/uploads/2021/01/mau-hinh-in-ao-thun.jpg",
  },
  {
    id: 4,
    photo: "https://cf.shopee.vn/file/30096a74df541ada80347d443b378ca4",
  },
  {
    id: 5,
    photo:
      "https://down-vn.img.susercontent.com/file/827184990179511bf4d73ef152e6eabc",
  },
];
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
const DetailIndex = (props: Props) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { id, name } = useParams();
  // @ts-ignore
  const [valueImage, setValueImage] = useState<any>(image[0]);
  // @ts-ignore
  const [quantityValue, setQuantityValue] = useState<any>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // @ts-ignore
  const [selectHoverImage, setSelectHoverImage] = useState<any>();
  const [selectClassifies, setSelectClassifies] = useState<any>({
    data1: undefined,
    data2: undefined,
  });

  const products = useSelector((data: any) => data.products);
  const classifies = useSelector((data: any) => data.classifies);

  const productsValue = products?.value?.data;
  const productDetail = productsValue?.find((item: any) => item._id == id);

  const newProClassifies: any = classifies?.value?.filter(
    (item: any) => item.linked == productDetail?.linked
  );

  const dataPrice: any = [];
  newProClassifies?.map((item: any) => {
    item.values.map((itemValue: any) => {
      dataPrice?.push(itemValue.price);
    });
  });
  const minPrice = Math.min.apply(Math, dataPrice);
  const maxPrice = Math.max.apply(Math, dataPrice);

  useEffect(() => {
    dispatch(getProductAll());
    dispatch(getAllClassifies());
  }, []);
  // @ts-ignore
  const onchange = (value: any) => { };
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const classifieSelect1 = (item: any) => {
    if (selectClassifies?.data1?._id == item._id) {
      setSelectClassifies({ data1: undefined, data2: selectClassifies.data2 });
    } else {
      setSelectClassifies({ data1: item, data2: undefined });
    }
  };

  const classifieSelect2 = (item: any) => {
    if (selectClassifies?.data2?.id == item.id) {
      setSelectClassifies({ data2: undefined, data1: selectClassifies.data1 });
    } else {
      setSelectClassifies({ data2: item, data1: selectClassifies.data1 });
    }
  };
  // bắt sự kiện click vào ảnh`
  const selectImage = (item: any) => {
    if (selectClassifies?.data2?.id == item.id) {
      setSelectClassifies({ data2: undefined, data1: selectClassifies.data1 });
    } else {
      setSelectClassifies({ data2: item, data1: selectClassifies.data1 });
    }
  };
  // bắt sự kiện hove vào ảnh
  const hoverImage = (item: any) => {
    if (selectClassifies?.data2?.id == item.id) {
      setSelectClassifies({ data2: undefined, data1: selectClassifies.data1 });
    } else {
      setSelectClassifies({ data2: item, data1: selectClassifies.data1 });
    }
  };
  console.log(selectClassifies?.data1?.photo, "selectClassifies");
  return (
    <div className="detail">
      <Header />
      <div className="detail-pro">
        <div className="product-briefing">
          <div className="product-briefing-info_pro">
            <div className="product-briefing-image">
              <img
                src={
                  selectClassifies?.data1 == undefined
                    ? valueImage.photo
                    : selectClassifies?.data1?.photo
                }
                alt=""
              />
            </div>
            <div className="product-briefing-pro_image">
              {newProClassifies?.map((item: any) => {
                return (
                  <div
                    onMouseEnter={() => hoverImage(item)}
                    onClick={() => selectImage(item)}
                    style={{ border: "1px solid red", cursor: "pointer" }}
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
                <div className="product-price_sale">
                  <span className="product-briefing-price_sale">
                    đ{" "}
                    {minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </span>
                  -
                  <span className="product-briefing-price_sale">
                    đ{" "}
                    {maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </span>
                </div>
              )}
              <div className="product-briefing-price-sale">
                {productDetail?.sale > 0 ? (
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
                ) : (
                  <span className="product-briefing-prices">
                    đ {minPrice} - đ {maxPrice}
                  </span>
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
                    {newProClassifies?.map((item: any) => {
                      return (
                        <span
                          className={`value-classify1 ${selectClassifies?.data1?._id == item._id &&
                            "value-classify1-active"
                            }`}
                          onClick={() => classifieSelect1(item)}
                        >
                          {item.name}
                          {selectClassifies?.data1?._id == item._id && (
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
              {productDetail?.name_commodityvalue !== undefined && (
                <div className="product-briefing-classify">
                  <div className="classify2">
                    <span>{productDetail?.name_commodityvalue}</span>
                    <div>
                      {(selectClassifies?.data1 == undefined
                        ? JSON.parse(productDetail?.valueClassify)
                        : selectClassifies?.data1?.values
                      )?.map((item: any) => (
                        <span
                          className={`value-classify2 ${selectClassifies?.data2?.name == item.name &&
                            "value-classify2-active"
                            }`}
                          onClick={() => {
                            classifieSelect2(item);
                          }}
                        >
                          {item.name}
                          {selectClassifies?.data2?.name == item.name && (
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
                    <Button>
                      <MinusOutlined />
                    </Button>
                    <Input defaultValue={quantityValue} />
                    <Button>
                      <PlusOutlined />
                    </Button>
                  </div>
                  {(productDetail?.name_commodityvalue == undefined
                    ? selectClassifies?.data1
                    : selectClassifies?.data2) !== undefined && (
                      <div className="button-quantity_pro">
                        <span>
                          {selectClassifies?.data2?.quantity}
                          sản phẩm
                        </span>
                      </div>
                    )}
                </div>
              </div>

              <div className="button-add">
                <button className="button-add-pro">
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
              <h4>chi tiết sản phẩm</h4>
              <div className="detail-pro-info-cate">
                <span>danh mục</span>
                <span>quần áo đẹp</span>
              </div>
              <div className="detail-pro-info-warehouse">
                <span>Kho hàng</span>
                <span>quần áo đẹp</span>
              </div>
              <div className="detail-pro-info-sent-from">
                <span>Gửi từ</span>
                <span>Hà nội</span>
              </div>

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
            <Comment />
            <br />
            <div className="product-other">
              <h5>sản phẩm khác của shop</h5>
              <Row gutter={16}>
                {data.map((item: any) => {
                  return (
                    <Col xs={12} sm={8} md={6} lg={4} xl={6}>
                      <div className="product_other">
                        <div className="product-other-photo">
                          <img src={item.image} alt="" />
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
            {data.map((item: any) => {
              return (
                <div className="product-hot">
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
    </div>
  );
};

export default DetailIndex;
