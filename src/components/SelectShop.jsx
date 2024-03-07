import { Avatar, Modal, Select, Space } from "antd";
import "./css/comfim.css";
import { useState } from "react";


const SelectShop = ({
    btnReject,
    btnComfim,
    title,
    conent,
    isModalOpen,
    cancelText,
    // @ts-ignore
    code,
    okText,
    users
}) => {
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


    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


    const onChange = (value) => {
        setSelectShop(users?.find((item) => item._id == value))
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
                    // onChange={handleChange}
                    optionLabelProp="label"
                    onChange={onChange}
                    filterOption={filterOption}
                >
                    {
                        users?.map((item) => {
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
