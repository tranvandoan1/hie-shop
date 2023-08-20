import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './product.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { getProductAll } from '../../../features/Products'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// @ts-ignore
import { getCateAll } from './../../../features/CateSlice';
// @ts-ignore
import { getAllClassifies } from './../../../features/Classifies';
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}


const Products: React.FC = () => {
  const dispatch = useDispatch()
  const navigater = useNavigate()
  const products = useSelector((data: any) => data.products)

  const categories = useSelector((data: any) => data.categories);
  const classifies = useSelector((data: any) => data.classifies);
  const [dataDeletePro, setDataDeletePro] = useState();
  const categoriesValue = categories?.value?.data
  console.log(classifies, 'classifies')

  const dataProducts = products?.value?.data?.map((item: any) => {
    return { ...item, key: item?._id };
  });
  const dataProducts1: any = []
  // products?.value?.data?.map((item: any) => {
  //   classifies?.value?.map((itemClas: any) => {
  //     if (item.linked == itemClas.linked) {
  //       dataProducts1.push({ ...item, key: item?._id,values:[itemClas.values] })
  //     }
  //   })
  // });
  console.log(dataProducts1, 'dataProducts1')
  useEffect(() => {
    dispatch(getProductAll())
    dispatch(getCateAll());
    dispatch(getAllClassifies());
  }, [])
  const [textPro, setTextPro] = useState({ status: false, id: null });


  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'cate_id',
      // @ts-ignore
      render: (cate_id: any) => {
        categoriesValue?.map((item: any) => {
          if (item._id == cate_id) {
            return <span style={{ fontSize: 18 }}>{item.name}</span>
          }
        })
      },

    },
    {
      title: "Ảnh",
      key: "photo",
      dataIndex: "photo",
      render: (photo) => (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <div className={"categori-logo"}>
            <img src={photo} alt="" />
          </div>
        </div>

      ),
    },
    {
      title: 'Giảm giá',
      dataIndex: 'sale',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: "Thao tác",
      key: "data._id",
      render: (_id) => (
        <div>
          <Space size="middle" style={{ marginRight: 10, cursor: 'pointer' }} >
            <EditOutlined />
          </Space>
          <Space size="middle" style={{ cursor: 'pointer' }}>
            <a>
              <DeleteOutlined />
            </a>
          </Space>
        </div>
      ),
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setTextPro({ status: false, id: null });
      setDataDeletePro(selectedRowKeys);
    },
  };
  const handleExpand = (expanded: any) => {
    if (expanded) {
      setTextPro(
        { status: false, id: null }
      )
    } else {
      setTextPro(
        { status: false, id: null }
      )
    }
  }
  return (
    <div>
      <div className='admin-product'>
        <h4>Sản phẩm</h4>
        <Button onClick={() => navigater('add')}>Thêm sản phẩm</Button>
      </div>
      <hr />

      <div className='admin-product-table'>

        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          expandable={{
            expandedRowRender: (record: any) => {
              return (
                // @ts-ignore
                <div key={record} className={"table-product"}>
                  <Descriptions>
                    {categoriesValue?.map((item: any) => {
                      if (item._id == record.cate_id) {
                        return (
                          <Descriptions.Item
                            label={
                              <span style={{ fontSize: 15 }}>Danh mục</span>
                            }
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 14,
                              }}
                            >
                              {item.name}
                            </p>
                          </Descriptions.Item>
                        );
                      }
                    })}

                    {record?.view && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Lượt xem</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.view}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.name_classification && (
                      <Descriptions.Item
                        label={
                          <span style={{ fontSize: 15 }}>Tên phân loại</span>
                        }
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.name_classification}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.name_commodityvalue && (
                      <Descriptions.Item
                        label={
                          <span style={{ fontSize: 15 }}>
                            {<span style={{ fontSize: 15 }}>Lượt xem</span>}
                          </span>
                        }
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.name_commodityvalue}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.linked && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Kho hàng</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.warehouse}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.origin && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Nguồn gốc</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.origin}
                        </p>
                      </Descriptions.Item>
                    )}

                    {record?.sent_from && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Gửi từ</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.sent_from}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.trademark && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Nhãn hiệu</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.trademark}
                        </p>
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                  <div className={"pro-detail"}>
                    <p style={{ fontSize: 15 }}>Chi tiết sản phẩm</p>
                    <p
                      style={{ width: "100%", fontSize: 14 }}
                      dangerouslySetInnerHTML={{
                        __html:
                          textPro.id == record._id
                            ?
                            record?.description
                            : record?.description.substring(
                              0,
                              String(record?.description).length /
                              10
                            ) + "...",
                      }}
                    />
                    <Button
                      type="primary"
                      onClick={() =>
                        setTextPro(
                          textPro.id == record._id
                            ? { status: false, id: null }
                            : { status: true, id: record._id }
                        )
                      }
                    >
                      {textPro.id !== record._id ? "Xem thêm" : "Rút gọn"}
                    </Button>
                  </div>
                </div>
              );
            },

            onExpand: handleExpand,//ấn hiện chi tiết
          }}
          columns={columns}
          dataSource={dataProducts}
        />
      </div>
    </div>
  );
};

export default Products;
//  import {
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
//   const [nameClassifyValue1, setNameClassifyValue1] = useState<any>([]); //tên giá trị pl1
//   const [nameClassifyValue2, setNameClassifyValue2] = useState<any>([]); //tên giá trị pl2

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


//   console.log(nameClassifyValue1, 'nameClassifyValue1')
//   const [value1, setValue1] = useState<any>([])
//   const handleChangeValue = (values: any) => {
//     setNameClassifyValue1(values)

//   }
//   const handleChangeValue1 = (value: any) => {
//     if (classifyValue?.length > 0) {
//  // @ts-ignore
//       const newNameClassify1: any = [];
//       // @ts-ignore
//       newNameClassify1.push({
//         name: value,
//         id: value + 1,
//         values: [],
//         quantity: 0,
//         price: 0,
//         status: false
//       })
//       setClassifyValue(newNameClassify1);
//     } else {
//       // @ts-ignore
//       const newNameClassify1: any = [];
//       // @ts-ignore
//       newNameClassify1.push({
//         name: value,
//         id: value + 1,
//         values: [],
//         quantity: 0,
//         price: 0,
//         status: false
//       })
//       setClassifyValue(newNameClassify1);
//     }
//   };
//   console.log(classifyValue, 'classifyValue')
//   const removeValue1 = (e: any) => {

//   }



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
//               defaultValue={nameClassifyValue1}
//               onChange={handleChangeValue}
//               style={{
//                 width: "100%",
//               }}
//               onSelect={(e) => handleChangeValue1(e)}
//               onDeselect={(e) => removeValue1(e)}
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
