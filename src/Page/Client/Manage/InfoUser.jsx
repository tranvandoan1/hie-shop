// @ts-ignore
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Upload, message } from "antd";
import { useEffect, useState } from "react";
import "../../Admin/Info/info.css";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { uploadUser } from "../../../features/UserSlice";
import Loading from "../../../components/Loading.jsx";
// @ts-ignore
import { uploadInfoUser } from '../../../api/Users.js'
// @ts-ignore
import { getDataUserLoca } from '../../../app/getDataLoca';


// @ts-ignore
const InfoUser = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const users = useSelector((data) => data.users.value)


    const user = users?.data?.find((item) => item._id == getDataUserLoca()?._id)
    console.log(users, 'us123123ers21')
    const [loading, setLoading] = useState(false);
    const [imageUrlAvatar, setImageUrlAvatar] = useState(
        { url: user?.avatar, file: undefined }
    );

    const [values, setValues] = useState({
        name: undefined,
        email: undefined,
        phone: undefined,
    });
    const UploadAvatatr = (file) => {
        // setLoading(true);
        const src = URL.createObjectURL(file);
        setImageUrlAvatar({ url: src, file: file });
        setLoading(false);
    };
    console.log(getDataUserLoca().avatar, 'getDataUserLoca()')
    useEffect(() => {
        setImageUrlAvatar({ url: user?.avatar, file: undefined });
        users?.status !== 1 && message.open({
            type: users?.status == false ? 'error' : "success",
            duration: 2,
            content: users?.message,
        });
        const avatarWeb = document.getElementById("avatarWeb");

        // avatarWeb?.href = (getDataUserLoca()?.avatar == undefined || getDataUserLoca().avatar == null) ? "https://png.pngtree.com/png-vector/20190805/ourlarge/pngtree-account-avatar-user-abstract-circle-background-flat-color-icon-png-image_1650938.jpg"
        //     : user.avatar

    }, [users]);
    const save = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("_id", user?._id);
        formData.append("files", imageUrlAvatar.file);
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
        formData.append(
            "image_id", user.image_id
        );
        await dispatch(uploadUser(formData));
        setLoading(false);
    };
    return (
        <div>
            {loading == true && <Loading />}
            <h5>Hồ sơ của tôi</h5>
            <hr />
            <div className="info-user">
                {users?.data !== undefined ? (
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
                                                setImageUrlAvatar({
                                                    url: user?.avatar,
                                                    file: undefined

                                                })

                                            }
                                            className="upload-avatar-close"
                                        >
                                            <CloseCircleOutlined style={{ fontSize: 17 }} />
                                        </div>
                                    )}
                            </div>
                            <span>Avatar</span>
                        </div>

                    </div>
                </div>
            </div>
            <Button onClick={() => save()}>Lưu</Button>
        </div>
    );
};

export default InfoUser;
