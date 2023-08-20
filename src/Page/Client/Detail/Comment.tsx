import "./comment.css";
import { Avatar, Input, Pagination } from 'antd';
import { CameraOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import EditComment from "../../../components/EditComment";
import { useState } from "react";
const { TextArea } = Input;
type Props = {}

// @ts-ignore
const Comment = (props: Props) => {
    const [isModalOpenEditComment, setIsModalOpenEditComment] = useState(false);
    function getTimeAgo(commentTime: any) {
        // Lấy thời gian hiện tại
        const now: any = new Date();

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
    const commentTime: any = new Date();
    const timeAgo = getTimeAgo(commentTime);
    console.log(timeAgo, 'aewqdsa'); // Kết quả: "2 ngày trước"

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
                    <TextArea rows={4} placeholder='Hãy để lại đáng giá của bạn' />
                    <CameraOutlined className='comment-upload-image' />
                </div>


                <div className='comment-user'>
                    <h5>đánh giá của khách hàng</h5>

                </div>
                <div className='list-comment-user'>
                    <div className='list-comment-user-title'>
                        <div>
                            <Avatar size={35} src='https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png' style={{ marginRight: 10 }} />
                            <span>tranvandoan</span>-<span>{timeAgo}</span>
                        </div>
                        <div>
                            <EditOutlined className='list-comment-user-edit' onClick={() => setIsModalOpenEditComment(true)} />
                            <DeleteOutlined className='list-comment-user-delete' />
                        </div>
                    </div>
                    <div style={{ padding: 10 }}>
                        <div className='show-comment-user'>
                            ádasdaslkdadladlk
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

                <div className='list-comment-user'>
                    <div className='list-comment-user-title'>
                        <div>
                            <Avatar size={35} src='https://d1kwj86ddez2oj.cloudfront.net/20012022/LyI7mmcKHBzRnwUhxCWvbMkiJEVEtRPWIusualKm.png' style={{ marginRight: 10 }} />
                            <span>tranvandoan</span>-<span>{timeAgo}</span>
                        </div>
                        <div>
                            <EditOutlined className='list-comment-user-edit' />
                            <DeleteOutlined className='list-comment-user-delete' />
                        </div>
                    </div>
                    <div style={{ padding: 10 }}>
                        <div className='show-comment-user'>
                            ádasdaslkdadladlk
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