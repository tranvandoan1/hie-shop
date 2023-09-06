import { Avatar, Modal, Select, Space } from "antd";
import "./css/comfim.css";
import { useState } from "react";

type Props = {
    btnReject?: () => void;
    btnComfim?: (e: any) => void;
    title?: string;
    conent?: string;
    isModalOpen?: boolean;
    okText?: string,
    cancelText?: string
    code?: boolean
    users?: any
};

const SelectShop = ({
    btnReject,
    btnComfim,
    title,
    conent,
    isModalOpen,
    cancelText,
    code,
    okText,
    users
}: Props) => {
    const [selectShop, setSelectShop] = useState()
    const handleOk = () => {
        // setIsModalOpen(false);

        // @ts-ignore
        btnComfim(selectShop);
    };

    const handleCancel = () => {
        // setIsModalOpen(false);
        // @ts-ignore
        btnReject();
    };

    const handleChange = (value: any) => {
        setSelectShop(users?.find((item: any) => item._id == value))
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
                <Select
                    showSearch
                    optionFilterProp="children"

                    style={{
                        width: '100%',
                    }}
                    placeholder="Chọn cửa hàng"
                    defaultValue={''}
                    onChange={handleChange}
                    optionLabelProp="label"
                >
                    {
                        users?.map((item: any) => {
                            return (
                                <Select.Option value={item._id} label={item.name}>
                                    <Space>
                                        <Avatar src={item.logo} />
                                        {item.name}
                                    </Space>
                                </Select.Option>
                            )
                        })
                    }

                </Select>
            </div>
        </Modal>
    );
};

export default SelectShop;
