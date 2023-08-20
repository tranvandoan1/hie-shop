import {
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Spin, Table, Upload } from "antd";
import { useState, startTransition, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { addProduct } from "./../../../../features/Products";
import Loading from "../../../../components/Loading";
type Props = {
  callBack: () => void;
  dataValue: any;
};
// @ts-ignore
const ProInfo = ({ callBack, dataValue }: Props) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const userLoca = JSON.parse(localStorage.getItem("user"));
  const navigator = useNavigate();
  const [nameClassify1, setNameClassify1] = useState(); //tên pl1
  const [nameClassify2, setNameClassify2] = useState(); //tên pl2
  const [nameClassifyValue1, setNameClassifyValue1] = useState<any>([]); //tên giá trị pl1
  const [nameClassifyValue2, setNameClassifyValue2] = useState<any>([]); //tên giá trị pl2

  const [classifyValue, setClassifyValue] = useState([]); //dữ liệu hoàn tất
  const [selectImage, setSelectImage] = useState<any>();

  const [loading, setLoading] = useState<boolean>(false);

  const [comfimShowClassifyValue, setComfimShowClassifyValue] =
    useState<boolean>(false);

  const UploadAvatatr = (file: any) => {
    setLoading(true);
    const src = URL.createObjectURL(file);
    // setImageUrlAvatar({ url: src, file: file });
    const newData: any = [];
    classifyValue?.map((item: any) => {
      if (item.id == selectImage.id) {
        newData.push({ ...item, url: src, file: file });
      } else {
        newData.push({ ...item, url: item.url, file: item.file });
      }
    });
    console.log(newData, "newData");
    setClassifyValue(newData);
    setLoading(false);
  };
  const removeImage = (e: any) => {
    setLoading(true);
    const newData: any = [];
    classifyValue?.map((item: any) => {
      if (item.id == e.id) {
        newData.push({ ...item, url: undefined, file: undefined });
      } else {
        newData.push({ ...item, url: item.url, file: item.file });
      }
    });
    setClassifyValue(newData);
    setLoading(false);
  };

  console.log(classifyValue, "classifyValue");

  // giá trị phân loại 1
  console.log(nameClassifyValue2, "nameClassifyValue2ngoài");
  const changeValue1 = (values: any) => {
    console.log(values, "có vào nha");
    // @ts-ignore
    const newNameClassify1: any = nameClassifyValue1?.length > 0 ? [...nameClassifyValue1, {
      name: values,
      id: Math.random(),
      quantity: 0,
      price: 0,
      values: [],
      status: false,
    }] : [{
      name: values,
      id: Math.random(),
      quantity: 0,
      price: 0,
      values: [],
      status: false,
    }]
    // );
    console.log(newNameClassify1, 'newNameClassify1')
    setNameClassifyValue1(newNameClassify1);
  };

  // giá trị phân loại 2
  const changeValue2 = (values: any) => {
    const newValue: any = [];
    values?.map((item: any) =>
      newValue.push({ name: item, quantity: 0, price: 0, status: false })
    );
    setNameClassifyValue2(newValue);
  };

  //kết hợp nameClassifyValue1 với nameClassifyValue2
  useEffect(() => {
    const dataClass: any = [];
    nameClassifyValue1?.map((item: any) =>
      dataClass.push({
        name: item.name,
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        values: nameClassifyValue2,
        status: item.status,
      })
    );
    setClassifyValue(dataClass);
  }, [nameClassifyValue1, nameClassifyValue2]);

  const saveValue = (e: any) => {
    console.log(e, "2e3wd");
    const newData: any = [];
    e.data.values?.map((item: any) => {
      if (item.name == e.item.name) {
        if (e.select == "price") {
          newData.push({
            ...item,
            price: e.value,
          });
        } else {
          newData.push({
            ...item,
            quantity: e.value,
          });
        }
      } else {
        newData.push(item);
      }
    });
    console.log(newData, "newDat2131312");
    for (let i = 0; i < classifyValue.length; i++) {
      // @ts-ignore
      if (classifyValue[i].id == e.data.id) {
        console.log(classifyValue[i].values, "classifyValue[i].values");
        // @ts-ignore
        classifyValue[i].values = newData;
      }
    }
    console.log(classifyValue, "classifyValue23132");
    setClassifyValue(classifyValue);
  };

  console.log(classifyValue, "e3wfd");

  // thay đổi giá tiền với trường hợp không có giá trị phân loại 2
  const saveNoValue = (item: any) => {
    for (let i = 0; i < classifyValue.length; i++) {
      // @ts-ignore
      if (classifyValue[i].id == item.data.id) {
        item.select == "price"
          ? // @ts-ignore
          (classifyValue[i].price = item.value)
          : // @ts-ignore
          (classifyValue[i].quantity = item.value);
      }
    }
    setClassifyValue(classifyValue);
  };

  const rejectValue = (e: any) => {
    const newDataValue: any = [];
    e.data.values?.map((item: any) => {
      if (item.name == e.item.name) {
        newDataValue.push({
          ...item,
          status: e.status,
        });
      } else {
        newDataValue.push(item);
      }
    });
    const newData: any = [];
    classifyValue?.map((item: any) => {
      if (item.id == e.data.id) {
        newData.push({
          ...item,
          values: newDataValue,
        });
      } else {
        newData.push(item);
      }
    });
    setClassifyValue(newData);
  };

  // xóa tên phân loại
  const removeValue1 = (e: any) => {
    const newData: any = classifyValue?.filter((item: any) => item.name !== e)
    setClassifyValue(newData)
  }
  console.log(classifyValue, 'classifyValue')

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      // @ts-ignore
      render: (name, data) => {
        return (
          <div className="pro-data">
            <span
              style={{
                fontSize: data?.values?.length > 0 ? 18 : 16,
                color: "red",
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {name}
            </span>
            {data?.values?.length > 0 && (
              <div className="pro-data-values">
                {data?.values?.map((item: any, index: any) => {
                  return (
                    <span
                      style={{
                        marginTop: index == 0 ? 0 : 20,
                        textDecoration:
                          item.status == true ? "line-through" : "none",
                        opacity: item.status == true ? 0.3 : 1,
                      }}
                    >
                      {item.name}
                    </span>
                  );
                })}
              </div>
            )}
            <div></div>
          </div>
        );
      },
    },
    {
      title: "Giá tiền",
      dataIndex: "id",
      key: "id",
      // @ts-ignore
      render: (id: any, data: any) => {
        return (
          <div>
            {data?.values?.length > 0 ? (
              data?.values?.map((item: any, index: any) => {
                return (
                  <div style={{ marginTop: index == 0 ? 0 : 10 }}>
                    <Input
                      disabled={item.status}
                      onChange={(e: any) =>
                        startTransition(() => {
                          saveValue({
                            value: e.target.value,
                            data: data,
                            item: item,
                            select: "price",
                          });
                        })
                      }
                      placeholder="Giá tiền"
                    />
                  </div>
                );
              })
            ) : (
              <Input
                onChange={(e: any) =>
                  startTransition(() => {
                    saveNoValue({
                      value: e.target.value,
                      data: data,
                      select: "price",
                    });
                  })
                }
                placeholder="Giá tiền"
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "id",
      key: "id",
      // @ts-ignore
      render: (id: any, data: any) => (
        <div>
          {data?.values?.length > 0 ? (
            data?.values?.map((item: any, index: any) => {
              return (
                <div style={{ marginTop: index == 0 ? 0 : 10 }}>
                  <Input
                    disabled={item.status}
                    onChange={(e: any) =>
                      startTransition(() => {
                        saveValue({
                          value: e.target.value,
                          data: data,
                          item: item,
                          select: "quantity",
                        });
                      })
                    }
                    placeholder="Số lượng"
                  />
                </div>
              );
            })
          ) : (
            <Input
              onChange={(e: any) =>
                startTransition(() => {
                  saveNoValue({
                    value: e.target.value,
                    data: data,
                    select: "quantity",
                  });
                })
              }
              placeholder="Số lượng"
            />
          )}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "id",
      key: "id",
      // @ts-ignore
      render: (id: any, data: any) => (
        <div>
          {data?.values?.length > 0 ? (
            data?.values?.map((item: any, index: any) => {
              return (
                <div
                  style={{
                    marginTop: index == 0 ? 0 : 13,
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                >
                  {item.status == false ? (
                    <EyeOutlined
                      onClick={() =>
                        rejectValue({ item: item, data: data, status: true })
                      }
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      onClick={() =>
                        rejectValue({ item: item, data: data, status: false })
                      }
                    />
                  )}
                </div>
              );
            })
          ) : (
            <EyeOutlined />
          )}
        </div>
      ),
    },
  ];

  const save = async () => {
    // setLoading(true)

    const newData: any = [];

    classifyValue?.map((item: any) => {
      const data = item.values.filter(
        (itemValue: any) => itemValue.status !== true
      );
      newData.push({
        ...item,
        values: data,
      });
    });
    console.log(newData, "newData");
    // const linked = Math.random()
    // const dataImage: any = [dataValue.imageUrlAvatar.file]
    // // @ts-ignore
    // classifyValue.map(item => dataImage.push(item.file))

    // const newDataClass: any = []
    // classifyValue?.map((item: any) => newDataClass.push({ linked: linked, price: item.price, quantity: item.quantity, values: item.values, name: item.name }))
    // const product = {
    //   warehouse: dataValue.warehouse,
    //   trademark: dataValue.trademark,
    //   sent_from: dataValue.sent_from,
    //   origin: dataValue.origin,
    //   name: dataValue.name,
    //   description: dataValue.description,
    //   cate_id: dataValue.cate_id,
    //   linked: linked,
    //   name_commodityvalue: nameClassify1,
    //   name_classification: nameClassify2,
    //   sale: dataValue.sale,
    //   user_id: userLoca._id,
    // }
    // const formData = new FormData();
    // // @ts-ignore
    // formData.append("data", JSON.stringify({ product: product, classifies: newDataClass }))
    // for (let i = 0; i < dataImage.length; i++) {
    //   formData.append("files", dataImage[i]);
    // }
    // await dispatch(addProduct(formData))
    // navigator('/admin/products')
    // setLoading(false)
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          marginBottom: 49,
        }}
      >
        <span style={{ width: "10%" }} className="pro-pl2">
          Phân loại 2
        </span>
        <Button
          style={{
            marginTop: 10,
            background: comfimShowClassifyValue == true ? "red" : "blue",
            color: "#fff",
            fontWeight: "500",
          }}
          onClick={() => setComfimShowClassifyValue(!comfimShowClassifyValue)}
        >
          {comfimShowClassifyValue == true
            ? "Hủy phân loại 2"
            : "Thêm phân loại 2"}
        </Button>
      </div>
      {loading == true && <Loading />}

      <div className="pro-info-add">
        <div className="name-classify" style={{ width: "100%" }}>
          <div className="name-classify1" style={{ width: "100%" }}>
            <span>Tên phân loại 1</span>
            <Input
              onChange={(e: any) =>
                startTransition(() => setNameClassify1(e.target.value))
              }
              placeholder="Tên phân loại 1"
            />
          </div>
          <br />
          <div className="classify-value1" style={{ width: "100%" }}>
            <span>Giá trị phân loại 1</span>
            <Select
              mode="tags"
              size={"middle"}
              placeholder="Giá trị phân loại 1"
              defaultValue={[]}
              // onChange={changeValue1}
              style={{
                width: "100%",
              }}
              filterOption={false}
              onDeselect={(e) => removeValue1(e)}
              onSelect={(e) => changeValue1(e)}

            />
          </div>
        </div>
        {comfimShowClassifyValue == true && (
          <div
            className="classify-value"
            style={{ width: comfimShowClassifyValue == true ? "100%" : "48%" }}
          >
            <div className="name-classify2" style={{ width: "100%" }}>
              <span>Tên phân loại 2</span>

              <Input
                onChange={(e: any) => setNameClassify2(e.target.value)}
                placeholder="Tên phân loại 2"
              />
            </div>
            <br />
            <div className="classify-value2" style={{ width: "100%" }}>
              <span>Giá trị phân loại 2</span>
              <Select
                mode="tags"
                size={"middle"}
                placeholder="Giá trị phân loại 2"
                defaultValue={[]}
                onChange={changeValue2}
                style={{
                  width: "100%",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {nameClassifyValue1?.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <Table
            columns={columns}
            dataSource={classifyValue}
            pagination={false}
          />
        </div>
      )}

      <br />
      <br />
      {classifyValue?.length > 0 && (
        <div className="add-pro-avatar">
          <span>Chọn ảnh cho phân loại</span>
          <div className="select-image">
            {classifyValue?.map((item: any) => {
              return (
                <div className="avatar">
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={UploadAvatatr}
                    className="add-pro-avatar"
                    // @ts-ignore
                    onClick={() => setSelectImage(item)}
                  >
                    {item.file ? (
                      <div className="add-pro-box-image">
                        <img src={item.url} className="add-pro-image" />
                      </div>
                    ) : (
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
                    )}
                  </Upload>
                  {item.file !== undefined && (
                    <div
                      onClick={() => removeImage(item)}
                      className="add-pro-avatar-close"
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="btn">
        <Button type="primary" danger onClick={() => callBack()}>
          Quay lại
        </Button>
        <Button
          style={{ margin: "0 10px" }}
          onClick={() => navigator("/admin/products")}
        >
          Hủy
        </Button>
        <Button type="primary" onClick={() => save()}>
          Hoàn tất
        </Button>
      </div>
    </div>
  );
};

export default ProInfo;
// import { Select } from 'antd';

// const { Option } = Select;

// function handleDeselect(value, option) {
//   // Kiểm tra value có phải là một tag hay không
//   if (option.tag) {
//     console.log('Xóa tag:', value);
//     // Do something
//   }
// }

// function handleSearch(value) {
//   console.log('Giá trị input:', value);
//   // Do something
// }

// function Example() {
//   return (
//     <Select
//       mode="tags"
//       onDeselect={handleDeselect}
//       filterOption={false}
//       onSearch={handleSearch}
//     >
//       <Option key="tag-1" tag>Tag 1</Option>
//       <Option key="tag-2" tag>Tag 2</Option>
//       <Option key="tag-3" tag>Tag 3</Option>
//     </Select>
//   );
// }
