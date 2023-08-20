import styles from "../../../css/Home/product.module.css";
// @ts-ignore
import Carousel, { slidesToShowPlugin, autoplayPlugin } from "@brainhubeu/react-carousel";
import { Col, Row } from "antd";
// @ts-ignore
import React from 'react'
import { useNavigate } from "react-router-dom";
const Product = () => {

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
    const nativer = useNavigate()
    return (
        <div>
            <div className={styles.list_products}>
                <h4>Sản phẩm nổi bật</h4>
                <div className="css-library">
                    <div className={styles["show-product"]}>
                        <Carousel
                            animationSpeed={2000}
                            plugins={[
                                'infinite',
                                {
                                    resolve: autoplayPlugin,
                                    options: {
                                        interval: 2000,
                                    }
                                },
                                "arrows",
                                {
                                    resolve: slidesToShowPlugin,
                                    options: {
                                        numberOfSlides: 5,
                                    },
                                },
                            ]}


                        >
                            {data.map((item: any) => {
                                return (
                                    <div
                                        className={styles["products"]}
                                        style={{ marginLeft: 10 }}
                                    >
                                       <div className={styles["product-photo-box"]}>
                                                <div className={styles["product-photo"]}>
                                                    <img src={item.image} alt="" />
                                                </div>
                                                <div className={styles["product-photo1"]}>
                                                    <img src={'https://tronhouse.com/assets/data/editor/source/meo-chup-anh-san-pham-quan-ao-de-kinh-doanh-online-hieu-qua/chup-anh-quan-ao-5.jpg'} alt="" />
                                                </div>
                                            </div>
                                        <span className={styles["product-sale"]}>-{item.sale}%</span>
                                        <div className={styles["product-title"]}>
                                            <span className={styles["product-name"]}>{item.name}</span>
                                            <div className={styles["product-price"]}>
                                                <span>{item.price}đ</span>
                                                <span>Đã bán : 30k</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Carousel>

                    </div>
                </div>
            </div>
            <div className={styles.list_products}>
                <h4>Sản phẩm của Shop</h4>
                <div className="css-library">
                    <div className={styles["show-product"]}>
                        <Row gutter={16}>

                            {data.map((item: any) => {
                                return (
                                    <Col xs={12} sm={8} md={6} lg={4} xl={6}>
                                        <div
                                            className={styles["products"]}
                                            onClick={() => nativer('/detail')}
                                        >
                                            <div className={styles["product-photo-box"]}>
                                                <div className={styles["product-photo"]}>
                                                    <img src={item.image} alt="" />
                                                </div>
                                                <div className={styles["product-photo1"]}>
                                                    <img src={'https://tronhouse.com/assets/data/editor/source/meo-chup-anh-san-pham-quan-ao-de-kinh-doanh-online-hieu-qua/chup-anh-quan-ao-5.jpg'} alt="" />
                                                </div>
                                            </div>
                                            <span className={styles["product-sale"]}>-{item.sale}%</span>
                                            <div className={styles["product-title"]}>
                                                <span className={styles["product-name"]}>{item.name}</span>
                                                <div className={styles["product-price"]}>
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
            </div>
        </div>
    );
}

export default Product;
