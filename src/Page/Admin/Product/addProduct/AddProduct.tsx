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
import { getCateAll } from "./../../../../features/CateSlice";
import ProInfo from './ProInfo';
// @ts-ignore
const AddProduct: React.FC = ({ callBack, state, data }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [p1, setP1] = useState(1);
  const categories = useSelector((data: any) => data.categories.value);
  useEffect(() => {
    dispatch(getCateAll());
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
  console.log(dataValue, 'dataValue')
  const onFinish = (values: any) => {
    if (imageUrlAvatar.file == undefined) {
      message.warning('Chưa chọn ảnh !')
    } else {
      const newData = {
        ...values,
        description: content,
        imageUrlAvatar: imageUrlAvatar

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
                  // rules={[
                  //   {
                  //     required: (String(dataValue?.name)?.length <= 0 || dataValue?.name == undefined) ? true : false,
                  //     message: "Bạn chưa nhập tên sản phẩm!",
                  //   },
                  // ]}
                >
                  <Input placeholder="Tên sản phẩm" defaultValue={(String(dataValue?.name)?.length <= 0 || dataValue?.name == undefined) ? "" : dataValue?.name} />
                </Form.Item>
                <Form.Item
                  label="Mô tả"
                  labelAlign="left"
                  name="description"
                  // rules={[
                  //   {
                  //     required: (String(dataValue?.description)?.length <= 0 || dataValue?.description == undefined) ? true : false,
                  //     message: "Bạn chưa nhập mô tả!",
                  //   },
                  // ]}
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
                  label="Giảm giá"
                  name="sale"
                  labelAlign="left"
                  // rules={[
                  //   {
                  //     required: (String(dataValue?.sale)?.length <= 0 || dataValue?.sale == undefined) ? true : false,
                  //     message: "Bạn chưa nhập giảm giá!",
                  //   },
                  // ]}
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
                  // rules={[
                  //   {
                  //     required: dataValue?._id == undefined ? true : false,
                  //     message: "Bạn chưa chọn danh mục!",
                  //   },
                  // ]}
                >
                  <Select
                    placeholder="Chọn danh mục"
                    defaultValue={categories?.data?.find((item: any) => item._id == dataValue?._id ? dataValue?._id : '')}
                  >
                    {categories?.data?.map((item: any) => (
                      <Select.Option value={item._id}>{item.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Thương hiệu"
                  name="trademark"
                  labelAlign="left"
                  // rules={[
                  //   {
                  //     required:dataValue?.trademark==undefined? true:false,
                  //     message: "Bạn chưa chọn thương hiệu!",
                  //   },
                  // ]}

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
                  // rules={[
                  //   {
                  //     required:dataValue?.origin==undefined? true:false,
                  //     message: "Bạn chưa chọn nguồn gốc!",
                  //   },
                  // ]}
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
                  // rules={[
                  //   {
                  //     required:dataValue?.warehouse==undefined? true:false,
                  //     message: "Bạn chưa chọn kho hàng!",
                  //   },
                  // ]}
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
                  // rules={[
                  //   {
                  //     required:dataValue?.sent_from==undefined? true:false,
                  //     message: "Bạn chưa chọn gửi từ đâu !",
                  //   },
                  // ]}
                >
                  <Select placeholder="Gửi từ" key="4" defaultValue={dataValue?.sent_from}>
                    <Select.Option value="Thường Tín">Thường Tín</Select.Option>
                    <Select.Option value="Hoàng Mai">Hoàng Mai</Select.Option>
                  </Select>
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
              callBack={() => setP1(1)}
              dataValue={dataValue}
            />
          </div>

      }
    </div>
  );
};

export default AddProduct;
// import {
//   CloseCircleOutlined,
//   EyeInvisibleOutlined,
//   EyeOutlined,
//   PlusCircleOutlined,
// } from "@ant-design/icons";
// import { Button, Input, Select, Spin, Table, Upload } from "antd";
// import { useState, startTransition } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // @ts-ignore
// import { addProduct } from "./../../../../features/Products";
// import Loading from "../../../../components/Loading";
// type Props = {
//   callBack: () => void;
//   dataValue: any;
// };
// // @ts-ignore
// const ProInfo = ({ callBack, dataValue }: Props) => {
//   const dispatch = useDispatch();
//   // @ts-ignore
//   const userLoca = JSON.parse(localStorage.getItem("user"));
//   const navigator = useNavigate();
//   const [nameClassify1, setNameClassify1] = useState(); //tên pl1
//   const [nameClassify2, setNameClassify2] = useState(); //tên pl2

//   const [classifyValue, setClassifyValue] = useState([]); //dữ liệu hoàn tất
//   const [selectImage, setSelectImage] = useState<any>();

//   const [loading, setLoading] = useState<boolean>(false);

//   const [comfimShowClassifyValue, setComfimShowClassifyValue] =
//     useState<boolean>(false);

//   const UploadAvatatr = (file: any) => {
//     setLoading(true);
//     const src = URL.createObjectURL(file);
//     // setImageUrlAvatar({ url: src, file: file });
//     const newData: any = [];
//     classifyValue?.map((item: any) => {
//       if (item.id == selectImage.id) {
//         newData.push({ ...item, url: src, file: file });
//       } else {
//         newData.push({ ...item, url: item.url, file: item.file });
//       }
//     });
//     setClassifyValue(newData);
//     setLoading(false);
//   };
//   const removeImage = (e: any) => {
//     setLoading(true);
//     const newData: any = [];
//     classifyValue?.map((item: any) => {
//       if (item.id == e.id) {
//         newData.push({ ...item, url: undefined, file: undefined });
//       } else {
//         newData.push({ ...item, url: item.url, file: item.file });
//       }
//     });
//     setClassifyValue(newData);
//     setLoading(false);
//   };

//   const handleChangeValue1 = (value: any) => {
//     console.log('first',value)
//     // @ts-ignore
//     const newNameClassify1: any = [];
//     // @ts-ignore
//     value?.map((item: any, index: any) =>
//       newNameClassify1.push({
//         name: item,
//         id: index + 1,
//         values: [],
//         quantity: 0,
//         price: 0,
//         status: false
//       })
//     );
//     setClassifyValue(newNameClassify1);
//   };

//   const handleChangeValue2 = (value: any) => {
//     const newValue: any = [];
//     value?.map((item: any) =>
//       newValue.push({ name: item, quantity: 0, price: 0, status: false })
//     );
//     // @ts-ignore

//     const newNameClassify1: any = [];
//     // @ts-ignore
//     classifyValue?.map((item: any, index: any) =>
//       newNameClassify1.push({
//         name: item.name,
//         id: index + 1,
//         values: newValue,
//       })
//     );
//     setClassifyValue(newNameClassify1);
//   };

//   const saveValue = (e: any) => {
//     console.log(e, '2e3wd')
//     const newData: any = [];
//     e.data.values?.map((item: any) => {
//       if (item.name == e.item.name) {
//         e.select == "price" ? newData.push({
//           name: e.item.name,
//           quantity: e.item.quantity,
//           price: e.value,
//         })
//           :
//           newData.push({
//             name: e.item.name,
//             quantity: e.value,
//             price: e.item.price
//           })
//       } else {
//         newData.push(item);
//       }
//     });
//     for (let i = 0; i < classifyValue.length; i++) {
//       // @ts-ignore
//       if (classifyValue[i].id == e.data.id) {
//         // @ts-ignore
//         classifyValue[i].values = newData;
//       }
//     }
//     setClassifyValue(classifyValue);
//   };
//   const saveNoValue = (item: any) => {
//     for (let i = 0; i < classifyValue.length; i++) {
//       // @ts-ignore
//       if (classifyValue[i].id == item.data.id) {
//         item.select == "price"
//           ? // @ts-ignore
//           (classifyValue[i].price = item.value)
//           : // @ts-ignore
//           (classifyValue[i].quantity = item.value);
//       }
//     }
//     setClassifyValue(classifyValue);
//   };

//   const rejectValue = (e: any) => {
//     const newDataValue: any = []
//     e.data.values?.map((item: any) => {
//       if (item.name == e.item.name) {
//         newDataValue.push({
//           ...item,
//           status: e.status
//         })
//       } else {
//         newDataValue.push(item)
//       }
//     })
//     const newData: any = []
//     classifyValue?.map((item: any) => {
//       if (item.id == e.data.id) {
//         newData.push({
//           ...item,
//           values: newDataValue
//         })
//       } else {
//         newData.push(item)
//       }
//     })
//     setClassifyValue(newData);
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: "40%",
//       // @ts-ignore
//       render: (name, data) => {
//         return (
//           <div className="pro-data">
//             <span
//               style={{
//                 fontSize: data?.values?.length > 0 ? 18 : 16,
//                 color: "red",
//                 fontWeight: "600",
//                 textTransform: "capitalize",
//               }}
//             >
//               {name}
//             </span>
//             {data?.values?.length > 0 && (
//               <div className="pro-data-values">
//                 {data?.values?.map((item: any, index: any) => {
//                   return (
//                     <span
//                       style={{
//                         marginTop: index == 0 ? 0 : 20,
//                         textDecoration:
//                           item.status == true ? "line-through" : "none",
//                         opacity: item.status == true ? 0.3 : 1,
//                       }}
//                     >
//                       {item.name}
//                     </span>
//                   );
//                 })}
//               </div>
//             )}
//             <div></div>
//           </div>
//         );
//       },
//     },
//     {
//       title: "Giá tiền",
//       dataIndex: "id",
//       key: "id",
//       // @ts-ignore
//       render: (id: any, data: any) => {
//         return (
//           <div>
//             {data?.values?.length > 0 ? (
//               data?.values?.map((item: any, index: any) => {
//                 return (
//                   <div style={{ marginTop: index == 0 ? 0 : 10 }}>
//                     <Input
//                       disabled={item.status}
//                       onChange={(e: any) =>
//                         startTransition(() => {
//                           saveValue({
//                             value: e.target.value,
//                             data: data,
//                             item: item,
//                             select: "price",
//                           });
//                         })
//                       }
//                       placeholder="Giá tiền"
//                     />
//                   </div>
//                 );
//               })
//             ) : (
//               <Input
//                 onChange={(e: any) =>
//                   startTransition(() => {
//                     saveNoValue({
//                       value: e.target.value,
//                       data: data,
//                       select: "quantity",
//                     });
//                   })
//                 }
//                 placeholder="Giá tiền"
//               />
//             )}
//           </div>
//         );
//       },
//     },
//     {
//       title: "Số lượng",
//       dataIndex: "id",
//       key: "id",
//       // @ts-ignore
//       render: (id: any, data: any) => (
//         <div>
//           {data?.values?.length > 0 ? (
//             data?.values?.map((item: any, index: any) => {
//               return (
//                 <div style={{ marginTop: index == 0 ? 0 : 10 }}>
//                   <Input
//                     disabled={item.status}
//                     onChange={(e: any) =>
//                       startTransition(() => {
//                         saveValue({
//                           value: e.target.value,
//                           data: data,
//                           item: item,
//                           select: "quantity",
//                         });
//                       })
//                     }
//                     placeholder="Số lượng"
//                   />
//                 </div>
//               );
//             })
//           ) : (
//             <Input
//               onChange={(e: any) =>
//                 startTransition(() => {
//                   saveNoValue({
//                     value: e.target.value,
//                     data: data,
//                     select: "price",
//                   });
//                 })
//               }
//               placeholder="Số lượng"
//             />
//           )}
//         </div>
//       ),
//     },
//     {
//       title: "Trạng thái",
//       dataIndex: "id",
//       key: "id",
//       // @ts-ignore
//       render: (id: any, data: any) => (
//         <div>
//           {data?.values?.length > 0 ? (
//             data?.values?.map((item: any, index: any) => {
//               return (
//                 <div
//                   style={{
//                     marginTop: index == 0 ? 0 : 13,
//                     cursor: "pointer",
//                     fontSize: 18,
//                   }}
//                 >
//                   {item.status == false ? (
//                     <EyeOutlined
//                       onClick={() =>
//                         rejectValue({ item: item, data: data, status: true })
//                       }
//                     />
//                   ) : (
//                     <EyeInvisibleOutlined
//                       onClick={() =>
//                         rejectValue({ item: item, data: data, status: false })
//                       }
//                     />
//                   )}
//                 </div>
//               );
//             })
//           ) : (
//             <EyeOutlined />
//           )}
//         </div>
//       ),
//     },
//   ];

//   const save = async () => {

//     console.log(classifyValue, 'classifyValue')
//     console.log(nameClassify1, 'nameClassify1')
//     console.log(nameClassify2, 'nameClassify2')

//     // setLoading(true)
//     // const linked = Math.random()
//     // const dataImage: any = [dataValue.imageUrlAvatar.file]
//     // // @ts-ignore
//     // classifyValue.map(item => dataImage.push(item.file))
//     // const newDataClass: any = []
//     // classifyValue?.map((item: any) => newDataClass.push({ linked: linked, price: item.price, quantity: item.quantity, values: item.values, name: item.name }))
//     // const product = {
//     //   warehouse: dataValue.warehouse,
//     //   trademark: dataValue.trademark,
//     //   sent_from: dataValue.sent_from,
//     //   origin: dataValue.origin,
//     //   name: dataValue.name,
//     //   description: dataValue.description,
//     //   cate_id: dataValue.cate_id,
//     //   linked: linked,
//     //   name_commodityvalue: nameClassify1,
//     //   name_classification: nameClassify2,
//     //   sale: dataValue.sale,
//     //   user_id: userLoca._id,
//     // }
//     // const formData = new FormData();
//     // // @ts-ignore
//     // formData.append("data", JSON.stringify({ product: product, classifies: newDataClass }))
//     // for (let i = 0; i < dataImage.length; i++) {
//     //   formData.append("files", dataImage[i]);
//     // }
//     // await dispatch(addProduct(formData))
//     // navigator('/admin/products')
//     // setLoading(false)
//   };
//   console.log(classifyValue, "3ewd");
//   return (
//     <div>
//       {loading == true && <Loading />}
//       <div
//         style={{
//           display: comfimShowClassifyValue == true ? "block" : "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         <div
//           className="name-classify"
//           style={{ width: comfimShowClassifyValue == true ? "100%" : "48%" }}
//         >
//           <div
//             className="name-classify1"
//             style={{ width: comfimShowClassifyValue == false ? "100%" : "48%" }}
//           >
//             <span>Tên phân loại 1</span>

//             <Input
//               onChange={(e: any) =>
//                 startTransition(() => setNameClassify1(e.target.value))
//               }
//               placeholder="Tên phân loại 1"
//             />
//           </div>
//           {comfimShowClassifyValue == true && (
//             <div className="name-classify2" style={{ width: "48%" }}>
//               <span>Tên phân loại 2</span>

//               <Input
//                 onChange={(e: any) => setNameClassify2(e.target.value)}
//                 placeholder="Tên phân loại 2"
//               />
//             </div>
//           )}
//         </div>
//         <br />
//         <br />

//         <div
//           className="classify-value"
//           style={{ width: comfimShowClassifyValue == true ? "100%" : "48%" }}
//         >
//           <div
//             className="classify-value1"
//             style={{ width: comfimShowClassifyValue == true ? "48%" : "100%" }}
//           >
//             <span>Giá trị phân loại 1</span>
//             <Select
//               mode="tags"
//               size={"middle"}
//               placeholder="Giá trị phân loại 1"
//               defaultValue={[]}
//               onChange={handleChangeValue1}
//               style={{
//                 width: "100%",
//               }}
//             />
//           </div>
//           {comfimShowClassifyValue == true && (
//             <div className="classify-value2" style={{ width: "48%" }}>
//               <span>Giá trị phân loại 2</span>
//               <Select
//                 mode="tags"
//                 size={"middle"}
//                 placeholder="Giá trị phân loại 2"
//                 defaultValue={[]}
//                 onChange={handleChangeValue2}
//                 style={{
//                   width: "100%",
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//       <Button
//         style={{
//           width: "100%",
//           marginTop: 40,
//           background: "blue",
//           color: "#fff",
//           fontWeight: "500",
//         }}
//         onClick={() => setComfimShowClassifyValue(!comfimShowClassifyValue)}
//       >
//         Thêm phân loại 2
//       </Button>

//       {classifyValue?.length > 0 && (
//         <div style={{ marginTop: 40 }}>
//           <Table
//             columns={columns}
//             dataSource={classifyValue}
//             pagination={false}
//           />
//         </div>
//       )}

//       <br />
//       <br />
//       {classifyValue?.length > 0 && (
//         <div className="add-pro-avatar">
//           <span>Chọn ảnh cho phân loại</span>
//           <div className="select-image">
//             {classifyValue?.map((item: any) => {
//               return (
//                 <div className="avatar">
//                   <Upload
//                     listType="picture-card"
//                     showUploadList={false}
//                     beforeUpload={UploadAvatatr}
//                     className="add-pro-avatar"
//                     // @ts-ignore
//                     onClick={() => setSelectImage(item)}
//                   >
//                     {item.file ? (
//                       <div className="add-pro-box-image">
//                         <img src={item.url} className="add-pro-image" />
//                       </div>
//                     ) : (
//                       <div
//                         style={{
//                           marginTop: 8,
//                         }}
//                       >
//                         {loading == true ? (
//                           <Spin />
//                         ) : (
//                           <PlusCircleOutlined
//                             style={{
//                               fontSize: 30,
//                               opacity: 0.8,
//                               color: "#ee4d2d",
//                             }}
//                           />
//                         )}
//                       </div>
//                     )}
//                   </Upload>
//                   {item.file !== undefined && (
//                     <div
//                       onClick={() => removeImage(item)}
//                       className="add-pro-avatar-close"
//                     >
//                       <CloseCircleOutlined style={{ fontSize: 17 }} />
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       <div className="btn">
//         <Button type="primary" danger onClick={() => callBack()}>
//           Quay lại
//         </Button>
//         <Button
//           style={{ margin: "0 10px" }}
//           onClick={() => navigator("/admin/products")}
//         >
//           Hủy
//         </Button>
//         <Button type="primary" onClick={() => save()}>
//           Hoàn tất
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProInfo;
