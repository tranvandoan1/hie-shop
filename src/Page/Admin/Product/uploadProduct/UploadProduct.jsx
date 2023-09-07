import {
  CloseCircleOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import React, { useState, startTransition, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { getCategoriAll } from "../../../../features/CateSlice";
import ProInfo from "./ProInfo.";
import { useParams } from "react-router-dom";
// @ts-ignore
import { getProductAll, removeProduct } from "../../../../features/Products";
// @ts-ignore
import { getAllClassifies } from "../../../../features/Classifies";
// @ts-ignore

const UploadProduct = ({ callBack, state, data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [p1, setP1] = useState(1);
  const categories = useSelector((data) => data.categories.value);
  const products = useSelector((data) => data.products);
  const classifies = useSelector((data) => data.classifies);
  const productsValue = products?.value?.find(
    (item) => item?._id == id
  );
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  // tìm phân loại sản phẩm.
  const newClassifies = classifies?.value?.filter(
    (item) => item.linked == productsValue?.linked
  );
  // lấy tên phân loại
  const classifyValue1 = [];
  newClassifies?.map((item) => classifyValue1.push(item.name));

  useEffect(() => {
    dispatch(getCategoriAll());
    dispatch(getProductAll());
    dispatch(getAllClassifies());
  }, []);
  const [imageUrlAvatar, setImageUrlAvatar] = useState({
    url: productsValue?.photo,
    file: productsValue?.photo,
    stauts: false,
  });
  const UploadAvatatr = (file) => {
    setLoading(true);
    const src = URL.createObjectURL(file);
    setImageUrlAvatar({ url: src, file: file, stauts: true });
    setLoading(false);
  };
  const [content, setContent] = useState("");
  const [dataValue, setDataValue] = useState({
    description: productsValue?.description,
    imageUrlAvatar: imageUrlAvatar,
    trademark: productsValue?.trademark,
    warehouse: productsValue?.warehouse,
    sent_from: productsValue?.sent_from,
    sale: productsValue?.sale,
    origin: productsValue?.origin,
    name: productsValue?.name,
    cate_id: productsValue?.cate_id,
    photo: productsValue?.photo,
  });

  const [stateValue, setStateValue] = useState();

  useEffect(() => {
    // lấy tên giá trị phân loại 2
    const newClassifies2 = [];
    newClassifies?.map((item) => {
      item?.values?.map((itemValue) => {
        newClassifies2.push(itemValue.name);
      });
    });

    // lọc tên giá trị phân loại 2 trùng nhau
    const uniqueNewClassifies2 = newClassifies2?.filter((value, index) => {
      return newClassifies2?.indexOf(value) === index;
    });

    // loại bỏ tên trùng nhau
    const uniqueClassifies2Value = [];
    newClassifies2?.filter((item, index) => {
      if (newClassifies2.indexOf(item) === index) {
        uniqueClassifies2Value.push({
          name: item,
          id: Math.random(),
          quantity: 0,
          price: 0,
          status: true,
        });
      }
    });


    // lọc giá trị trùng nhau trong object
    const duplicateMame = (duplicateMameArr = []) => {
      const newData = [];
      while (duplicateMameArr.length > 0) {
        newData.push(duplicateMameArr[0]);
        duplicateMameArr = duplicateMameArr?.filter(
          (item) => item.name !== duplicateMameArr[0].name
        );
      }
      return newData;
    };

    const newClassifiesValue = [];
    newClassifies?.map((item) => {
      newClassifiesValue.push({
        ...item,
        values: duplicateMame([...item?.values, ...uniqueClassifies2Value]),
      });
    });
    setStateValue({
      // @ts-ignore
      selectImage: undefined,
      classifyValue: newClassifiesValue,
      classifyValue2: uniqueNewClassifies2,
      classifyValue1: classifyValue1,
      nameClassify2:
        productsValue?.name_commodityvalue == undefined
          ? ""
          : productsValue?.name_commodityvalue,
      nameClassify1: productsValue?.name_classification,
    });
  }, [id]);

  const onFinish = (values) => {
    if (imageUrlAvatar.file == undefined) {
      message.warning("Chưa chọn ảnh !");
    } else {
      const newData = {
        description:
          String(content).length <= 0 ? dataValue?.description : content,
        imageUrlAvatar: imageUrlAvatar,
        // trademark:
        //   values.trademark == undefined
        //     ? dataValue?.trademark
        //     : values.trademark,
        // warehouse:
        //   values.warehouse == undefined
        //     ? dataValue?.warehouse
        //     : values.warehouse,
        // sent_from:
        //   values.sent_from == undefined
        //     ? dataValue?.sent_from
        //     : values.sent_from,
        sale: values.sale == undefined ? dataValue?.sale : values.sale,
        origin: values.origin == undefined ? dataValue?.origin : values.origin,
        name: values.name == undefined ? dataValue?.name : values.name,
        cate_id:
          values.cate_id == undefined ? dataValue?.cate_id : values.cate_id,
      };
      setDataValue(newData);
      setP1(2);
    }
  };
  const onFinishFailed = () => {
  };
  return (
    <div style={{ background: "#fff" }}>
      <div className="admin-product">
        <h4>Sửa sản phẩm</h4>
      </div>
      <hr />
      {p1 == 1 ? (
        <React.Fragment>
          <div style={{ paddingTop: 30 }}>
            <Row>
              <Col
                xs={12}
                sm={4}
                md={12}
                lg={4}
                xl={4}
                style={{ textAlign: "left", padding: "0 30px" }}
              >
                <span className={"image_title"}>Ảnh bìa</span>
              </Col>
              <Col xs={12} sm={4} md={12} lg={20} xl={20}>
                <div className={"uploadImage"} style={{ marginLeft: 12 }}>
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={UploadAvatatr}
                  >
                    {imageUrlAvatar.file !== undefined || dataValue?.photo ? (
                      <div className="box-image">
                        <img
                          src={
                            imageUrlAvatar.url || dataValue?.photo
                          }
                          className="image"
                        />
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          {loading == true ? (
                            <Spin />
                          ) : (
                            <PlusCircleOutlined
                              style={{
                                fontSize: 30,
                                opacity: 0.8,
                                color: "#ee4d2d",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Upload>
                  {imageUrlAvatar.file !== undefined && (
                    <div
                      className={"close"}
                      onClick={() => (
                        setImageUrlAvatar({ url: undefined, file: undefined, status: false })
                        // callBack({
                        //   data: { ...state?.dataBasicInfo, photo: "" },
                        //   check: 1,
                        // })
                      )}
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: 20, padding: "20px" }}>
            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                labelAlign="left"
                rules={[
                  {
                    required:
                      String(dataValue?.name)?.length <= 0 ||
                        dataValue?.name == undefined
                        ? true
                        : false,
                    message: "Bạn chưa nhập tên sản phẩm!",
                  },
                ]}
              >
                <Input
                  placeholder="Tên sản phẩm"
                  defaultValue={
                    String(dataValue?.name)?.length <= 0 ||
                      dataValue?.name == undefined
                      ? ""
                      : dataValue?.name
                  }
                />
              </Form.Item>

              <Form.Item
                label="Giảm giá"
                name="sale"
                labelAlign="left"
                rules={[
                  {
                    required:
                      String(dataValue?.sale)?.length <= 0 ||
                        dataValue?.sale == undefined
                        ? true
                        : false,
                    message: "Bạn chưa nhập giảm giá!",
                  },
                ]}
                style={{ marginTop: 80 }}
              >
                <Input
                  placeholder="Giảm giá"
                  type="number"
                  max={100}
                  min={0}
                  defaultValue={
                    String(dataValue?.sale)?.length <= 0 ? "" : dataValue?.sale
                  }
                />
              </Form.Item>
              <Form.Item
                label="Danh mục"
                labelAlign="left"
                name="cate_id"
                rules={[
                  {
                    required: dataValue?.cate_id == undefined ? true : false,
                    message: "Bạn chưa chọn danh mục!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn danh mục"
                  defaultValue={
                    categories?.data?.find(
                      (item) => item._id == dataValue?.cate_id
                    )?._id
                  }
                >
                  {categories?.data?.map((item) => (
                    <Select.Option key={item} value={item._id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* <Form.Item
                label="Thương hiệu"
                name="trademark"
                labelAlign="left"
                rules={[
                  {
                    required: dataValue?.trademark == undefined ? true : false,
                    message: "Bạn chưa chọn thương hiệu!",
                  },
                ]}
              >
                <Select
                  placeholder="Thương hiệu"
                  key="1"
                  defaultValue={dataValue?.trademark}
                >
                  <Select.Option value="YL">YL</Select.Option>
                  <Select.Option value="NIKE">NIKE</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Nguồn gốc"
                name="origin"
                labelAlign="left"
                rules={[
                  {
                    required: dataValue?.origin == undefined ? true : false,
                    message: "Bạn chưa chọn nguồn gốc!",
                  },
                ]}
              >
                <Select
                  placeholder="Nguồn gốc"
                  key="2"
                  defaultValue={dataValue?.origin}
                >
                  <Select.Option value="Châu Âu">Châu Âu</Select.Option>
                  <Select.Option value="Việt Nam">Việt Nam</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Kho hàng"
                name="warehouse"
                labelAlign="left"
                rules={[
                  {
                    required: dataValue?.warehouse == undefined ? true : false,
                    message: "Bạn chưa chọn kho hàng!",
                  },
                ]}
              >
                <Select
                  placeholder="Thương hiệu"
                  key="3"
                  defaultValue={dataValue?.warehouse}
                >
                  <Select.Option value="Đoàn 123">Đoàn 123</Select.Option>
                  <Select.Option value="Đoàn 312">Đoàn 312</Select.Option>
                  <Select.Option value="Cháu nhỏ">Cháu nhỏ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Gửi từ"
                name="sent_from"
                labelAlign="left"
                rules={[
                  {
                    required: dataValue?.sent_from == undefined ? true : false,
                    message: "Bạn chưa chọn gửi từ đâu !",
                  },
                ]}
              >
                <Select
                  placeholder="Gửi từ"
                  key="4"
                  defaultValue={dataValue?.sent_from}
                >
                  <Select.Option value="Thường Tín">Thường Tín</Select.Option>
                  <Select.Option value="Hoàng Mai">Hoàng Mai</Select.Option>
                </Select>
              </Form.Item> */}

              <Form.Item
                label="Mô tả"
                labelAlign="left"
                name="description"
                rules={[
                  {
                    required:
                      String(dataValue?.description)?.length <= 0 ||
                        dataValue?.description == undefined
                        ? true
                        : false,
                    message: "Bạn chưa nhập mô tả!",
                  },
                ]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  data={
                    String(dataValue?.description)?.length <= 0 ||
                      dataValue?.description == undefined
                      ? ""
                      : dataValue?.description
                  }
                  // @ts-ignore
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    startTransition(() => {
                      setContent(data);
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 22,
                  span: 24,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Tiếp
                  <RightOutlined />
                </Button>
              </Form.Item>
            </Form>
          </div>
        </React.Fragment>
      ) : (
        <div className="pro-info">
          <ProInfo
            callBack={(e) => {
              setP1(1);
              setStateValue(e.state);
              setDataValue(e.dataValue);
            }}
            dataValue={dataValue}
            stateValue={stateValue}
            newClassifies={newClassifies}
            product={productsValue}
          />
        </div>
      )}
    </div>
  );
};

export default UploadProduct;
