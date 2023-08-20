// @ts-ignore
import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, Spin } from "antd";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
type Props = {
  callBack: (e: any) => void;
  isModalOpen: boolean;
};
// @ts-ignore
const AddCategori = ({ isModalOpen, callBack }: Props) => {
  const [imageUrlAvatar, setImageUrlAvatar] = useState<{
    url: any;
    file: any;
  }>({ url: undefined, file: undefined });
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = (values: any) => {
    callBack({
      status: true,
      data: { file: imageUrlAvatar.file, name: values.name },
    });
    setImageUrlAvatar({ url: undefined, file: undefined });
    form.resetFields();
  };

  const onFinishFailed = () => {
    // console.log('Failed:', errorInfo);
  };
  type FieldType = {
    name?: string;
  };
  const UploadAvatatr = (file: any) => {
    setLoading(true);
    const src = URL.createObjectURL(file);
    setImageUrlAvatar({ url: src, file: file });
    setLoading(false);
  };
  return (
    <>
      <Modal
        title="Thêm danh mục sản phẩm"
        open={isModalOpen}
        onOk={() => callBack("ok")}
        onCancel={() => callBack("close")}
        footer={null}
      >
        <br />
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Chưa nhập tên danh mục !" }]}
          >
            <Input placeholder="Tên danh mục" />
          </Form.Item>
          <br />
          <div className="add-cate-avatar">
            <span>Avatar : </span>
            <div className="avatar">
              <Upload
                listType="picture-card"
                showUploadList={false}
                beforeUpload={UploadAvatatr}
                className="add-cate-avatar"
              >
                {imageUrlAvatar.file ? (
                  <div className="add-cate-box-image">
                    <img
                      src={imageUrlAvatar.url}
                      className="add-cate-image"
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    {loading == true ? (
                      <Spin />
                    ) : (
                      <PlusCircleOutlined
                        style={{
                          fontSize: 30,
                          opacity: 0.8,
                          color: "#ee4d2d",
                        }}
                      />
                    )}
                  </div>
                )}
              </Upload>
              {imageUrlAvatar.file !== undefined && (
                <div
                  onClick={() =>
                    setImageUrlAvatar({ url: undefined, file: undefined })
                  }
                  className="add-cate-avatar-close"
                >
                  <CloseCircleOutlined style={{ fontSize: 17 }} />
                </div>
              )}
            </div>
          </div>

          <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
            <Button
              style={{ marginRight: 10 }}
              onClick={() => callBack('close')}
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddCategori;
