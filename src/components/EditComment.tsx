import { CameraOutlined } from "@ant-design/icons";
import {  Input, Modal } from "antd";
const { TextArea } = Input;
import "./css/editComment.css";
type Props = {
  btnReject: () => void;
  btnComfim: () => void;
  data: any;
  title: string;
  conent: string;
  isModalOpen: boolean;
};

const EditComment = ({
  btnReject,
  btnComfim,
// @ts-ignore
  data,
  title,
// @ts-ignore
  conent,
  isModalOpen,
}: Props) => {
  const handleOk = () => {
    // setIsModalOpen(false);

    btnComfim();
  };

  const handleCancel = () => {
    // setIsModalOpen(false);
    btnReject();
  };
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <div className="comfim-input">
        <TextArea rows={4} placeholder="Hãy để lại đáng giá của bạn" />
        <CameraOutlined className="comfim-upload-image" />
      </div>
      <div className="image-comfim">
        <div>
          <img
            src="https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png"
            alt=""
          />
        </div>
      </div>
      <div className="image-comfim-view">
        <img
          src="https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png"
          alt=""
        />
      </div>
    </Modal>
  );
};

export default EditComment;
