import { Input, Modal } from "antd";
import "./css/comfim.css";
type Props = {
    btnReject?: () => void;
    btnComfim?: () => void;
    title?: string;
    conent?: string;
    isModalOpen?: boolean;
    okText?: string,
    cancelText?: string
    code?: boolean
};

const Comfim = ({
    btnReject,
    btnComfim,
    title,
    conent,
    isModalOpen,
    cancelText,
    code,
    okText
}: Props) => {
    const handleOk = () => {
        // setIsModalOpen(false);

        // @ts-ignore
        btnComfim();
    };

    const handleCancel = () => {
        // setIsModalOpen(false);
        // @ts-ignore
        btnReject();
    };
    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={okText}
            style={{ zIndex: 100 }}
            cancelText={cancelText}
        >
            <div>
                <h5 style={{ color: 'red' }}>{title}</h5>
                <h6>{conent}</h6>


                {
                    code == true &&
                    <Input placeholder="Nhập mã cửa hàng " style={{ margin: '10px 0' }} />
                }

            </div>
        </Modal>
    );
};

export default Comfim;
