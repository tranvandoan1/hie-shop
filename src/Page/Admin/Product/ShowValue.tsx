import { Modal } from 'antd'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
type Props = {
    data: any
    title: any
    dataClass: any
    status: boolean
    callBack: (e: any) => void
}

const ShowValue = ({ data, status, title, callBack, dataClass }: Props) => {

    const newData = dataClass?.filter((item: any) => item?.linked == data?.linked)
    console.log(newData, 'newData')
    const columns: ColumnsType<DataType> = [
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
                        values?.map((item: any, index: any) => (
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
            render: (_id, data: any) => (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {data?.values?.length > 0 ?
                        data?.values?.map((item: any, index: any) => (
                            <span style={{ marginTop: index == 0 ? 0 : 10, color: 'red', fontWeight: '600' }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                        ))
                        :
                        <span style={{ color: 'red', fontWeight: '600' }}>{data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                    }
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