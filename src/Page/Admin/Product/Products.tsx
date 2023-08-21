import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './product.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { getProductAll } from '../../../features/Products'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// @ts-ignore
import { getCateAll } from './../../../features/CateSlice';
// @ts-ignore
import { getAllClassifies } from './../../../features/Classifies';
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}


const Products: React.FC = () => {
  const dispatch = useDispatch()
  const navigater = useNavigate()
  const products = useSelector((data: any) => data.products)

  const categories = useSelector((data: any) => data.categories);
  const classifies = useSelector((data: any) => data.classifies);
    // @ts-ignore

  const [dataDeletePro, setDataDeletePro] = useState();
  const categoriesValue = categories?.value?.data
  console.log(classifies, 'classifies')

  const dataProducts = products?.value?.data?.map((item: any) => {
    return { ...item, key: item?._id };
  });
  const dataProducts1: any = []
  // products?.value?.data?.map((item: any) => {
  //   classifies?.value?.map((itemClas: any) => {
  //     if (item.linked == itemClas.linked) {
  //       dataProducts1.push({ ...item, key: item?._id,values:[itemClas.values] })
  //     }
  //   })
  // });
  console.log(dataProducts1, 'dataProducts1')
  useEffect(() => {
    dispatch(getProductAll())
    dispatch(getCateAll());
    dispatch(getAllClassifies());
  }, [])
  const [textPro, setTextPro] = useState({ status: false, id: null });


  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'cate_id',
      // @ts-ignore
      render: (cate_id: any) => {
        categoriesValue?.map((item: any) => {
          if (item._id == cate_id) {
            return <span style={{ fontSize: 18 }}>{item.name}</span>
          }
        })
      },

    },
    {
      title: "Ảnh",
      key: "photo",
      dataIndex: "photo",
      render: (photo) => (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <div className={"categori-logo"}>
            <img src={photo} alt="" />
          </div>
        </div>

      ),
    },
    {
      title: 'Giảm giá',
      dataIndex: 'sale',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: "Thao tác",
      key: "data._id",
      render: (_id) => (
        <div>
          <Space size="middle" style={{ marginRight: 10, cursor: 'pointer' }} >
            <EditOutlined />
          </Space>
          <Space size="middle" style={{ cursor: 'pointer' }}>
            <a>
              <DeleteOutlined />
            </a>
          </Space>
        </div>
      ),
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setTextPro({ status: false, id: null });
      setDataDeletePro(selectedRowKeys);
    },
  };
  const handleExpand = (expanded: any) => {
    if (expanded) {
      setTextPro(
        { status: false, id: null }
      )
    } else {
      setTextPro(
        { status: false, id: null }
      )
    }
  }
  return (
    <div>
      <div className='admin-product'>
        <h4>Sản phẩm</h4>
        <Button onClick={() => navigater('add')}>Thêm sản phẩm</Button>
      </div>
      <hr />

      <div className='admin-product-table'>

        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          expandable={{
            expandedRowRender: (record: any) => {
              return (
                // @ts-ignore
                <div key={record} className={"table-product"}>
                  <Descriptions>
                    {categoriesValue?.map((item: any) => {
                      if (item._id == record.cate_id) {
                        return (
                          <Descriptions.Item
                            label={
                              <span style={{ fontSize: 15 }}>Danh mục</span>
                            }
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 14,
                              }}
                            >
                              {item.name}
                            </p>
                          </Descriptions.Item>
                        );
                      }
                    })}

                    {record?.view && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Lượt xem</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.view}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.name_classification && (
                      <Descriptions.Item
                        label={
                          <span style={{ fontSize: 15 }}>Tên phân loại</span>
                        }
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.name_classification}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.name_commodityvalue && (
                      <Descriptions.Item
                        label={
                          <span style={{ fontSize: 15 }}>
                            {<span style={{ fontSize: 15 }}>Lượt xem</span>}
                          </span>
                        }
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.name_commodityvalue}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.linked && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Kho hàng</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.warehouse}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.origin && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Nguồn gốc</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.origin}
                        </p>
                      </Descriptions.Item>
                    )}

                    {record?.sent_from && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Gửi từ</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.sent_from}
                        </p>
                      </Descriptions.Item>
                    )}
                    {record?.trademark && (
                      <Descriptions.Item
                        label={<span style={{ fontSize: 15 }}>Nhãn hiệu</span>}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {record?.trademark}
                        </p>
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                  <div className={"pro-detail"}>
                    <p style={{ fontSize: 15 }}>Chi tiết sản phẩm</p>
                    <p
                      style={{ width: "100%", fontSize: 14 }}
                      dangerouslySetInnerHTML={{
                        __html:
                          textPro.id == record._id
                            ?
                            record?.description
                            : record?.description.substring(
                              0,
                              String(record?.description).length /
                              10
                            ) + "...",
                      }}
                    />
                    <Button
                      type="primary"
                      onClick={() =>
                        setTextPro(
                          textPro.id == record._id
                            ? { status: false, id: null }
                            : { status: true, id: record._id }
                        )
                      }
                    >
                      {textPro.id !== record._id ? "Xem thêm" : "Rút gọn"}
                    </Button>
                  </div>
                </div>
              );
            },

            onExpand: handleExpand,//ấn hiện chi tiết
          }}
          columns={columns}
          dataSource={dataProducts}
        />
      </div>
    </div>
  );
};

export default Products;
