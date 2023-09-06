import { useRef } from 'react'
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import Header from '../../../components/Header';


import '../../../css/Home/home.css'
import Product from './Product';
import Footer from '../../../components/Footer';
// @ts-ignore
import Carousel1, { slidesToShowPlugin, autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
const Home = () => {
  const slider = useRef<any>(null);
  // @ts-ignore
  const onChange = (currentSlide: any) => {
    // console.log(currentSlide);
  };
 
  return (
    <div style={{ background: "#fff" }}>
      <Header />
      <div className="body">
        <div className="slider">
          <Carousel
            afterChange={onChange}
            className="slide-image"
            autoplay
            ref={slider}
          >
            <div>
              <img
                src="https://intphcm.com/data/upload/banner-thoi-trang-nam.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://intphcm.com/data/upload/banner-thoi-trang-nam-dep.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://arena.fpt.edu.vn/wp-content/uploads/2022/10/banner-thoi-trang-la-mot-phan-khong-the-thieu-trong-truyen-thong-1.jpg"
                alt=""
              />
            </div>
          </Carousel>

          <LeftOutlined
            className="slider-button_left"
            onClick={() => slider.current.prev()}
          />

          <RightOutlined
            className="slider-button_right"
            onClick={() => slider.current.next()}
          />
        </div>
        {/* <div>
          <div className="categori-title">
            <h4>Danh mục sản phẩm</h4>
          </div>
          <div className="categori-list">
            <Carousel1
              animationSpeed={1000}
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
              {data.map((item: any) => {
                return (
                  <Col xs={12} sm={8} md={6} lg={4} xl={4}>
                    <div className="categoris">
                      <div className="categoris-logo">
                        <img src={item.photo} alt="" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </Col>
                );
              })}
            </Carousel1>
          </div>
        </div> */}

        <Product />

        <div>
          <div>
            <div>
              
            </div>
            <span>Sản phẩm luôn được bảo hành.</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home