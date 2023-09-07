// @ts-ignore
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Upload, message } from "antd";
import { useEffect, useState } from "react";
import "./info.css";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { uploadAdmin } from "../../../features/UserSlice";
import Loading from "../../../components/Loading.jsx";
// @ts-ignore
import { uploadInfoUser } from '../../../api/Users.js'
// @ts-ignore
import { getDataUserLoca } from '../../../app/getDataLoca';


const Info = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const users = useSelector((data) => data.users.value)
  const user = users?.data?.find((item) => item._id == getDataUserLoca()._id)
  const [loading, setLoading] = useState(false);
  const [imageUrlAvatar, setImageUrlAvatar] = useState(
    { url: user?.avatar, file: undefined, status: false }
  );
  const [imageUrlLogo, setImageUrlLogo] = useState({
    url: user?.logo,
    file: undefined, status: false
  });
  const [values, setValues] = useState({
    name: undefined,
    email: undefined,
    phone: undefined,
  });

  const UploadAvatatr = (file) => {
    // setLoading(true);
    const src = URL.createObjectURL(file);
    setImageUrlAvatar({ url: src, file: file, status: imageUrlLogo.file == undefined ? true : false });
    setLoading(false);
  };
  const UploadLogo = (file) => {
    // setLoading(true);
    const src = URL.createObjectURL(file);
    setImageUrlLogo({ url: src, file: file, status: imageUrlAvatar.file == undefined ? true : false });
    setLoading(false);
  };
  useEffect(() => {
    setImageUrlAvatar({ url: user?.avatar, file: undefined, status: false });
    setImageUrlLogo({ url: user?.logo, file: undefined, status: false });
    users?.status !== 1 && message.open({
      type: users?.status == false ? 'error' : "success",
      duration: 2,
      content: users?.message,
    });
  }, [users]);
  const save = async () => {
    setLoading(true);
    const image = [imageUrlAvatar.file, imageUrlLogo.file];
    const formData = new FormData();

    function check() {
      if (
        imageUrlAvatar?.file == undefined &&
        imageUrlLogo?.file == undefined
      ) {
        return 0;
      } else if (
        imageUrlAvatar?.file !== undefined &&
        imageUrlLogo?.file == undefined
      ) {
        return 1;
      } else if (
        imageUrlAvatar?.file == undefined &&
        imageUrlLogo?.file !== undefined
      ) {
        return 2;
      } else {
        return 3;
      }
    }

    formData.append("_id", user?._id);
    for (let i = 0; i < image.length; i++) {
      formData.append("files", image[i]);
    }
    formData.append(
      "name",
      values?.name == undefined ? user?.name : values.name
    );
    formData.append(
      "email",
      values?.email == undefined ? user?.email : values.email
    );
    formData.append(
      "phone",
      values?.phone == undefined ? user?.phone : values.phone
    );
    formData.append("check", check());
    formData.append("imageUrlAvatar", imageUrlAvatar.status);
    formData.append("imageUrlLogo", imageUrlLogo.status);
    await dispatch(uploadAdmin(formData));
    setLoading(false);
  };
  return (
    <div>
      {loading == true && <Loading />}
      <h5>Thông tin người dùng</h5>
      <hr />
      <div className="info-user">
        {user !== undefined ? (
          <div style={{ width: "50%" }}>
            <div className="info-user-name">
              <span style={{ fontSize: 16 }}>Tên : </span>
              <Input
                defaultValue={user?.name}
                onChange={(e) =>
                  setValues({
                    name: e.target.value,
                    email: undefined,
                    phone: undefined,
                  })
                }
              />
            </div>
            <div className="info-user-email">
              <span style={{ fontSize: 16 }}>Email : </span>
              <Input
                defaultValue={user?.email}
                disabled
                onChange={(e) =>
                  setValues({
                    name: e.target.value,
                    email: undefined,
                    phone: undefined,
                  })
                }
              />
            </div>
            <div className="info-user-phone">
              <span style={{ fontSize: 16 }}>Số điện thoại : </span>
              <Input
                defaultValue={user?.phone}
                onChange={(e) =>
                  setValues({
                    name: values?.name,
                    email: undefined,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div className="info-user-phone">
              <span style={{ fontSize: 16 }}>Vai trò : </span>
              <span>{user?.role == 0 ? "Bán hàng" : "Mua hàng"}</span>
            </div>
          </div>
        ) : (
          <Spin />
        )}
        <div style={{ width: "50%", height: "100%" }}>
          <div
            className="upload-avatar"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className="avatar">
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={UploadAvatatr}
                  className="upload-avatar"
                >
                  {imageUrlAvatar.file || imageUrlAvatar.url ? (
                    <div className="box-image">
                      <img src={imageUrlAvatar.url} className="image" />
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
                {imageUrlAvatar.file !== undefined &&
                  imageUrlAvatar.url !== undefined && (
                    <div
                      onClick={() =>
                      (setImageUrlAvatar({
                        url: user?.avatar,
                        file: undefined, status: false

                      })
                        ,
                        setImageUrlLogo({ url: imageUrlLogo?.url, file: imageUrlLogo?.file, status: imageUrlLogo.file == undefined ? false : true }))
                      }
                      className="upload-avatar-close"
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
              </div>
              <span>Avatar</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className="avatar">
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={UploadLogo}
                  className="upload-avatar"
                >
                  {imageUrlLogo.file || imageUrlLogo.url ? (
                    <div className="box-image">
                      <img src={imageUrlLogo.url} className="image" />
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
                {imageUrlLogo.file !== undefined &&
                  imageUrlLogo.url !== undefined && (
                    <div
                      onClick={() =>
                      (setImageUrlLogo({ url: user?.logo, file: undefined, status: false }),
                        setImageUrlAvatar({ url: imageUrlAvatar?.url, file: imageUrlAvatar?.file, status: imageUrlAvatar.file == undefined ? false : true }))
                      }
                      className="upload-avatar-close"
                    >
                      <CloseCircleOutlined style={{ fontSize: 17 }} />
                    </div>
                  )}
              </div>
              <span>Logo</span>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={() => save()}>Lưu</Button>
    </div>
  );
};

export default Info;
