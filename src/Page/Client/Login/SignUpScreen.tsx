// @ts-ignore
import React, { useState, useEffect } from "react";

import "./css/login.css";
import "./css/signUp.css";
// @ts-ignore
import {
    Button,
    Checkbox,
    Form,
    Input,
    Spin,
    Switch,
    Upload,
    message,
} from "antd";
import {
    CloseCircleOutlined,
    LockOutlined,
    PhoneOutlined,
    PlusCircleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { signupApi } from "../../../api/Users";
import OtpEmailSiginUp from "../../../components/OtpEmailSiginUp";
import { signInWithPopup } from "firebase/auth";
// @ts-ignore
import { auth ,providerGoogle} from './../../../firebase/index';
// @ts-ignore
import Comfim from "../../../components/Comfim";
import Loading from "../../../components/Loading";
type Props = {};

// @ts-ignore
const SignUpScreen = (props: Props) => {
    let navigator = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [comfimAmin, setComfimAmin] = useState<{ status: boolean, data: any }>({ status: false, data: undefined });//đăng ký với google thì sẽ hiện comfim hỏi có đăng ký bán hàng không
    const [OtpEmailSiginUpStatus, setOtpEmailSiginUpStatus] = useState<{
        status: boolean;
        otp: any;
    }>({ status: false, otp: null });
    const [imageUrlAvatar, setImageUrlAvatar] = useState<{ url: any; file: any }>(
        { url: undefined, file: undefined }
    );
    const [otp, setOtp] = useState("");
    const [valueSignUp, setValueSignUp] = useState<any>();

    const [form] = Form.useForm();

    const UploadAvatatr = (file: any) => {
        // setLoading(true);
        const src = URL.createObjectURL(file);
        setImageUrlAvatar({ url: src, file: file });
        setLoading(false);
    };


    // xác thực otp
    const onFinish = async (values: any) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("name", values.name);
        formData.append("password", values.password);
        formData.append("google", 'false');
        formData.append("otp", '1');
        const { data } = await signupApi(formData);
        setOtp(data.otp)
        message.open({
            type: data.status == false ? 'error' : "success",
            duration: 2,
            content: data.message,
        });
        data.status == true && setOtpEmailSiginUpStatus({ status: true, otp: null })
        setLoading(false);
        setValueSignUp(values)
    };
    const onFinishFailed = () => {
    };
    // thêm user
    const save = async (e: any) => {
        if (e == otp) {
            setLoading(true);
            const formData = new FormData();
            formData.append("phone", valueSignUp.phone);
            formData.append("email", valueSignUp.email);
            formData.append("name", valueSignUp.name);
            formData.append("password", valueSignUp.password);
            formData.append("files", imageUrlAvatar.file);
            formData.append("google", 'false');
            // @ts-ignore
            formData.append("role", valueSignUp.role == true ? true : false);

            const { data } = await signupApi(formData);
            message.open({
                type: 'success',
                content: data.message,
                duration: 2,
            });
            setLoading(false);
            navigator('/login')
            setOtp('')
        } else {
            setOtp('')
        }

    };
    // đăng ký bằng google
    const loginGoogle = async () => {
        signInWithPopup(auth, providerGoogle)
            .then(async (result) => {
                const user = result.user;
                const userLoca: any = {
                    name: user.displayName,
                    email: user.email,
                    _id: user.uid,
                    providerId: user.providerId,
                    avatar: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    uid: user.uid,
                }
                console.log(user, 'user')
                setComfimAmin({ status: true, data: userLoca })
            }).catch(() => {
                message.open({
                    type: 'error',
                    content: 'Lỗi xin thử lại',
                    duration: 2,
                });
            });

    };

    // thêm user google
    const saveUser = async (e: any) => {
        setLoading(true)
        setComfimAmin({ status: false, data: comfimAmin.data })
        const formData = new FormData();
        formData.append("phone", comfimAmin.data.phone);
        formData.append("email", comfimAmin.data.email);
        formData.append("name", comfimAmin.data.name);
        formData.append("avatar", comfimAmin.data.avatar);
        formData.append("password", comfimAmin.data.password);
        formData.append("uid", comfimAmin.data.uid);
        formData.append("google", 'true');
        formData.append("role", e);
        const { data } = await signupApi(formData);
        message.open({
            type: data.status == false ? 'error' : "success",
            duration: 2,
            content: data.message,
        });
        setLoading(false)
        setComfimAmin({ status: false, data: undefined })
        data.status == true && navigator("/login");
    }
    return (
        <div className="background-signup">
            {
                loading == true &&
                <Loading />
            }
            <div className={`signup`} id="my-element">
                <div className="signup-form">
                    <h3>Đăng ký</h3>
                    <Form
                        form={form}
                        name="basic"
                        style={{}}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className="form-signup">
                            <div className="form-signup-left">
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Chưa nhập name !",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Họ và Tên"
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Chưa nhập email !",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Email"
                                        prefix={
                                            <span
                                                style={{
                                                    color: "rgba(208, 208, 208, 0.5)",
                                                    fontSize: 18,
                                                    paddingRight: 20,
                                                    marginTop: -2,
                                                }}
                                            >
                                                <AiOutlineMail />
                                            </span>
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Chưa nhập số điện thoại !",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Số điện thoại"
                                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Chưa nhập mật khẩu!",
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password
                                        placeholder="Mật khẩu"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    dependencies={["password"]}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please confirm your password!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "The new password that you entered do not match!"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Nhập lại mật khẩu"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <div className="upload-avatar">
                                    <span>Avatar : </span>
                                    <div className="avatar">
                                        <Upload
                                            listType="picture-card"
                                            showUploadList={false}
                                            beforeUpload={UploadAvatatr}
                                            className="upload-avatar"
                                        >
                                            {imageUrlAvatar.file ? (
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
                                                        {loading == true && comfimAmin.data == undefined ? (
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
                                                onClick={() =>
                                                    setImageUrlAvatar({ url: undefined, file: undefined })
                                                }
                                                className="upload-avatar-close"
                                            >
                                                <CloseCircleOutlined style={{ fontSize: 17 }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Form.Item
                                    name="role"
                                    label="Đăng ký bán hàng"
                                    valuePropName="checked"
                                >
                                    <Switch />
                                </Form.Item>
                            </div>
                            <div className="form-signup-right">
                                <div className="form-signup_2x">

                                    <div className="form-signup-logo">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/order-94f58.appspot.com/o/images%2FSHOP%20(1).png?alt=media&token=aa1fc61d-956d-4f7f-8f07-d07f7b50bb94"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <Form.Item
                                            wrapperCol={{
                                                offset: 0,
                                                span: 24,
                                            }}
                                        >
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="submit"
                                            >
                                                Đăng ký
                                            </Button>
                                        </Form.Item>
                                        <div className="container">
                                            <span className="line"></span>
                                            <span className="text">Hoặc</span>
                                            <span className="line"></span>
                                        </div>

                                        <div className="button-signup-google_add">
                                            <Button
                                                className="button-google_add"
                                                onClick={() => navigator("/login")}
                                            >
                                                Quay lại
                                            </Button>

                                            <Button
                                                className="signup-google"
                                                disabled={loading}
                                                onClick={() => loginGoogle()}
                                            >
                                                <FcGoogle className="signup-google-icon" />
                                                <span>Đăng ký</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Form>
                </div>
            </div>
            <OtpEmailSiginUp
                btnReject={() => setOtpEmailSiginUpStatus({ status: false, otp: null })}
                btnComfim={(e) => save(e)}
                title={"Xác thực Email"}
                conent={"Nhập otp của bạn"}
                status={OtpEmailSiginUpStatus}
                loading={loading}
            />
            <Comfim
                title="Thông báo"
                conent="Bạn có muốn đăng với quyền bán hàng không ?"
                btnComfim={() => saveUser(0)}
                btnReject={() => saveUser(1)}
                isModalOpen={comfimAmin.status}
                okText={'Đồng ý'}
                cancelText={'Không'}
            />
        </div>
    );
};

export default SignUpScreen;
