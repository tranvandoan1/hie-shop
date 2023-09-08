import "./css/comment.css";
import { Avatar, Button, Input, Pagination } from 'antd';
import { CameraOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import EditComment from "../../../components/EditComment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../features/Classifies";
import { addComments } from "../../../features/CommentSlice";
import { getDataUserLoca } from "../../../app/getDataLoca";
import { useParams } from "react-router-dom";
const { TextArea } = Input;

// @ts-ignore
const Comment = ({ comments, users }) => {
    console.log(comments, 'comments')
    const dispatch = useDispatch()
    const { id } = useParams()
    const [isModalOpenEditComment, setIsModalOpenEditComment] = useState(false);
    const [imageUrlAvatar, setImageUrlAvatar] = useState(
        { url: undefined, file: undefined }
    );
    const [valueComment, setValueComment] = useState();
    const [loading, setLoading] = useState(false);
    function getTimeAgo(commentTime) {
        // Lấy thời gian hiện tại
        const now = new Date();

        // Tính khoảng thời gian (tính bằng giây)
        const diffInSeconds = Math.floor((now - commentTime) / 1000);

        // Xác định đơn vị thời gian phù hợp và trả về chuỗi kết quả tương ứng
        if (diffInSeconds < 5) {
            return 'vài giây trước';
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
    const commentTime = new Date();
    const timeAgo = getTimeAgo(commentTime);
    console.log(timeAgo, 'aewqdsa'); // Kết quả: "2 ngày trước"

    const saveComment = async () => {
        // console.log(valueComment,'3ewds')
        const newComment = {
            comment: valueComment,
            user_id: getDataUserLoca()._id,
            code_shop: getDataUserLoca().code,
            pro_id: id
        }
        // console.log(newComment,'2eweds')
        await dispatch(addComments(newComment))
    }

    const uploadImage = (event) => {
        setLoading(true);
        const src = URL.createObjectURL(event.target.files[0]);
        // console.log(src,'src')
        // setImageUrlAvatar({ url: src, file: file });
        // setLoading(false);
        console.log(src, ' src')
    }


    return (
        <div className='comment'>
            <h4>đánh giá sản phẩm</h4>
            <div className='comment-list'>

                <div className='comment-name'>
                    <span >Xin chào : </span>
                    <span>@tranvandoan </span>
                </div>
                <div className='comment-input'>
                    <div className='comment-avatar'>
                        <Avatar size={100} src='https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png' />
                    </div>
                    <div className="input-comment">
                        <TextArea rows={4} placeholder='Hãy để lại đáng giá của bạn' onChange={(e) => setValueComment(e.target.value)} />
                        <Button onClick={() => saveComment()} style={{ marginTop: 10 }}>Bình luận</Button>
                    </div>
                    <label for="upload-image" className='comment-upload-image'>
                        <CameraOutlined />
                    </label>
                    <input type="file" id="upload-image" name="image" accept="image/*" onChange={uploadImage} />

                </div>
                <br></br>
                <div className='comment-user'>
                    <h5>đánh giá của khách hàng</h5>

                </div>

                {
                    comments?.slice().reverse().map(item => {
                        return (
                            <div className='list-comment-user'>
                                <div className='list-comment-user-title'>
                                    <div>
                                        <Avatar size={35} src='https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png' style={{ marginRight: 10 }} />
                                        <span>{
                                            users?.map(itemUser => {
                                                if (item.user_id == itemUser._id) {
                                                    return (
                                                        itemUser.name
                                                    )
                                                }
                                            })

                                        }</span>-<span>{timeAgo}</span>
                                    </div>
                                    <div>
                                        <EditOutlined className='list-comment-user-edit' />
                                        <DeleteOutlined className='list-comment-user-delete' />
                                    </div>
                                </div>
                                <div style={{ padding: 10 }}>
                                    <div className='show-comment-user'>
                                        {item.comment}
                                    </div>

                                    <div className='image-comment'>
                                        <div>
                                            <img src="https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png" alt="" />
                                        </div>
                                        <div>
                                            <img src="https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png" alt="" />
                                        </div>
                                        <div>
                                            <img src="https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png" alt="" />
                                        </div>
                                    </div>
                                    <div className='image-comment-view'>
                                        <img src="https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <div className='comment-pagination'>
                    <Pagination defaultCurrent={1} total={50} />
                </div>

            </div>
            <EditComment
                title="Sửa bình luận"
                conent="Xóa sản phẩm"
                btnComfim={() => setIsModalOpenEditComment(false)}
                btnReject={() => setIsModalOpenEditComment(false)}
                data=''
                isModalOpen={isModalOpenEditComment}
            />
        </div>
    )
}

export default Comment