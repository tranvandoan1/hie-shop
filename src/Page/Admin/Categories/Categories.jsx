// @ts-ignore
import React, { useEffect, useState } from "react";
// @ts-ignore
import { Button, Space, Table, Tag, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./categori.css";
import AddCategori from "./AddCategori";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { addCategori, removeCategori, uploadCategori, getCategoriAll } from "../../../features/CateSlice";
import Loading from "../../../components/Loading";
// @ts-ignore
import EditCategori from "./EditCategori";
// @ts-ignore
import { getDataUserLoca } from "../../../app/getDataLoca";

// @ts-ignore
const Categories = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalOpenUpload, setIsModalOpenUpload] = useState({
        status: false,
        data: undefined
    });
    const categories = useSelector((data) => data.categories);
    useEffect(() => {
        dispatch(getCategoriAll());
    }, []);
    useEffect(() => {
        if (
            categories?.value?.getdata !== true &&
            categories?.value?.data?.length > 0 &&
            categories?.loading == true
        ) {
            message.success(categories?.value?.message);
        }
    }, [categories.value]);

    const deleteCate = async (item) => {
        setLoading(true);
        await dispatch(removeCategori({ _id: item._id, image_id: item.image_id }));
        setLoading(false);
    };

    const columns = [
        {
            title: "Tên danh mục",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },

        {
            title: "Ảnh",
            key: "photo",
            dataIndex: "photo",
            width: 500,
            // @ts-ignore
            render: (photo) => (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <div className={"categori-logo"}>
                        <img src={photo} alt="" />
                    </div>
                </div>

            ),
        },
        {
            title: "Thao tác",
            key: "data._id",
            render: (_id, data) => (
                <div >
                    <Space size="middle" style={{ marginRight: 10, cursor: 'pointer' }} onClick={() => setIsModalOpenUpload({ status: true, data: data })}>
                        <EditOutlined />
                    </Space>
                    <Space size="middle" style={{ cursor: 'pointer' }}>
                        <a>
                            <DeleteOutlined onClick={() => deleteCate(_id)} />
                        </a>
                    </Space>
                </div>
            ),
        },
    ];


    const saveCate = async (e) => {
        if (e !== 'close') {
            if (e.data.file == undefined) {
                message.warning('Chưa chọn ảnh !')
            } else {
                setLoading(true);
                const formData = new FormData();
                formData.append("name", e.data.name);
                formData.append("code_shop", getDataUserLoca().code);
                formData.append("files", e.data.file);
                await dispatch(addCategori(formData));
                setLoading(false);
                setIsModalOpenAdd(false);

            }
        }
    };
    const uploadCategories = async (e) => {
        // @ts-ignore
        if (e !== 'close' && (e.data.name !== isModalOpenUpload.data.name || e.data.file)) {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", e.data.name);
            // @ts-ignore
            formData.append("_id", isModalOpenUpload.data._id);
            // @ts-ignore
            formData.append("image_id", isModalOpenUpload.data.image_id);
            formData.append("files", e.data.file);
            await dispatch(uploadCategori(formData));
            setLoading(false);
        }

        setIsModalOpenUpload({ status: false, data: undefined })
    }


    

    return (
        <div>
            {loading == true && <Loading />}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h5>Danh mục sản phẩm</h5>
                <Button onClick={() => setIsModalOpenAdd(true)}>Thêm danh mục</Button>
            </div>
            <hr />
            <div className="table-categoris">
                <Table columns={columns} dataSource={categories?.value} />
            </div>

            <AddCategori
                // @ts-ignore
                isModalOpen={isModalOpenAdd}
                callBack={(e) => saveCate(e)}
            />

            <EditCategori
                // @ts-ignore
                isModalOpen={isModalOpenUpload}
                callBack={(e) => uploadCategories(e)}
            />
        </div>
    );
};

export default Categories;
