import {
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Spin, Table, Upload, message } from "antd";
import { startTransition, useReducer } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { addProduct } from "./../../../../features/Products";
import Loading from "../../../../components/Loading";
import { useDispatch } from "react-redux";
// @ts-ignore
import { getDataUserLoca } from './../../../../app/getDataLoca';
type Props = {
  callBack: (e: any) => void;
  dataValue: any;
  stateValue: any;
};
type State = {
  nameClassify1: any;
  nameClassify2: any;

  classifyValue1: any;
  classifyValue2: any;
  classifyValue: any;
  selectImage: any;
  loading: boolean;
  comfimShowClassifyValue: boolean;
};
// @ts-ignore
const ProInfo = ({ callBack, dataValue, stateValue }: Props) => {
  const dispatch = useDispatch();
  //lấy data user từ loca
  // @ts-ignore

  const navigator = useNavigate();
  const [state, setState] = useReducer(
    (state: State, newState: Partial<State>) => ({
      ...state,
      ...newState,
    }),
    {
      nameClassify1:
        stateValue?.nameClassify1 == undefined
          ? undefined
          : stateValue?.nameClassify1, //tên pl1
      nameClassify2:
        stateValue?.nameClassify2 == undefined
          ? undefined
          : stateValue?.nameClassify2, //tên pl2

      classifyValue1:
        stateValue?.classifyValue1 == undefined ||
          stateValue?.classifyValue1?.length <= 0
          ? []
          : stateValue?.classifyValue1, //gía trị phân loại 1
      classifyValue2:
        stateValue?.classifyValue2 == undefined ||
          stateValue?.classifyValue2?.length <= 0
          ? []
          : stateValue?.classifyValue2, //giá trị phân loại 2

      classifyValue:
        stateValue?.classifyValue == undefined ||
          stateValue?.classifyValue?.length <= 0
          ? []
          : stateValue?.classifyValue, //dữ liệu hoàn tất

      selectImage:
        stateValue?.selectImage == undefined
          ? undefined
          : stateValue?.selectImage, //chọn ảnh cho từng phân loại

      loading: false,

      comfimShowClassifyValue: false,
    }
  );


  const addNameValue1 = (values: any) => {
    setState({ classifyValue1: values });
  };

  const addNameValue2 = (values: any) => {
    const newData: any = [];
    values.map((item: any) =>
      newData.push({
        name: item,
        id: Math.random(),
        quantity: 0,
        price: 0,
        status: false,
      })
    );
    setState({ classifyValue2: newData });
  };
  // thêm ảnh phân loại
  const UploadAvatatr = (file: any) => {
    setState({ loading: true });

    const src = URL.createObjectURL(file);
    const newData: any = [];
    state?.classifyValue?.map((item: any) => {
      if (item.id == state?.selectImage.id) {
        newData.push({ ...item, url: src, file: file });
      } else {
        newData.push({ ...item, url: item.url, file: item.file });
      }
    });
    setState({ classifyValue: newData, loading: false });
  };

  // xóa ảnh phân loại
  const removeImage = (e: any) => {
    setState({ loading: true });
    const newData: any = [];
    state?.classifyValue?.map((item: any) => {
      if (item.id == e.id) {
        newData.push({ ...item, url: undefined, file: undefined });
      } else {
        newData.push({ ...item, url: item.url, file: item.file });
      }
    });
    setState({ classifyValue: newData, loading: false });
  };

  // giá trị phân loại 1
  const changeValue1 = (value: any) => {
    if (state?.classifyValue?.length > 0) {
      const valueDuplicate: any = state?.classifyValue?.find(
        (item: any) => item.name == value
      );
      const newValue: any = state?.classifyValue?.find(
        (item: any) => item.name !== value
      );

      if (valueDuplicate == undefined) {
        const newNameClassify1: any = [
          ...state?.classifyValue,
          {
            name: value,
            id: Math.random(),
            quantity: 0,
            price: 0,
            values:
              state?.classifyValue2?.length > 0 ? state?.classifyValue2 : [],
            status: false,
          },
        ];
        setState({ classifyValue: newNameClassify1 });
      } else {
        message.warning("Tên đã được dùng !");
        const newNameClassify1: any = [
          ...newValue,
          {
            name: value,
            id: Math.random(),
            quantity: 0,
            price: 0,
            values:
              state?.classifyValue2?.length > 0 ? state?.classifyValue2 : [],
            status: false,
          },
        ];
        setState({ classifyValue: newNameClassify1 });
      }
    } else {
      const newNameClassify1: any = [
        {
          name: value,
          id: Math.random(),
          quantity: 0,
          price: 0,
          values: [],
          status: false,
        },
      ];
      setState({ classifyValue: newNameClassify1 });
    }
  };

  // giá trị phân loại 2
  const changeValue2 = (value: any) => {
    const checkDuplicateName = (data: any, name: any) => {
      return data.some((item: any) =>
        item.values.some((value: any) => value.name == name)
      );
    };
    if (checkDuplicateName(state?.classifyValue, value) == true) {
      message.warning("Tên đã được dùng !");
    } else {
      const newData: any = [];

      state?.classifyValue.map((item: any) => {
        newData.push({
          ...item,
          values: [
            ...item.values,
            {
              name: value,
              id: Math.random(),
              quantity: 0,
              price: 0,
              status: false,
            },
          ],
        });
      });
      setState({ classifyValue: newData });
    }
  };

  // thêm giá tền với số lượng đối với tường hợp có giá trị phân loại 2
  const saveValue = (e: any) => {
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
    for (let i = 0; i < state?.classifyValue.length; i++) {
      // @ts-ignore
      if (state.classifyValue[i].id == e.data.id) {
        // @ts-ignore
        state.classifyValue[i].values = newData;
      }
    }
    setState({ classifyValue: state?.classifyValue });
  };
  // thay đổi giá tiền với trường hợp không có giá trị phân loại 2
  const saveNoValue = (item: any) => {
    for (let i = 0; i < state?.classifyValue.length; i++) {
      // @ts-ignore
      if (state.classifyValue[i].id == item.data.id) {
        item.select == "price"
          ? // @ts-ignore
          (state.classifyValue[i].price = item.value)
          : // @ts-ignore
          (state.classifyValue[i].quantity = item.value);
      }
    }
    setState({ classifyValue: state?.classifyValue });
  };

  // loại bỏ giá trị phân loại của phân loại nếu không muốn có
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
    state?.classifyValue?.map((item: any) => {
      if (item.id == e.data.id) {
        newData.push({
          ...item,
          values: newDataValue,
        });
      } else {
        newData.push(item);
      }
    });
    setState({ classifyValue: newData });
  };

  // xóa tên phân loại1
  const removeValue1 = (e: any) => {
    const newData: any = state?.classifyValue?.filter(
      (item: any) => item.name !== e
    );

    setState({
      classifyValue: newData,
    });
  };
  // xóa tên phân loại2
  const removeValue2 = (e: any) => {
    const newData: any = [];
    state?.classifyValue?.map((item: any) => {
      const newValue = item.values?.filter(
        (itemValue: any) => itemValue.name !== e
      );
      newData.push({ ...item, values: newValue });
    });


    setState({
      classifyValue: newData,
    });
  };

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
                      defaultValue={item?.price == 0 ? "" : item.price}
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
                defaultValue={data?.quantity == 0 ? "" : data.quantity}
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
                    defaultValue={item?.quantity == 0 ? "" : item.quantity}
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
              defaultValue={data?.quantity == 0 ? "" : data.quantity}
              placeholder="Số lượng"
            />
          )}
        </div>
      ),
    },
  ];
  (state?.nameClassify2 !== undefined || state?.nameClassify2?.length > 0) &&
    columns.push({
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
    });


  // loại bỏ phân loại 2
  const removeClass2 = () => {
    setState({
      comfimShowClassifyValue: !state?.comfimShowClassifyValue,
      classifyValue2: [],
      nameClassify2: undefined,
    });
    const newData: any = [];
    state?.classifyValue?.map((item: any) =>
      newData.push({ ...item, values: [] })
    );
    setState({
      classifyValue: newData,
    });
  };
  // thêm sản phẩm
  const save = async () => {
    const newDataImage: any = state?.classifyValue?.filter(
      (item: any) => item.file !== undefined
    );
    if (newDataImage?.length < state?.classifyValue?.length) {
      message.warning("Chưa nhập hết ảnh phân loại !");
    } else {
      setState({ loading: true });
      const newData: any = [];
      state?.classifyValue?.map((item: any) => {
        const data = item.values.filter(
          (itemValue: any) => itemValue.status !== true
        );
        newData.push({
          ...item,
          values: data,
        });
      });
      const linked = Math.random();
      const dataImage: any = [dataValue.imageUrlAvatar.file];
      // @ts-ignore
      state?.classifyValue.map((item) => dataImage.push(item.file));

      const newDataClass: any = [];
      newData?.map((item: any) =>
        newDataClass.push({
          linked: linked,
          price: item.price,
          quantity: item.quantity,
          values: item.values,
          name: item.name,
        })
      );
      const product = {
        // warehouse: dataValue.warehouse,
        // trademark: dataValue.trademark,
        // sent_from: dataValue.sent_from,
        // origin: dataValue.origin,
        name: dataValue.name,
        description: dataValue.description,
        cate_id: dataValue.cate_id,
        linked: linked,
        name_commodityvalue: state?.nameClassify2,
        name_classification: state?.nameClassify1,
        sale: dataValue.sale,
        code_shop: getDataUserLoca().code,
        valueClassify: JSON.stringify(state?.classifyValue2),
      };
      const formData = new FormData();
      // @ts-ignore
      formData.append(
        "data",
        JSON.stringify({ product: product, classifies: newDataClass })
      );
      for (let i = 0; i < dataImage.length; i++) {
        formData.append("files", dataImage[i]);
      }
      await dispatch(addProduct(formData));
      navigator("/admin/products");
      setState({ loading: false });
    }
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
            background: state?.comfimShowClassifyValue == true ? "red" : "blue",
            color: "#fff",
            fontWeight: "500",
          }}
          onClick={() => removeClass2()}
        >
          {state?.comfimShowClassifyValue == true
            ? "Hủy phân loại 2"
            : "Thêm phân loại 2"}
        </Button>
      </div>
      {state?.loading == true && <Loading />}

      <div className="pro-info-add">
        <div className="name-classify" style={{ width: "100%" }}>
          <div className="name-classify1" style={{ width: "100%" }}>
            <span>Tên phân loại 1</span>
            <Input
              onChange={(e: any) =>
                startTransition(() =>
                  setState({ nameClassify1: e.target.value })
                )
              }
              defaultValue={state?.nameClassify1}
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
              defaultValue={state?.classifyValue1}
              // onChange={changeValue1}
              style={{
                width: "100%",
              }}
              onDeselect={(e) => removeValue1(e)}
              onSelect={(e) => changeValue1(e)}
              onChange={addNameValue1}
            />
          </div>
        </div>
        {state?.comfimShowClassifyValue == true && (
          <div
            className="classify-value"
            style={{
              width: state?.comfimShowClassifyValue == true ? "100%" : "48%",
            }}
          >
            <div className="name-classify2" style={{ width: "100%" }}>
              <span>Tên phân loại 2</span>

              <Input
                onChange={(e: any) =>
                  setState({ nameClassify2: e.target.value })
                }
                defaultValue={state?.nameClassify2}
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
                onDeselect={(e) => removeValue2(e)}
                onSelect={(e) => changeValue2(e)}
                onChange={addNameValue2}
                style={{
                  width: "100%",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {state?.classifyValue?.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <Table
            columns={columns}
            dataSource={state?.classifyValue}
            pagination={false}
          />
        </div>
      )}

      <br />
      <br />
      {state?.classifyValue?.length > 0 && (
        <div className="add-pro-avatar">
          <span>Chọn ảnh cho phân loại</span>
          <div className="select-image">
            {state?.classifyValue?.map((item: any) => {
              return (
                <div className="avatar">
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={UploadAvatatr}
                    className="add-pro-avatar"
                    // @ts-ignore
                    onClick={() => setState({ selectImage: item })}
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
                        {state?.loading == true ? (
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
        <Button type="primary" danger onClick={() => callBack(state)}>
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
