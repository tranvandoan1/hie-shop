// @ts-ignore
import React, { useState, useEffect } from "react";
import "./css/login.css";
// @ts-ignore
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { HiOutlineMail } from 'react-icons/hi'
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { auth, providerGoogle } from '../../../firebase/index';
// @ts-ignore
import { signinApi, forgotPassword } from '../../../api/Users';
import Loading from "../../../components/Loading";
import OtpEmailSiginUp from "../../../components/OtpEmailSiginUp";

// @ts-ignore
const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [comfimOtp, setComfimOtp] = useState({ status: false, otp: '', value: '' });
    // @ts-ignore
    const [timeClassName, setTimeClassName] = useState(false)
    const navigator = useNavigate()
    // @ts-ignore
    const onFinish = async (values) => {
        setLoading(true)
        const { data } = await forgotPassword({ ...values, check: 1 });
        message.open({
            type: data.status == false ? 'error' : "success",
            duration: 2,
            content: data.message,
        });
        setLoading(false)
        setComfimOtp({ status: data.status, otp: data.otp, data: values })
    };
    // @ts-ignore
    const onFinishFailed = (errorInfo) => {
    };
    const save = async (otp) => {
        if (otp !== comfimOtp.otp) {
            message.warning('Mã OTP không đúng !')
        } else {
            setLoading(true)
            const { data } = await forgotPassword({ value: comfimOtp.data.value, newPassword: comfimOtp.data.password, check: 2 });
            message.open({
                type: data.status == false ? 'error' : "success",
                duration: 2,
                content: data.message,
            });
            setLoading(false)
            setComfimOtp({ status: false, otp: '', value: '' })
            navigator('/login')
        }

    };

    return (
        <div className="background-login">
            {
                loading == true &&
                <Loading />
            }
            <div className={`login `}>
                <div className="login-form ">
                    <h3>Quên mật khẩu</h3>
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
                                    message: "Chưa nhập tên email !",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Email hoặc số điện thoại"
                                prefix={<HiOutlineMail className="form-item-icon" />}
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
                                placeholder="Mật khẩu mới"
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
                        <br />

                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Button type="primary" htmlType="submit" className="submit">
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>




                    <div className="button-login-google_add">

                        <Button className="button-google_add" style={{ width: '100%' }} onClick={() => navigator('/login')}>Đăng nhập</Button>

                    </div>

                </div>
            </div>
            <OtpEmailSiginUp
                btnReject={() => {
                    setLoading(false)
                    setComfimOtp({
                        status: false, otp: comfimOtp.opt, data: comfimOtp.data
                    })
                }}
                btnComfim={(e) => save(e)}
                status={comfimOtp}
                title={'Xác nhận OTP'}
                conent={'Nhập mã OTP gửi về email của bạn'}
                loading={loading}
            />
        </div>
    );
};

export default ForgotPassword;
