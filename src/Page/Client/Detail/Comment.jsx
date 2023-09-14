import "./css/comment.css";
import { Avatar, Button, Input, Modal, Pagination, Image } from "antd";
import {
    CameraOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import EditComment from "../../../components/EditComment";
import { startTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../features/Classifies";
import {
    addComments,
    removeComments,
    uploadtComments,
} from "../../../features/CommentSlice";
import { getDataUserLoca } from "../../../app/getDataLoca";
import { json, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import Comfim from "../../../components/Comfim";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { TextArea } = Input;

// @ts-ignore
const Comment = ({ comments, users }) => {
    const dispatch = useDispatch();
    const usersAll = useSelector((data) => data.users.value);
    const user = usersAll?.data?.find(
        (item) => item._id == getDataUserLoca()?._id
    );

    const { id } = useParams();
    const [isModalOpenEditComment, setIsModalOpenEditComment] = useState(false);
    const [comfimRemoveComment, setComfimRemoveComment] = useState({
        status: false,
        data: undefined,
    });
    const [selectEditComment, setSelectEditComment] = useState({
        status: false,
        data: undefined,
    });
    const [valueEditComment, setValueEditComment] = useState();
    const [selectPhotoComment, setSelectPhotoComment] = useState();
    const [imageUrlAvatar, setImageUrlAvatar] = useState([]);
    const [imageUrlAvatarEdit, setImageUrlAvatarEdit] = useState();
    const [valueComment, setValueComment] = useState();
    const [loading, setLoading] = useState(false);
    const [minPage, setMinPage] = useState(0);
    const [maxPage, setMaxPage] = useState(3);
    function getTimeAgo(time) {
        const commentTime = new Date(time);

        // Lấy thời gian hiện tại
        const now = new Date();

        // Tính khoảng thời gian (tính bằng giây)
        const diffInSeconds = Math.floor((now - commentTime) / 1000);

        // Xác định đơn vị thời gian phù hợp và trả về chuỗi kết quả tương ứng
        if (diffInSeconds < 5) {
            return "vài giây trước";
        } else if (diffInSeconds < 60) {
            return `${diffInSeconds} giây trước`;
        } else if (diffInSeconds < 3600) {
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            return `${diffInMinutes} phút trước`;
        } else if (diffInSeconds < 86400) {
            const diffInHours = Math.floor(diffInSeconds / 3600);
            return `${diffInHours} giờ trước`;
        } else {
            const diffInDays = Math.floor(diffInSeconds / 86400);
            return `${diffInDays} ngày trước`;
        }
    }
    // Sử dụng hàm getTimeAgo để tính thời gian như "vừa bình luận", "1 giây trước", "1 giờ trước",...

    const saveComment = async () => {
        setLoading(true);

        const formData = new FormData();
        for (let i = 0; i < imageUrlAvatar?.length; i++) {
            formData.append("files", imageUrlAvatar[i].file);
        }
        formData.append("comment", JSON.stringify(valueComment));
        formData.append("user_id", getDataUserLoca()._id);
        formData.append("code_shop", getDataUserLoca().code);
        formData.append("pro_id", id);
        await dispatch(addComments(formData));
        setImageUrlAvatar([]);
        setValueComment(undefined);
        setLoading(false);
    };

    // thêm ảnh comment add
    const addImage = (event) => {
        setLoading(true);
        const src = URL.createObjectURL(event.target.files[0]);
        setImageUrlAvatar([
            ...imageUrlAvatar,
            { url: src, file: event.target.files[0], id: Math.random() },
        ]);
        setLoading(false);
    };
    const removeImageAdd = (e) => {
        const newImage = imageUrlAvatar?.filter((item) => item.id !== e.id);
        setImageUrlAvatar(newImage);
    };
    // thêm ảnh comment upload
    const uploadImage = (event) => {
        setLoading(true);
        const src = URL.createObjectURL(event.target.files[0]);
        setImageUrlAvatarEdit([
            ...imageUrlAvatarEdit,
            {
                url: src,
                file: event.target.files[0],
                image_id: Math.random(),
                status: false,
            },
        ]);
        setLoading(false);

    };

    const removeImageEdit = (e) => {
        const newData = [];
        imageUrlAvatarEdit?.map((item) => {
            if (item.image_id == e.image_id) {
                newData.push({ ...item, status: !item.status });
            } else {
                newData.push(item);
            }
        });
        setImageUrlAvatarEdit(newData);
    };
    const deleteComment = async () => {
        setLoading(true);
        await dispatch(removeComments(comfimRemoveComment.data));
        setLoading(false);
        setComfimRemoveComment({ status: false, data: undefined });
    };

    // thay đổi bình luận
    const handleOk = async () => {
        setLoading(true);
        const image = [];
        imageUrlAvatarEdit?.map((item) => {
            if (item.url !== undefined) {
                if (item.status == false) {
                    image.push({ ...item, check: "add" }); //thêm ẩnh
                }
            } else {
                if (item.status == true) {
                    image.push({ ...item, check: "remove" }); //xóa ẩnh
                } else {
                    image.push({ ...item, check: "1" }); //dữ ẩnh
                }
            }
        });
        const formData = new FormData();
        formData.append("_id", selectEditComment?.data?._id);
        formData.append("value", JSON.stringify(valueEditComment));
        formData.append("image", JSON.stringify(image));
        for (let i = 0; i < image.length; i++) {
            formData.append("files", image[i].file);
        }
        await dispatch(uploadtComments(formData));
        setSelectEditComment({ status: false, data: undefined });
        setImageUrlAvatarEdit();
        setValueEditComment();
        setLoading(false);
    };
    const handleCancel = () => {
        setSelectEditComment({ status: false, data: undefined });
        setValueEditComment(undefined);
    };
    const editorConfig = {
        toolbar: false, // ẩn header
    };


    const onChangePagination = (e) => {
        if (minPage == 0) {

        } else if (maxPage < 10) {
            console.log('3ewds')

            setMinPage(minPage + 3)
            setMaxPage(maxPage + 3)
        } else {
            setMinPage(minPage)
            setMaxPage(maxPage)
        }


    }
    console.log(maxPage, 'maxPage')
    console.log(minPage, 'minPage')
    console.log(comments?.length, ' comments?.length')
    console.log(maxPage, comments?.length, 'maxPage < comments?.length')
    return (
        <div className="comment">
            {loading == true && <Loading />}
            <h4>đánh giá sản phẩm</h4>
            <div className="comment-list">
                <div className="comment-name">
                    <span>Xin chào : </span>
                    <span>@{user?.name} </span>
                </div>
                <div className="comment-input">
                    <div className="comment-avatar">
                        <Avatar
                            size={100}
                            src="https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png"
                        />
                    </div>
                    <div className="input-comment">
                        <CKEditor
                            editor={ClassicEditor}
                            placeholder="Hãy để lại đáng giá của bạn"
                            data={valueComment == undefined ? "" : valueComment}
                            // @ts-ignore
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                startTransition(() => {
                                    setValueComment(data);
                                });
                            }}
                            config={editorConfig}
                        />

                        <Button
                            disabled={
                                String(valueComment).length <= 0 || valueComment == undefined
                                    ? true
                                    : false
                            }
                            onClick={() => saveComment()}
                            style={{ marginTop: 10 }}
                        >
                            Bình luận
                        </Button>
                    </div>
                    <label for="add-image" className="comment-upload-image">
                        <CameraOutlined />
                    </label>
                    <input
                        type="file"
                        id="add-image"
                        name="image"
                        accept="image/*"
                        onChange={addImage}
                    />
                </div>

                {imageUrlAvatar?.length > 0 && (
                    <div className="image-comment" style={{ marginTop: 20 }}>
                        {imageUrlAvatar?.map((item) => {
                            return (
                                <div style={{ position: "relative", borderRadius: 3 }}>
                                    <div className="image-add-comment">
                                        <img src={item?.url} alt="" />
                                    </div>
                                    <div
                                        onClick={() => {
                                            removeImageAdd(item);
                                        }}
                                        className="image-comment-close"
                                    >
                                        <CloseCircleOutlined style={{ fontSize: 17 }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <br></br>
                <div className="comment-user">
                    <h5>đánh giá của khách hàng</h5>
                </div>

                {comments
                    ?.slice()
                    .reverse()
                    .map((item) => {
                        return (
                            <div className="list-comment-user">
                                <div className="list-comment-user-title">
                                    {users?.map((itemUser) => {
                                        if (item.user_id == itemUser._id) {
                                            return (
                                                <div>
                                                    <Avatar
                                                        size={35}
                                                        src={itemUser.avatar}
                                                        style={{ marginRight: 10 }}
                                                    />
                                                    <span>{itemUser.name}</span>-
                                                    <span>{getTimeAgo(item.updatedAt)}</span>
                                                </div>
                                            );
                                        }
                                    })}
                                    {
                                        getDataUserLoca()?._id == item.user_id ? (
                                            <div>
                                                <EditOutlined
                                                    className="list-comment-user-edit"
                                                    onClick={() => {
                                                        setSelectEditComment({
                                                            status: true,
                                                            data: {
                                                                ...item,
                                                                user_name: users?.find(
                                                                    (itemUser) => itemUser._id == item.user_id
                                                                )?.name,
                                                            },
                                                        });
                                                        setValueEditComment(JSON.parse(item.comment));
                                                        const newImage = [];
                                                        item?.photo?.map((item) =>
                                                            newImage.push({ ...item, status: false })
                                                        );
                                                        setImageUrlAvatarEdit(newImage);
                                                    }}
                                                />
                                                <DeleteOutlined
                                                    className="list-comment-user-delete"
                                                    onClick={() =>
                                                        setComfimRemoveComment({ status: true, data: item })
                                                    }
                                                />
                                            </div>
                                        ) : getDataUserLoca()?.role == 0 ?
                                            <DeleteOutlined
                                                className="list-comment-user-delete"
                                                onClick={() =>
                                                    setComfimRemoveComment({ status: true, data: item })
                                                }
                                            />
                                            : (
                                                ""
                                            )}
                                </div>
                                <div style={{ padding: 10 }}>
                                    <p
                                        className="show-comment-user"
                                        dangerouslySetInnerHTML={{
                                            __html: JSON.parse(item.comment),
                                        }}
                                    />
                                    {item.photo.length > 0 && (
                                        <div className="image-comment">
                                            {item.photo.map((itemPhoto) => {
                                                return (
                                                    <div
                                                        className="image-add-comment"
                                                        onClick={() =>
                                                            setSelectPhotoComment(
                                                                selectPhotoComment?._id == item._id &&
                                                                    selectPhotoComment?.image_id ==
                                                                    itemPhoto.image_id
                                                                    ? undefined
                                                                    : {
                                                                        _id: item._id,
                                                                        photo: itemPhoto.photo,
                                                                        image_id: itemPhoto.image_id,
                                                                    }
                                                            )
                                                        }
                                                    >
                                                        <img src={itemPhoto.photo} alt="" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {selectPhotoComment?._id == item._id && (
                                        <div className="image-comment-view">
                                            <img src={selectPhotoComment.photo} alt="" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                <div className="comment-pagination">
                    <Pagination defaultCurrent={1} total={comments?.length} onChange={(e) => onChangePagination(e)} />
                </div>
            </div>

            <Modal
                title="Sửa bình luận"
                open={selectEditComment?.status}
                onOk={handleOk}
                onCancel={handleCancel}
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
                                    setValueEditComment(data);
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
                            onChange={uploadImage}
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
                                                removeImageEdit(item);
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

            <EditComment
                title="Sửa bình luận"
                conent="Xóa sản phẩm"
                btnComfim={() => setIsModalOpenEditComment(false)}
                btnReject={() => setIsModalOpenEditComment(false)}
                data=""
                isModalOpen={isModalOpenEditComment}
            />
            <Comfim
                title="Xóa bình luận"
                conent="Bạn có muốn xóa bình luận này không ?"
                btnComfim={() => {
                    deleteComment();
                }}
                btnReject={() =>
                    setComfimRemoveComment({ status: false, data: undefined })
                }
                isModalOpen={comfimRemoveComment?.status}
            />
        </div>
    );
};

export default Comment;
