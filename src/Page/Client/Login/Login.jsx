// @ts-ignore
import React, { useState, useEffect } from "react";
import "./css/login.css";
// @ts-ignore
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
// @ts-ignore
import { auth, providerGoogle } from '../../../firebase/index';
// @ts-ignore
import { selectShop, signinApi } from '../../../api/Users';
import Loading from "../../../components/Loading";
import SelectShop from "../../../components/SelectShop";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { getAll, getAllUser } from '../../../features/UserSlice'

import LZString from 'lz-string'
// @ts-ignore
const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [showCodeShop, setShowCodeShop] = useState({ status: false, data: undefined });//check xem nếu mà đăng nhập với khách thì nhận mã cửa hàng
    // @ts-ignore
    const navigator = useNavigate()
    // @ts-ignore
    const onFinish = async (values) => {
        setLoading(true)
        const { data } = await signinApi(values);
        message.open({
            type: data.status == false ? 'error' : "success",
            duration: 2,
            content: data.message,
        });
        data.status == false && setLoading(false)
        if (data.user.role == 0) {
            const dataEn = {
                token: data.token,
                data: data.user
            };

            localStorage.setItem("data", LZString.compressToBase64(JSON.stringify(dataEn)));
            navigator('/home')
            setLoading(false)
        } else {

            const dataUser = await selectShop({ check: 1, token: data.token })
            const decodedString = LZString.decompressFromBase64(dataUser.data.data);
            const arr = JSON.parse(decodedString.slice(0, -8));
            setShowCodeShop({ status: true, data: data, user: arr })
            setLoading(false)

        }

    };
    // @ts-ignore
    const onFinishFailed = (errorInfo) => {
    };

    const sigin = (e) => {

        const dataEn = {
            token: showCodeShop?.data?.token,
            data: { ...showCodeShop?.data.user, code: e.code }
        }
        localStorage.setItem("data", LZString.compressToBase64(JSON.stringify(dataEn)));
        navigator('/home')
    };



    // đăng nhập bằng google
    const loginGoogle = async () => {
        form.resetFields();
        setLoading(true)
        signInWithPopup(auth, providerGoogle)
            .then(async (result) => {
                const user = result.user;
                const userLoca = {
                    name: user.displayName,
                    email: user.email,
                    providerId: user.providerId,
                    avatar: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    uid: user.uid,
                    select: 'google'
                }
                const { data } = await signinApi(userLoca);
                message.open({
                    type: data.status == false ? 'error' : "success",
                    duration: 2,
                    content: data.message,
                });
                data.status == true && localStorage.setItem("token", JSON.stringify(data.token));
                data.status == true && localStorage.setItem("user", JSON.stringify(data.user));
                setLoading(false)
                data.status == true && navigator('/home')

            }).catch(() => {
                setLoading(false)
                message.open({
                    type: 'error',
                    content: 'Lỗi xin thử lại',
                    duration: 2,
                });
            });


    };
    return (
        <div className="background-login">
            {
                loading == true &&
                <Loading />
            }
            <div className={`login `}>
                <div className="login-form ">
                    <h3>Đăng nhập</h3>
                    <Form
                        name="basic"
                        style={{}}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            name="value"
                            rules={[
                                {
                                    required: true,
                                    message: "Chưa nhập tên đăng nhập !",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Email hoặc số điện thoại"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                        <br />
                        <div className="input-password">
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Chưa nhập mật khẩu !",
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Mật khẩu"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                        </div>
                        <div className="forgot-password" >
                            <span className="forgot-password-text" onClick={() => navigator('/forgot-password')}>Quên mật khẩu?</span>
                        </div>
                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Button type="primary" htmlType="submit" className="submit">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="container">
                        <span className="line"></span>
                        <span className="text">Hoặc</span>
                        <span className="line"></span>
                    </div>


                    <div className="button-login-google_add">

                        <Button className="button-google_add" onClick={() => navigator('/signup')}>Tạo tài khoản</Button>

                        <Button className="login-google" onClick={() => loginGoogle()}>
                            <FcGoogle className="login-google-icon" />
                            <span>Đăng nhập Google</span>
                        </Button>

                    </div>

                </div>
            </div>
            {
                showCodeShop.status == true &&

                <SelectShop
                    title="Cửa hàng"
                    conent="Chọn cửa hàng bạn muốn vào"
                    btnComfim={(e) => sigin(e)}
                    btnReject={() => setShowCodeShop({ status: false, data: undefined })}
                    isModalOpen={showCodeShop.status}
                    cancelText="Hủy"
                    okText="Chọn"
                    code={showCodeShop?.status}
                    users={showCodeShop?.user}
                />
            }

        </div>
    );
};

export default Login;
