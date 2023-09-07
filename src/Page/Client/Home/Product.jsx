import styles from "../../../css/Home/product.module.css";
// @ts-ignore
import Carousel, {
    slidesToShowPlugin,
    autoplayPlugin,
} from "@brainhubeu/react-carousel";
import { Col, Row } from "antd";
// @ts-ignore
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { getProductAll } from "../../../features/Products";
// @ts-ignore
import { getAllClassifies } from "../../../features/Classifies";

const Product = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((data) => data.products);
    const productsValue = products?.value;

    const classifies = useSelector((data) => data.classifies);
    // @ts-ignore
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getProductAll());
        dispatch(getAllClassifies());
    }, []);

    const ShowHtml = (product, classify) => {
        const proPrice = [];

        product?.map((itemPro) => {
            const classifyPrice1 = [];
            const classifyPrice2 = [];
            classify?.map((itemData) => {
                if (itemData?.linked == itemPro.linked) {
                    if (
                        itemData?.values == undefined ||
                        itemData?.values == null ||
                        itemData?.values?.length <= 0
                    ) {
                        classifyPrice2.push(itemData.price);
                    } else {
                        itemData?.values?.map((itemPrice) =>
                            classifyPrice1.push(itemPrice.price)
                        );
                    }
                }
            });
            proPrice.push({
                ...itemPro,
                values: [...classifyPrice2, ...classifyPrice1],
            });
        });

        for (let i = 0; i < proPrice.length; i++) {
            const minPrice = Math.min.apply(Math, proPrice[i].values);
            const maxPrice = Math.max.apply(Math, proPrice[i].values);
            proPrice[i].values = [minPrice, maxPrice];
        }

        return proPrice.map((item) => {
            return (
                <Col xs={12} sm={8} md={6} lg={4} xl={6} key={item}>
                    <div
                        className={styles["products"]}
                        style={{ marginLeft: 10, cursor: 'pointer' }}
                        onClick={() =>
                            navigate(`/detail/${item.name.replace(/\s+/g, "-")}/${item._id}`)
                        }
                    >
                        <div className={styles["product-photo-box"]}>
                            <div className={styles["product-photo"]}>
                                <img src={item.photo} alt="" />
                            </div>
                            <div className={styles["product-photo1"]}>
                                <img src={item.photo} alt="" />
                            </div>
                        </div>
                        {
                            item.sale > 0 &&
                            <span className={styles["product-sale"]}>-{item.sale}%</span>
                        }
                        <div className={styles["product-title"]}>
                            <span className={styles["product-name"]}>{item.name}</span>
                            <div className={styles["product-price"]}>
                                <span>{item.values[0]}đ</span>
                                <span>Đã bán : 30k</span>
                            </div>
                        </div>
                    </div>
                </Col>
            );
        });
    };
    const ShowHtmlOutstanding = (product, classify) => {
        const proPrice = [];

        product?.map((itemPro) => {
            const classifyPrice1 = [];
            const classifyPrice2 = [];
            classify?.map((itemData) => {
                if (itemData?.linked == itemPro.linked) {
                    if (
                        itemData?.values == undefined ||
                        itemData?.values == null ||
                        itemData?.values?.length <= 0
                    ) {
                        classifyPrice2.push(itemData.price);
                    } else {
                        itemData?.values?.map((itemPrice) =>
                            classifyPrice1.push(itemPrice.price)
                        );
                    }
                }
            });
            proPrice.push({
                ...itemPro,
                values: [...classifyPrice2, ...classifyPrice1],
            });
        });

        for (let i = 0; i < proPrice.length; i++) {
            const minPrice = Math.min.apply(Math, proPrice[i].values);
            const maxPrice = Math.max.apply(Math, proPrice[i].values);
            proPrice[i].values = [minPrice, maxPrice];
        }

        return proPrice.map((item) => {
            return (
                <div className={styles["products"]} style={{ marginLeft: 10 }} key={item}>
                    <div className={styles["product-photo-box"]}>
                        <div className={styles["product-photo"]}>
                            <img src={item.photo} alt="" />
                        </div>
                        <div className={styles["product-photo1"]}>
                            <img src={item.photo} alt="" />
                        </div>
                    </div>
                    {
                        item.sale > 0 &&
                        <span className={styles["product-sale"]}>-{item.sale}%</span>
                    }
                    <div className={styles["product-title"]}>
                        <span className={styles["product-name"]}>{item.name}</span>
                        <div className={styles["product-price"]}>
                            <span>{item.values[0]}đ</span>
                            <span>Đã bán : 30k</span>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <div className={styles.list_products}>
                <h4>Sản phẩm nổi bật</h4>
                <div className="css-library">
                    <div className={styles["show-product"]}>
                        <Carousel
                            animationSpeed={2000}
                            plugins={[
                                "infinite",
                                {
                                    resolve: autoplayPlugin,
                                    options: {
                                        interval: 2000,
                                    },
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
                            {ShowHtmlOutstanding(productsValue, classifies?.value)}
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className={styles.list_products}>
                <h4>Sản phẩm của Shop</h4>
                <div className="css-library">
                    <div className={styles["show-product"]}>
                        <Row gutter={16}>{ShowHtml(productsValue, classifies?.value)}</Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
