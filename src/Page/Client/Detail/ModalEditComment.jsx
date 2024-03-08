import { Image, Modal } from 'antd';
import React, { startTransition, useState } from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CameraOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const ModalEditComment = ({ open, handleOk, handleCancel, imageUrlAvatarEdit, uploadImage, valueEditComment }) => {
    const [valueEditCommentModal, setValueEditCommentModal] = useState(valueEditComment)
    console.log(valueEditComment, 'valueEditComment')
    console.log(imageUrlAvatarEdit, 'imageUrlAvatarEdit')
    const cancel = () => {
        handleCancel()
    };

    // thêm ảnh comment upload
    const uploadImageModal = (event) => {
        console.log(event, "13r2ew");
        // setState({ loading: true });

        const src = URL.createObjectURL(event.target.files[0]);
        uploadImage([
            ...imageUrlAvatarEdit,
            {
                url: src,
                file: event.target.files[0],
                image_id: Math.random(),
                status: false,
            },
        ],
            // loading: false,
        )
        // setState({
        //     imageUrlAvatarEdit: [
        //         ...imageUrlAvatarEdit,
        //         {
        //             url: src,
        //             file: event.target.files[0],
        //             image_id: Math.random(),
        //             status: false,
        //         },
        //     ],
        //     // loading: false,
        // });
    };

    const removeImageEditModal = (e) => {
        const newData = [];
        imageUrlAvatarEdit?.map((item) => {
            if (item.image_id == e.image_id) {
                newData.push({ ...item, status: !item.status });
            } else {
                newData.push(item);
            }
        });
        uploadImage(newData);
    };
    const editorConfig = {
        toolbar: false, // ẩn header
    };
    return (
        <Modal
            title="Sửa bình luận"
            open={open}
            onOk={() => handleOk(valueEditCommentModal)}
            onCancel={cancel}
        >
            <hr />

            <div>
                {/* <h6>Bình luận</h6> */}
                <div className="edit-comment-input-image">
                    <CKEditor
                        editor={ClassicEditor}
                        data={valueEditComment}
                        // @ts-ignore
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            startTransition(() => {
                                setValueEditCommentModal(data);
                            });
                        }}
                        className="input-edit-comment"
                        config={editorConfig}
                    />

                    <label for="upload-image" className="edit-comment-image">
                        <CameraOutlined />
                    </label>
                    <input
                        type="file"
                        id="upload-image"
                        name="image"
                        accept="image/*"
                        onChange={uploadImageModal}
                    />
                </div>
                <br />
                <br />
                <div className="edit-comment-photo">
                    <Image.PreviewGroup
                        preview={{
                            onChange: (current, prev) => null,
                        }}
                    >
                        {imageUrlAvatarEdit?.map((item) => {
                            return (
                                <div style={{ position: "relative" }}>
                                    <div className="photo-edit-comment">
                                        <Image width={"100%"} src={item.photo || item.url} />
                                    </div>

                                    <div
                                        onClick={() => {
                                            removeImageEditModal(item);
                                        }}
                                        className="image-comment-close"
                                    >
                                        {item.status == true ? (
                                            <EyeInvisibleOutlined style={{ fontSize: 17 }} />
                                        ) : (
                                            <EyeOutlined style={{ fontSize: 17 }} />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </Image.PreviewGroup>
                </div>
            </div>
        </Modal>
    )
}

export default ModalEditComment