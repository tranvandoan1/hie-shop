// @ts-ignore
import React, { useReducer, useState } from "react";
import Header from "../../../components/Header";
// @ts-ignore
import "@brainhubeu/react-carousel/lib/style.css";
import "./detail.css";
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Button, Col, Input, Rate, Row } from "antd";
import { BsCartPlus } from "react-icons/bs";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Footer from "../../../components/Footer";
import Comment from "./Comment";
import { useEffect } from 'react';
import Comfim from "../../../components/Comfim";
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
  const [valueImage, setValueImage] = useState(image[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // @ts-ignore

  // @ts-ignore
  const onchange = (value: any) => { };
  useEffect(() => {
    window.scroll(0, 0);

  }, [])
  return (
    <div className="detail">
      <Header />
      <div className="detail-pro">
        <div className="product-briefing">
          <div className="product-briefing-info_pro">
            <div className="product-briefing-image">
              <img src={valueImage.photo} alt="" />
            </div>
            <div className="product-briefing-pro_image">
              <Carousel
                plugins={[
                  "infinite",
                  "arrows",
                  {
                    resolve: slidesToShowPlugin,
                    options: {
                      numberOfSlides: 3,
                    },
                  },
                ]}
              >
                {image.map((item: any) => {
                  return (
                    <div onClick={() => setValueImage(item)}>
                      <img src={item.photo} alt="" />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className="product-briefing-info">
            <div className="product-briefing-name">
              <h4>
                Áo sơ mi cộc tay Cuban Shirt nam Trơn ATINO vải lụa form regular
                SM4526
              </h4>
            </div>
            <div className="product-briefing-review">
              <Rate allowHalf defaultValue={2.5} className="star" />
              <div className="product-review">
                <span>Đánh giá : 42k</span>
              </div>
              <div className="product-sold">
                <span>42k đã bán</span>
              </div>
            </div>

            <div className="product-briefing-price">
              <span className="product-briefing-price_sale">đ 151.662</span>
              <div className="product-briefing-price-sale">
                <span className="product-briefing-prices">
                  đ 151.662 - đ 180.255
                </span>
                <span className="product-briefing-sale">50% giảm</span>
              </div>
            </div>

            <div className="classify-button">
              <div className="product-briefing-classify">
                <div className="classify1">
                  <span>Màu</span>
                  <div>
                    <span className="value-classify1 value-classify1-active">
                      Màu đen 123 e12{" "}
                    </span>
                    <span className="value-classify1 value-classify1-active">
                      Màu đen{" "}
                      <span className="_v">
                        {" "}
                        <i className="fas fa-check"></i>
                      </span>{" "}
                    </span>
                    <span className="value-classify1 value-classify1-active">
                      Màu đen{" "}
                    </span>
                    <span className="value-classify1 value-classify1-active">
                      Màu đen{" "}
                    </span>
                    <span className="value-classify1 value-classify1-active">
                      Màu đen{" "}
                    </span>
                    <span className="value-classify1 value-classify1-active">
                      Màu đen{" "}
                    </span>
                    <span className="value-classify1 value-classify1-active">
                      Màu đen{" "}
                    </span>
                    <span className="value-classify1 value-classify1-active">
                      Màu đen{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="product-briefing-classify">
                <div className="classify2">
                  <span>Kích thước</span>
                  <div>
                    <span className="value-classify2 value-classify2-active">
                      X
                    </span>
                    <span className="value-classify2 value-classify2-active">
                      XL
                      <span className="_v">
                        {" "}
                        <i className="fas fa-check"></i>
                      </span>{" "}
                    </span>
                    <span className="value-classify2 value-classify2-active">
                      XXL
                    </span>
                    <span className="value-classify2 value-classify2-active">
                      XXXL
                    </span>
                  </div>
                </div>
              </div>

              <div className="quantity">
                <span>Số lượng</span>
                <div className="button-quantity">
                  <div className="button-quantity-input">
                    <Button>
                      <MinusOutlined />
                    </Button>
                    <Input defaultValue={"1"} />
                    <Button>
                      <PlusOutlined />
                    </Button>
                  </div>
                  <div className="button-quantity_pro">
                    <span>12 sản phẩm</span>
                  </div>
                </div>
              </div>

              <div className="button-add">
                <button className="button-add-pro">
                  <BsCartPlus /> <span>Thêm sản phẩm</span>
                </button>
                <button className="button-add-buy" onClick={()=>setIsModalOpen(true)}>Mua ngay</button>
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
                  Dây Vải Dán Sợi Nylon Cho
                  iWatch,T500,HW12,HW22,W26,W46,U78Plus Đủ Size 💥Thông tin sản
                  phẩm * Thân thiện với da tay, thoáng khí và thấm mồ hôi * Đeo
                  như không đeo vì rất nhẹ và ôm tay * Dễ dàng vệ sinh (giặt
                  được) * Dính bám chắc chắn * Mầu sắc đa dạng từ nhã nhặn đến
                  nổi bật * Đầy đủ size 38/40mm và 42/44mm
                  T500,HW12,HW22,W26,W46,U78Plus Nữ đeo thì chọn 38.40mm ạ
                  💥Hướng dẫn chọn size dây: Các bạn chọn size dây theo size máy
                  nhé. Size máy các bạn xem ở mặt sau của đồng hồ có ghi đó.
                  Hiện apple watch và các dòng rep đang có 2 size dây là 38/40mm
                  (size 38mm và 40mm dùng chung dây), 42/44mm (size 42mm và 44mm
                  dùng chung dây) 💥Shop cam kết - Sản phẩm hoàn toàn giống mô
                  tả - Giao hàng siêu tốc, toàn quốc - Đổi/Trả theo chính sách
                  của shopee #daymilanese #applewatchband #milanese
                  #applewatchseries4 #dayapplewatch #daydeoapplewatch
                  #phukienapplewatch #daydeoapplewatch #daydeoapplewatchseries3
                  #daythaytheapplewatch #daydeoapplewatchseries4
                  #dayapplewatchseries3 #dayapplewatchseries4 #red #do #dayvai
                  #soinylon #nylon #vaidan #dan #vai
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
                          <img
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <span className="product-other-sale">-{item.sale}%</span>
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
                    <img
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <span className="product-hot-sale">-{item.sale}%</span>
                  <div className="product-hot-title">
                    <span className="product-hot-name">
                      {item.name}
                    </span>
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
        data=''
        isModalOpen={isModalOpen}
      />
      <Footer />
    </div>
  );
};

export default DetailIndex;
