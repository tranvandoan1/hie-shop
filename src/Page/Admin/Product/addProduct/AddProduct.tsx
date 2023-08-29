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
import { getCategoriAll } from "./../../../../features/CateSlice";
import ProInfo from './ProInfo';
// @ts-ignore
const AddProduct: React.FC = ({ callBack, state, data }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [p1, setP1] = useState(1);
  const categories = useSelector((data: any) => data.categories.value);
  useEffect(() => {
    dispatch(getCategoriAll());
  }, []);
  const [imageUrlAvatar, setImageUrlAvatar] = useState<any>({
    url: undefined,
    file: undefined,
  });
  const UploadAvatatr = (file: any) => {
    setLoading(true);
    const src = URL.createObjectURL(file);
    setImageUrlAvatar({ url: src, file: file });
    setLoading(false);
  };
  const [content, setContent] = useState("");
  const [dataValue, setDataValue] = useState<any>();

  const [stateValue, setStateValue] = useState()

  const onFinish = (values: any) => {
    if (imageUrlAvatar.file == undefined) {
      message.warning('Chưa chọn ảnh !')
    } else {
      const newData = {
        description: content,
        imageUrlAvatar: imageUrlAvatar,
        trademark: dataValue?.trademark == undefined ? values.trademark : dataValue?.trademark,
        warehouse: dataValue?.warehouse == undefined ? values.warehouse : dataValue?.warehouse,
        sent_from: dataValue?.sent_from == undefined ? values.sent_from : dataValue?.sent_from,
        sale: dataValue?.sale == undefined ? values.sale : dataValue?.sale,
        origin: dataValue?.origin == undefined ? values.origin : dataValue?.origin,
        name: dataValue?.name == undefined ? values.name : dataValue?.name,
        cate_id: dataValue?.cate_id == undefined ? values.cate_id : dataValue?.cate_id,
      }
      setDataValue(newData)
      setP1(2)
    }

  };
  const onFinishFailed = (values: any) => { console.log(values, '21wed') };
  return (
    <div style={{ background: "#fff" }}>
      {
        p1 == 1 ?
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
                      {imageUrlAvatar.file !== undefined ? (
                        <div
                          className="box-image"
                        >
                          <img
                            src={
                              dataValue?.imageUrlAvatar?.file == undefined ?
                                imageUrlAvatar
                                  ? imageUrlAvatar.url
                                  : state?.dataBasicInfo?.photo.url !== "" &&
                                  state?.dataBasicInfo?.photo.url
                                :
                                dataValue?.imageUrlAvatar?.url
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
                          setImageUrlAvatar({ url: undefined, file: undefined }),
                          callBack({
                            data: { ...state?.dataBasicInfo, photo: "" },
                            check: 1,
                          })
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
                      required: (String(dataValue?.name)?.length <= 0 || dataValue?.name == undefined) ? true : false,
                      message: "Bạn chưa nhập tên sản phẩm!",
                    },
                  ]}
                >
                  <Input placeholder="Tên sản phẩm" defaultValue={(String(dataValue?.name)?.length <= 0 || dataValue?.name == undefined) ? "" : dataValue?.name} />
                </Form.Item>

                <Form.Item
                  label="Giảm giá"
                  name="sale"
                  labelAlign="left"
                  rules={[
                    {
                      required: (String(dataValue?.sale)?.length <= 0 || dataValue?.sale == undefined) ? true : false,
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
                    defaultValue={(String(dataValue?.sale)?.length <= 0 || dataValue?.sale == undefined) ? "" : dataValue?.sale}

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
                    defaultValue={categories?.data?.find((item: any) => item._id == dataValue?.cate_id)?._id}
                  >
                    {categories?.data?.map((item: any) => (
                      <Select.Option key={item} value={item._id}>{item.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
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
                  <Select placeholder="Thương hiệu" key="1" defaultValue={dataValue?.trademark}>
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
                  <Select placeholder="Nguồn gốc" key="2" defaultValue={dataValue?.origin}>
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
                  <Select placeholder="Thương hiệu" key="3" defaultValue={dataValue?.warehouse}>
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
                  <Select placeholder="Gửi từ" key="4" defaultValue={dataValue?.sent_from}>
                    <Select.Option value="Thường Tín">Thường Tín</Select.Option>
                    <Select.Option value="Hoàng Mai">Hoàng Mai</Select.Option>
                  </Select>
                </Form.Item>


                <Form.Item
                  label="Mô tả"
                  labelAlign="left"
                  name="description"
                  rules={[
                    {
                      required: (String(dataValue?.description)?.length <= 0 || dataValue?.description == undefined) ? true : false,
                      message: "Bạn chưa nhập mô tả!",
                    },
                  ]}
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data={(String(dataValue?.description)?.length <= 0 || dataValue?.description == undefined) ? "" : dataValue?.description}
                    // @ts-ignore
                    onChange={(event: any, editor: any) => {
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
          :
          <div className='pro-info'>
            <ProInfo
              callBack={(e) => {
                setP1(1)
                setStateValue(e)
              }}
              dataValue={dataValue}
              stateValue={stateValue}
            />
          </div>

      }
    </div>
  );
};

export default AddProduct;
