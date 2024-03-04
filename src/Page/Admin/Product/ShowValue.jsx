import { Modal } from 'antd'
import { Table } from 'antd';




const ShowValue = ({ data, status, title, callBack, dataClass }) => {

    const newData = dataClass?.filter((item) => item?.linked == data?.linked)
    console.log(newData, 'newData')
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Giá trị phân loại',
            key: 'values',
            dataIndex: 'values',
            render: (values) => (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {values?.length > 0 ?
                        values?.map((item, index) => (
                            <span style={{ marginTop: index == 0 ? 0 : 10 }}>{item.name}</span>
                        ))
                        :
                        'x'
                    }
                </div>
            ),
        },
        {
            title: 'Giá tiền',
            key: '_id',
            render: (_id, data) => (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {data?.values?.length > 0 ?
                        data?.values?.map((item, index) => (
                            <span style={{ marginTop: index == 0 ? 0 : 10, color: 'red', fontWeight: '600' }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                        ))
                        :
                        <span style={{ color: 'red', fontWeight: '600' }}>{data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                    }
                </div>
            ),
        },
        {
            title: 'Ảnh',
            key: 'photo',
            render: (photo, data) => (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={photo.photo} alt="" style={{ width: 80, height: 80 }} />
                </div>
            ),
        },
    ];

    return (
        <Modal
            title={title}
            open={status}
            footer={false}
            closable={false}
            onCancel={() => callBack({ status: false, data: undefined })}
        >
            <div className='modal-table'>

                <Table columns={columns} dataSource={newData} pagination={false} />
            </div>
        </Modal>
    )
}

export default ShowValue