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
import { startTransition, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../features/Classifies";
import {
    addComments,
    removeComments,
    uploadtComments,
} from "../../../features/CommentSlice";
import { getDataUserLoca } from "../../../app/getDataLoca";
import { json, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import Comfim from "../../../components/Comfim";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ModalEditComment from "./ModalEditComment";
const { TextArea } = Input;

// @ts-ignore
const Comment = ({ comments, users }) => {
    const navigator = useNavigate();

    const dispatch = useDispatch();
    const user = users?.find((item) => item._id == getDataUserLoca()?._id);

    const { id } = useParams();

    const [state, setState] = useReducer(
        (state, newState) => ({
            ...state,
            ...newState,
        }),
        {
            isModalOpenEditComment: false,
            comfimRemoveComment: {
                status: false,
                data: undefined,
            },
            selectEditComment: {
                status: false,
                data: undefined,
            },
            valueEditComment: undefined,
            selectPhotoComment: undefined,
            imageUrlAvatar: [],
            imageUrlAvatarEdit: [],
            valueComment: undefined,
            loading: false,
            commentsRender: [],
            pageSpacing: Math.ceil(comments?.length / 5),
        }
    );

    // useEffect(() => {
    //     setState({
    //         currentPage: 1,
    //         commentsRender: comments?.slice().reverse().slice(0, 5),
    //     });
    // }, [comments]);
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
        setState({ loading: true });
        const formData = new FormData();
        for (let i = 0; i < state.imageUrlAvatar?.length; i++) {
            formData.append("files", state.imageUrlAvatar[i].file);
        }
        formData.append("comment", JSON.stringify(state.valueComment));
        formData.append("user_id", getDataUserLoca()._id);
        formData.append("code_shop", getDataUserLoca().code); //mã code cmt theo shop
        formData.append("pro_id", id);
        await dispatch(addComments(formData));
        setState({
            imageUrlAvatar: [],
            valueComment: undefined,
            loading: false,
        });
    };

    // thêm ảnh comment add
    const addImage = (event) => {
        setState({ loading: true });
        const src = URL.createObjectURL(event.target.files[0]);
        setState({
            imageUrlAvatar: [
                ...state.imageUrlAvatar,
                { url: src, file: event.target.files[0], id: Math.random() },
            ],
            loading: false,
        });
    };
    const removeImageAdd = (e) => {
        const newImage = state.imageUrlAvatar?.filter((item) => item.id !== e.id);
        setState({
            imageUrlAvatar: newImage,
        });
    };



    const deleteComment = async () => {
        setState({ loading: true });
        await dispatch(removeComments(state.comfimRemoveComment.data));

        setState({
            comfimRemoveComment: { status: false, data: undefined },
            loading: false,
        });
    };

    // thay đổi bình luận
    const handleOk = async (e) => {
        setState({ loading: true });
        const image = [];
        state.imageUrlAvatarEdit?.map((item) => {
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
        formData.append("_id", state.selectEditComment?.data?._id);
        formData.append("value", JSON.stringify(e));
        formData.append("image", JSON.stringify(image));
        for (let i = 0; i < image.length; i++) {
            formData.append("files", image[i].file);
        }
        await dispatch(uploadtComments(formData));

        setState({
            selectEditComment: { status: false, data: undefined },
            imageUrlAvatarEdit: [],
            valueEditComment: [],
            loading: false,
        });
    };

   
    const onChangePagination = (e) => {
        function paginate(array, page_size, page_number) {
            return array.slice(
                (page_number - 1) * page_size,
                page_number * page_size
            );
        }
        // Lấy dữ liệu cho trang cần hiển thị
        const paginatedItems = paginate(comments?.slice().reverse(), 5, e);
        setState({
            commentsRender: paginatedItems,
        });
    };
    ClassicEditor.create(
        document.querySelector( '#editor' ),
        {
            placeholder: 'Type the content here!'
        }
    ).then( editor => {
        console.log( editor );
    } ).catch( error => {
        console.error( error );
    } );
    return (
        <div className="comment">
            {state.loading == true && <Loading />}
            <h4>đánh giá sản phẩm</h4>
            <div className="comment-list">
                <div className="comment-name">
                    <span>Xin chào : </span>
                    <span>@{user?.name} </span>
                </div>
                <div className="comment-input">
                    <div className="comment-avatar">
                        <Avatar src="https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png" />
                    </div>
                    <div className="input-comment">
                        <CKEditor
                            editor={ClassicEditor}
                            data={state.valueComment == undefined ? "" : state.valueComment}
                            // @ts-ignore
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                startTransition(() => {
                                    setState({ valueComment: data });
                                });
                            }}
                            config={{
                                toolbar: false, // ẩn header
                                placeholder:'Hãy để lại đáng giá của bạn...'
                            }}
                        />

                        <Button
                            disabled={
                                String(state.valueComment).length <= 0 ||
                                    state.valueComment == undefined
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

                {state.imageUrlAvatar?.length > 0 && (
                    <div className="image-comment" style={{ marginTop: 20 }}>
                        {state.imageUrlAvatar?.map((item) => {
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

                {comments?.slice()?.reverse()?.map((item) => {
                    const timeCreatedAt = new Date(item.createdAt);
                    const timeUpdatedAt = new Date(item.updatedAt);
                    return (
                        <div className="list-comment-user">
                            <div className="list-comment-user-title">
                                {users?.map((itemUser) => {
                                    if (item.user_id == itemUser._id) {
                                        return (
                                            <div className="info-user-comment">
                                                <Avatar
                                                    size={35}
                                                    src={itemUser.avatar}
                                                    style={{ marginRight: 10 }}
                                                />

                                                <div className="name-user-time">
                                                    <div className="user-time">
                                                        <span>{itemUser.name}</span>-
                                                        <span>{getTimeAgo(item.createdAt)}</span>
                                                    </div>

                                                    {itemUser.code == getDataUserLoca().code && (
                                                        <span>Tác giả</span>
                                                    )}

                                                    {/* so sáng xem cmt có chỉnh sửa ko */}

                                                    {(timeCreatedAt.getHours() !==
                                                        timeUpdatedAt.getHours() ||
                                                        timeCreatedAt.getSeconds() !==
                                                        timeUpdatedAt.getSeconds() ||
                                                        timeCreatedAt.getMilliseconds() !==
                                                        timeUpdatedAt.getMilliseconds() ||
                                                        timeCreatedAt.getFullYear() !==
                                                        timeUpdatedAt.getFullYear() ||
                                                        timeCreatedAt.getMonth() + 1 !==
                                                        timeUpdatedAt.getMonth() + 1 ||
                                                        timeCreatedAt.getDate() !==
                                                        timeUpdatedAt.getDate()) && <span>Đã sửa</span>}
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                                {getDataUserLoca()?._id == item.user_id ? (
                                    <div>
                                        <EditOutlined
                                            className="list-comment-user-edit"
                                            onClick={() => {
                                                const newImage = [];
                                                item?.photo?.map((item) =>
                                                    newImage.push({ ...item, status: false })
                                                );
                                                setState({
                                                    selectEditComment: {
                                                        status: true,
                                                        data: {
                                                            ...item,
                                                            user_name: users?.find(
                                                                (itemUser) => itemUser._id == item.user_id
                                                            )?.name,
                                                        },
                                                    },
                                                    valueEditComment: JSON.parse(item.comment),
                                                    imageUrlAvatarEdit: newImage,
                                                });
                                            }}
                                        />
                                        <DeleteOutlined
                                            className="list-comment-user-delete"
                                            onClick={() =>
                                                setState({
                                                    comfimRemoveComment: { status: true, data: item },
                                                })
                                            }
                                        />
                                    </div>
                                ) : getDataUserLoca()?.role == 0 ? (
                                    <DeleteOutlined
                                        className="list-comment-user-delete"
                                        onClick={() =>
                                            setState({
                                                comfimRemoveComment: { status: true, data: item },
                                            })
                                        }
                                    />
                                ) : (
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
                                                        setState({
                                                            selectPhotoComment:
                                                                state.selectPhotoComment?._id == item._id &&
                                                                    state.selectPhotoComment?.image_id ==
                                                                    itemPhoto.image_id
                                                                    ? undefined
                                                                    : {
                                                                        _id: item._id,
                                                                        photo: itemPhoto.photo,
                                                                        image_id: itemPhoto.image_id,
                                                                    },
                                                        })
                                                    }
                                                >
                                                    <img src={itemPhoto.photo} alt="" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                {state.selectPhotoComment?._id == item._id && (
                                    <div className="image-comment-view">
                                        <img src={state.selectPhotoComment.photo} alt="" />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                <div className="comment-pagination">

                    <span className="showAll-comment"
                        onClick={() => navigator(`comment-detail`)}
                    >Xem tất cả</span>
                    <Pagination
                        defaultCurrent={state.currentPage}
                        total={comments?.length}
                        pageSize={Math.ceil(comments?.length / 5)}
                        onChange={(e) => onChangePagination(e)}
                    />

                </div>
            </div>

            <ModalEditComment
                open={state.selectEditComment?.status}
                handleCancel={() =>
                    setState({
                        selectEditComment: { status: false, data: undefined },
                    })
                }
                imageUrlAvatarEdit={state.imageUrlAvatarEdit}
                uploadImage={(e) => {
                    setState({
                        imageUrlAvatarEdit: e
                    })
                }}
                valueEditComment={state.valueEditComment}
                handleOk={(e) => handleOk(e)}
            />

            <EditComment
                title="Sửa bình luận"
                conent="Xóa sản phẩm"
                btnComfim={() => setState({ isModalOpenEditComment: false })}
                btnReject={() => setState({ isModalOpenEditComment: false })}
                data=""
                isModalOpen={state.isModalOpenEditComment}
            />
            <Comfim
                title="Xóa bình luận"
                conent="Bạn có muốn xóa bình luận này không ?"
                btnComfim={() => {
                    deleteComment();
                }}
                btnReject={() =>
                    setState({ comfimRemoveComment: { status: false, data: undefined } })
                }
                isModalOpen={state.comfimRemoveComment?.status}
            />
        </div>
    );
};

export default Comment;
