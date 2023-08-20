// @ts-ignore
import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect } from 'react';
import Loading from "../../../components/Loading";
type Props = {
  callBack: (e: any) => void;
  isModalOpen: boolean;
};
// @ts-ignore
const EditCategori: React.FC = ({ isModalOpen, callBack }: Props) => {
  const [imageUrlAvatar, setImageUrlAvatar] = useState<{ url: any; file: any }>(
    { url: undefined, file: undefined }
  );
  const [form] = Form.useForm();
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  // @ts-ignore
  const [name, setName] = useState<string>(isModalOpen?.data?.name);
  useEffect(() => {
    form.resetFields();

    // @ts-ignore
  }, [isModalOpen?.data])
  const onFinish = (values: any) => {
    // form.resetFields();
    callBack({
      status: true,
      data: {
        file: imageUrlAvatar.file,
        // @ts-ignore
        name: values.name == undefined ? isModalOpen.data.name : values.name,
      },
    });
    setImageUrlAvatar({ url: undefined, file: undefined });
  };

  // @ts-ignore
  const onFinishFailed = (errorInfo: any) => {
    callBack({
      status: true,
      // @ts-ignore
      data: { file: imageUrlAvatar.file, name: isModalOpen.data.name },
    });
    setImageUrlAvatar({ url: undefined, file: undefined });
    form.resetFields();
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
        title="Sửa danh mục sản phẩm"
        // @ts-ignore
        open={isModalOpen.status}
        onOk={() => callBack("ok")}
        onCancel={() => callBack("close")}
        footer={null}
      >
        {
          loading == true && <Loading />
        }
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
            rules={[
              {
                required: name?.length <= 0 ? true : false,
                message: "Chưa nhập tên danh mục !",
              },
            ]}
          >
            <Input
              placeholder="Tên danh mục"
              // @ts-ignore
              defaultValue={isModalOpen?.data?.name}
              onChange={(e) => setName(e.target.value)}
            />
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
                <div className="add-cate-box-image">
                  <img
                    src={
                      imageUrlAvatar.url == undefined
                        // @ts-ignore
                        ? isModalOpen?.data?.photo
                        : imageUrlAvatar.url
                    }
                    className="add-cate-image"
                  />
                </div>
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
              onClick={() => callBack("close")}
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
};

export default EditCategori;
