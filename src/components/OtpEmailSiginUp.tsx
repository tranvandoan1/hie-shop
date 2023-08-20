import { Modal, Spin } from "antd";
import "./css/comfim.css";
// @ts-ignore

import OtpInput from "otp-input-react";
import { useState } from "react";

type Props = {
  btnReject: () => void;
  btnComfim: (e: any) => void;
  status: any;
  title: string;
  conent: string;
  loading: boolean;
};

const OtpEmailSiginUp = ({
  btnReject,
  btnComfim,
  // @ts-ignore
  status,
  title,
  conent,
  loading,
}: Props) => {
  const handleOk = () => {
    // setIsModalOpen(false);

    btnComfim(otp);
  };
  const [otp, setOtp] = useState("");

  const handleCancel = () => {
    // setIsModalOpen(false);
    btnReject();
  };
  return (
    <Modal
      open={status.status}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={loading == true ? <Spin /> : "Xác nhận"}
      cancelText={loading == true ? <Spin /> : "Hủy"}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h5 style={{ color: "red" }}>{title}</h5>
        <h6>{conent}</h6>
        <div style={{ margin: "50px 0 30px 0" }}>
          <OtpInput
            value={otp}
            onChange={(e: any) => setOtp(e)}
            OTPLength={6}
            otpType="number"
            autoFocus
            className="opt-container"
          ></OtpInput>
        </div>
      </div>
    </Modal>
  );
};

export default OtpEmailSiginUp;
