import { useEffect, useState } from "react";
import "./css.css";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import {
  CloseCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// @ts-ignore
import {
  addInfoUser,
  uploadUserAdress,
  removeInfoUser,
  uploadUserInfoAdress,
  // @ts-ignore
} from "../../../features/InfoUserSlice";
import Comfim from "../../../components/Comfim";
import Loading from "../../../components/Loading";
  // @ts-ignore
import { getDataUserLoca } from '../../../app/getDataLoca';


const ShowAddAddress = ({ isModalOpen, setIsModalOpen, infoUsers }) => {
  // @ts-ignore
  const dispatch = useDispatch();


  const [uploadAdress, setUploadAdres] = useState({
    status: false,
    data: undefined,
    close: true,
  }); //upload địa chỉ
  const [dataUrlCity, setDataUrlCity] = useState();
  const [city, setCity] = useState(); //thành phố
  const [district, setDistrict] = useState(); //huyện
  const [ward, setWard] = useState(); //xá
  const [showTags, setShowTags] = useState(1); //hiện thành phố huyện xã từ api
  const [specificAddress, setSpecificAddress] = useState(); //địa chỉ cụ thể
  const [comfimDelete, setComfimDelete] = useState({
    status: false,
    _id: undefined,
  }); //xóa địa chỉ
  const [addAdress, setAddAdress] = useState<boolean>(false); //thêm địa chỉ

  const [loading, setLoading] = useState<boolean>(false); //thêm địa chỉ
  console.log(city, district, "uploadAdress");

  const [showAddAddress, setShowAddAddress] = useState(false);

  useEffect(() => {
    const UrlProvinces = "https://provinces.open-api.vn/api/?depth=3";
    fetch(UrlProvinces)
      .then((response) => response.json())
      .then((data) => setDataUrlCity(data));
  }, []);
  const onFinish = async (values) => {
    function isPhoneNumber(input) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(input);
    }
    if (city == undefined || district == undefined || ward == undefined) {
      message.warning("Thiếu thông tin !");
    } else if (
      isPhoneNumber(
        values.phone == undefined ? uploadAdress?.data?.phone : values.phone
      ) == false
    ) {
      message.warning("Số điện thoại không đúng định dạng !");
    } else {
      setLoading(true);
      const newData_InfoUser = {
        name: values.name == undefined ? uploadAdress?.data?.name : values.name,
        phone:
          values.phone == undefined ? uploadAdress?.data?.phone : values.phone,
        user_id: getDataUserLoca()._id,
        city: city?.name ? city.name : "",
        district: district?.name ? district.name : "",
        ward: ward?.name ? ward.name : "",
        address:
          values.specific_address == undefined
            ? uploadAdress?.data?.address
            : values.specific_address,
        status:
          uploadAdress?.status == true
            ? uploadAdress?.data.status
            : infoUsers?.length <= 0
              ? true
              : false,
      };
      if (uploadAdress?.status == true) {
        await dispatch(
          uploadUserInfoAdress({
            _id: uploadAdress?.data?._id,
            data: newData_InfoUser,
          })
        );
        setUploadAdres({ status: false, data: undefined, close: false })
      } else {
        await dispatch(addInfoUser(newData_InfoUser));
        // @ts-ignore
        setIsModalOpen(false);
        setAddAdress(false);
      }
    }
    setSpecificAddress(undefined)
    setWard(undefined)
    setDistrict(undefined)
    setCity(undefined)
    setLoading(false);
  };

  // @ts-ignore
  const onFinishFailed = async (values) => {
    if (city == undefined || district == undefined || ward == undefined) {
      message.warning("Chưa nhập địa chỉ !");
    } else if (
      specificAddress == undefined ||
      String(specificAddress).length <= 0
    ) {
      message.warning("Chưa nhập địa chỉ cụ thể !");
    }
  };
  const handleOk = () => {
        // @ts-ignore
    setIsModalOpen(false);
  };
  const handleCancel = () => {
        // @ts-ignore
    setIsModalOpen(false);
  };

  // thay đổi địa chỉ mặc định
  const onChange = async (e) => {
    setLoading(true);
    const newData = infoUsers?.find((item) => item.status == true);
    await dispatch(
      uploadUserAdress({ _idInfoFalse: newData._id, _idInfoTrue: e._id })
    );
    setLoading(false);
  };

  // xóa địa chỉ
  const removeAdressUser = async () => {
    setLoading(true);
    setComfimDelete({ status: false, _id: undefined });
    await dispatch(removeInfoUser({ _id: comfimDelete?._id }));
    setLoading(false);
  };
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      width={600}
    >
      {loading == true && <Loading />}
      {/* nếu mà upload có trước thì ưu tiên upload */}
      {(
        uploadAdress?.status == false
          ? addAdress == false
          : uploadAdress == false
      ) ? (
        <div>
          <div style={{ display: "flex" }}>
            <h5 style={{ color: "red" }}>Địa chỉ</h5>
            <PlusOutlined
              style={{
                cursor: "pointer",
                color: "blue",
                width: "13%",
                marginTop: 5,
              }}
              onClick={() => setAddAdress(true)}
            />
          </div>
          <hr />
          <span>
            {infoUsers?.length <= 0
              ? "Chưa có"
              : infoUsers?.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 30,
                    alignItems: "flex-start",
                  }}
                >
                  <Checkbox
                    onChange={() => onChange(item)}
                    checked={item.status}
                  />
                  <span
                    style={{
                      fontSize: 15,
                      width: "70%",
                      textAlign: "left",
                    }}
                  >
                    {`${String(item?.address).length > 0
                        ? `${item?.address},`
                        : ""
                      } ${item?.ward}, ${item?.district}, ${item?.city}`}
                  </span>
                  {item.status == false ? (
                    <div
                      style={{
                        width: "20%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <EditOutlined
                        onClick={() => {
                          setUploadAdres({
                            status: true,
                            data: item,
                            close: true,
                          });
                          setCity({ name: item.city });
                          setDistrict({ name: item.district });
                          setWard({ name: item.ward });
                          setSpecificAddress(item.address);
                        }}
                        className="add-adress-icon-upload"
                        style={{ marginRight: 30 }}
                      />
                      <DeleteOutlined
                        onClick={() =>
                          setComfimDelete({ status: true, _id: item._id })
                        }
                        className="add-adress-icon-upload"
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "20%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <EditOutlined
                        onClick={() => {
                          setUploadAdres({
                            status: true,
                            data: item,
                            close: true,
                          });
                          setCity({ name: item.city });
                          setDistrict({ name: item.district });
                          setWard({ name: item.ward });
                          setSpecificAddress(item.address);
                        }}
                        className="add-adress-icon-upload"
                      />
                      <span
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          fontWeight: "500",
                        }}
                      >
                        Mặc định
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </span>
        </div>
      ) : (
        <div className="form__header">
          <div className="shopee-popup-form__title">
            {uploadAdress?.status == true ? "Sửa địa chỉ" : "Địa chỉ mới"}
          </div>
          <div className="shopee-popup-form__main">
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Item
                  style={{ width: "100%", marginRight: 20 }}
                  name="name"
                  rules={[
                    {
                      required: uploadAdress?.status == true ? false : true,
                      message: "Chưa nhập tên !",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    defaultValue={uploadAdress?.data?.name}
                    placeholder="Họ và Tên"
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: uploadAdress?.status == true ? false : true,
                      message: "Vui lòng nhập số điện thoại !",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    defaultValue={uploadAdress?.data?.phone}
                    placeholder="Số điện thoại"
                  />
                </Form.Item>
              </div>

              <div className="shop_address">
                <Input
                  placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                  onFocus={() => setShowAddAddress(true)}
                  style={{
                    margin: "10px 0 20px 0",
                    borderRadius: 5,
                  }}
                  suffix={
                    <span style={{ marginTop: -6 }}>
                      {(city !== undefined || uploadAdress?.close == true) && (
                        <CloseCircleOutlined
                          onClick={() => (
                            setCity(undefined),
                            setDistrict(undefined),
                            setWard(undefined),
                            setUploadAdres({
                              status: true,
                              data: uploadAdress.data,
                              close: false,
                            })
                          )}
                          style={{
                            marginRight: 10,
                            cursor: "pointer",
                            color: "red",
                          }}
                        />
                      )}
                    </span>
                  }
                  addonAfter={
                    <DownOutlined
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowAddAddress(!showAddAddress);
                        setCity(undefined);
                        setDistrict(undefined);
                        setWard(undefined);
                      }}
                    />
                  }
                  value={`${city?.name ? `${city?.name},` : ""} ${district?.name ? `${district?.name},` : ""
                    } ${ward?.name ? `${ward?.name}` : ""}`}
                />

                {showAddAddress == true && (
                  <div className="city-district-ward">
                    <div className="city-district-ward_header">
                      <ul>
                        <li
                          onClick={() => (
                            setShowTags(1),
                            setCity(undefined),
                            setDistrict(undefined),
                            setWard(undefined)
                          )}
                          // @ts-ignore
                          className={
                            (city == undefined || showTags == 1) &&
                            "active-city-district-ward"
                          }
                        >
                          <div className="city-name">Tỉnh/Thành Phố</div>
                        </li>
                        <li
                          onClick={() =>
                            district == undefined && city !== undefined
                              ? (setShowTags(2),
                                setDistrict(undefined),
                                setWard(undefined))
                              : district !== undefined &&
                              city !== undefined &&
                              (setShowTags(2),
                                setDistrict(undefined),
                                setWard(undefined))
                          }
                          // @ts-ignore
                          className={
                            city == undefined || showTags == 1
                              ? "no-active"
                              : (district == undefined || showTags == 2) &&
                              "active-city-district-ward"
                          }
                        >
                          <div className="district-name">Quận/Huyện</div>
                        </li>
                        <li
                          onClick={() => setShowTags(3)}
                          // @ts-ignore
                          className={
                            district == undefined
                              ? "no-active"
                              : (ward == undefined || showTags == 3) &&
                              "active-city-district-ward"
                          }
                        >
                          <div className="ward-name">Phường/Xã</div>
                        </li>
                      </ul>
                    </div>
                    <div className="city-district-ward_show">
                      <ul>
                        <li className={"active-city-district-ward_show"}>
                          <div className="city-show">
                            {(city == undefined || showTags == 1
                              ? dataUrlCity
                              : district == undefined || showTags == 2
                                ? city?.districts
                                : ward == undefined || showTags == 3
                                  ? district?.wards
                                  : ""
                            )?.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() =>
                                    city == undefined || showTags == 1
                                      ? (setCity(item), setShowTags(2))
                                      : district == undefined || showTags == 2
                                        ? (setDistrict(item), setShowTags(3))
                                        : (ward == undefined || showTags == 3) &&
                                        (setWard(item),
                                          setShowAddAddress(!showAddAddress))
                                  }
                                  style={{
                                    margin:
                                      index >= 1 ? "10px 0" : "0 10px 0 0",
                                    padding: "5px 0",
                                    cursor: "pointer",
                                  }}
                                >
                                  {item.name}
                                </li>
                              );
                            })}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <Form.Item
                name="specific_address"
                rules={[
                  {
                    required: uploadAdress?.status == true ? false : true,
                    message: "Vui lòng nhập địa chỉ cụ thể !",
                  },
                ]}
              >
                <div
                  className="shop_specific-address"
                  style={{ marginTop: 10 }}
                >
                  <Input
                    type="text"
                    placeholder="Địa chỉ cụ thể"
                    defaultValue={specificAddress}
                    // onChange={(e) => {
                    //   setCheckOnChangeAddress({
                    //     check1: checkOnChangeAddress?.data1,
                    //     check2: false,
                    //   });
                    //   setSpecificAddress(e.target.value);
                    // }}
                    style={{ marginBottom: 10 }}
                  />
                </div>
              </Form.Item>

              <Form.Item>
                <div className="shopee-popup-form__footer">
                  <Button
                    onClick={() => {
                      uploadAdress?.status == false
                        ? setAddAdress(false)
                        : setUploadAdres({
                          status: false,
                          data: undefined,
                          close: false,
                        }),
                        setCity(undefined),
                        setDistrict(undefined),
                        setWard(undefined);
                    }}
                    style={{ marginRight: 10 }}
                  >
                    Trở Lại
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Hoàn thành
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
      <Comfim
        title="Xóa địa chỉ"
        conent="Bạn có muốn xóa địa chỉ này không ?"
        isModalOpen={comfimDelete?.status}
        cancelText="Hủy"
        okText="Xóa"
        btnComfim={() => removeAdressUser()}
        btnReject={() => setComfimDelete({ status: false, _id: undefined })}
      />
    </Modal>
  );
};

export default ShowAddAddress;
