import React, { useCallback, useRef } from 'react'
import "./css/comment.css";
import { Avatar, Button, Input, Modal, Pagination, Image, Badge, message, Skeleton } from "antd";
import {

    ArrowLeftOutlined,
    ArrowUpOutlined,
    DeleteOutlined,
    EditOutlined,
    ShoppingCartOutlined,

} from "@ant-design/icons";

import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDataUserLoca } from "../../../app/getDataLoca";
import { json, useNavigate, useParams } from "react-router-dom";

import { getAllUser } from '../../../features/UserSlice';
const { TextArea } = Input;
import LZString from "lz-string";
import { getAllComment, removeComments, uploadtComments } from '../../../features/CommentSlice';
import { getSaveOrderAll } from '../../../features/SaveOrderSlice';
import ModalEditComment from './ModalEditComment';
import Comfim from '../../../components/Comfim';
import InfiniteScroll from 'react-infinite-scroll-component';
// @ts-ignore
const CommentMobile = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    // const user = users?.find((item) => item._id == getDataUserLoca()?._id);
    const users = useSelector((data) => data.users.users);
    const comments = useSelector((data) => data.comments.value);
    const saveorders = useSelector((data) => data.saveorders.value);
    console.log(users, 'users')
    const { id, name } = useParams();
    document.title = name;//set tên title

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
        }
    );

    // Sử dụng hàm getTimeAgo để tính thời gian như "vừa bình luận", "1 giây trước", "1 giờ trước",...
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
    // @ts-ignore
    const decodedString = localStorage.getItem('data') == null ? '' : JSON.parse(LZString.decompressFromBase64(localStorage.getItem('data')));
    const [cudent, setCudent] = useState(4)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getAllComment());
        dispatch(getSaveOrderAll());
        window.scroll(0, 0);

        dispatch(getAllUser({ check: 2, token: decodedString?.token }));
    }, []);

    console.log(comments, 'commentPro')
    console.log(decodedString, 'decodedString')




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
        message.success('Sửa thành công')
    };


    const deleteComment = async () => {
        setState({ loading: true });
        await dispatch(removeComments(state.comfimRemoveComment.data));

        setState({
            comfimRemoveComment: { status: false, data: undefined },
            loading: false,
        });
    };


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className='show-comment-detail'>
            <div className='show-comment-detail-header'>
                <ArrowLeftOutlined onClick={() => navigator(`/detail/${name.replace(/\s+/g, "-")}/${id}`)
                } />
                <span className='header-text'>Đánh giá</span>
                <Badge count={saveorders?.length} onClick={() => navigator("/cart")}>
                    <ShoppingCartOutlined />
                </Badge>
            </div>
            <div className='list-comment-mobile'>

                {comments?.slice().reverse().map((item, index) => {
                    const timeCreatedAt = new Date(item.createdAt);
                    const timeUpdatedAt = new Date(item.updatedAt);
                    return (
                        <div className="list-comment-user" >
                            {index + 1}
                            <div className="list-comment-user-title">
                                {users?.data?.map((itemUser) => {
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
                                                            user_name: users?.data?.find(
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

            </div>
            {
                loading == true &&
                <div style={{ background: '#fff' }}>
                    <Skeleton
                        avatar
                        paragraph={{
                            rows: 4,
                        }}
                    />
                </div>
            }

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

            <Button className='arrowUpOutlined' onClick={()=>scrollToTop()}><ArrowUpOutlined /></Button>
        </div>
    )
}

export default CommentMobile