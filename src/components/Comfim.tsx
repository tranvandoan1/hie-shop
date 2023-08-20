import { Modal } from "antd";
import "./css/comfim.css";
type Props = {
    btnReject?: () => void;
    btnComfim?: () => void;
    title?: string;
    conent?: string;
    isModalOpen?: boolean;
    okText?:string,
    cancelText?:string
};

const Comfim = ({
    btnReject,
    btnComfim,
    title,
    conent,
    isModalOpen,
    cancelText,
    okText
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
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={okText}
            cancelText={cancelText}
        >
            <div>
                <h5 style={{ color: 'red' }}>{title}</h5>
                <h6>{conent}</h6>
            </div>
        </Modal>
    );
};

export default Comfim;
