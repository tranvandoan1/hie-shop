import  { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { getCategoriAll } from "./../../../features/CateSlice";
// @ts-ignore
import { getDataUserLoca } from "./../../../app/getDataLoca";
import "./css.css";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { getProductAll } from "../../../features/Products";
// @ts-ignore
import { getAllClassifies } from "./../../../features/Classifies";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate()
  const categories = useSelector((data: any) => data.categories.value);
  const users = useSelector((data: any) => data.users.value);
  const products = useSelector((data: any) => data.products);
  const productsValue = products?.value;

  const classifies = useSelector((data: any) => data.classifies);
  const user = users?.data?.find(
    (item: any) => item.code == getDataUserLoca()?.code
  );

  const [selectCategori, setSelectCategori] = useState<any>()
  const newDataPro = productsValue?.filter((item: any) => item.cate_id == selectCategori)
  console.log(newDataPro, "newDataPro");
  useEffect(() => {
    dispatch(getCategoriAll());
    dispatch(getProductAll());
    dispatch(getAllClassifies());
  }, []);

  const ShowHtml = (product: any, classify: any) => {
    const proPrice: any = [];

    product?.map((itemPro: any) => {
      const classifyPrice1: any = [];
      const classifyPrice2: any = [];
      classify?.map((itemData: any) => {
        if (itemData?.linked == itemPro.linked) {
          if (
            itemData?.values == undefined ||
            itemData?.values == null ||
            itemData?.values?.length <= 0
          ) {
            classifyPrice2.push(itemData.price);
          } else {
            itemData?.values?.map((itemPrice: any) =>
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

    return proPrice.map((item: any) => {
      return (
        <Col xs={12} sm={8} md={6} lg={4} xl={6} key={item}>
          <div
            className="products"
            style={{ marginLeft: 10, cursor: 'pointer' }}
            onClick={() =>
              navigator(`/detail/${item.name.replace(/\s+/g, "-")}/${item._id}`)
            }
          >
            <div className="product-photo-box">
              <div className="product-photo">
                <img src={item.photo} alt="" />
              </div>
              <div className="product-photo1">
                <img src={item.photo} alt="" />
              </div>
            </div>
            {
              item.sale > 0 &&
              <span className="product-sale">-{item.sale}%</span>
            }
            <div className="product-title">
              <span className="product-name">{item.name}</span>
              <div className="product-price">
                <span>{item.values[0].toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</span>
                <span>Đã bán : 30k</span>
              </div>
            </div>
          </div>
        </Col>
      );
    });
  };
  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <Header />

      <div className="product-page">
        <div className="product-page-box">
          <div className="product-page-navbar-user">
            <div className="product-page-navbar-user-avatar">
              <img src={user?.avatar} alt="" />
            </div>
            <div className="product-page-navbar-user-categori">
              <h5>Danh mục sản phẩm</h5>
              {
                categories?.map((item: any) => {
                  return (
                    <div className="product-categoris" style={{ background: selectCategori == item._id ? 'rgb(241, 241, 241)' : '' }} onClick={() => {
                      selectCategori == item._id ? setSelectCategori([]) : setSelectCategori(item._id)
                    }}>
                      <div className="product-categoris-logo">
                        <img src={item.photo} alt="" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="product-list">
            <Row gutter={16}>
              {ShowHtml(newDataPro?.length <= 0 ? productsValue : newDataPro, classifies?.value)}
              {ShowHtml(newDataPro?.length <= 0 ? productsValue : newDataPro, classifies?.value)}
              {ShowHtml(newDataPro?.length <= 0 ? productsValue : newDataPro, classifies?.value)}
            </Row>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
