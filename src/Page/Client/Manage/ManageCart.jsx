import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @ts-ignore
import { getOrder } from '../../../features/Order';
import { useNavigate } from 'react-router-dom';


const ManageCart = () => {
    const dispatch = useDispatch()
    const navigator=useNavigate()
    const orders = useSelector((data) => data.orders.value)
    useEffect(() => {
        dispatch(getOrder())
    }, [])
    return (
        <div>
            <h5>Đơn hàng của tôi</h5>
            <hr />

            <div className='manage-cart-list-title'>
                <span>Mã đơn hàng</span>
                <span>Số tiền</span>
                <span>Số đơn hàng</span>
                <span>Trạng thái</span>
            </div>
            <div className='manage-cart-list-value'>
                {orders?.length<=0?
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20,color:'red',fontWeight:'500'}}>
                    <span>Chưa có đơn hàng</span>

                </div>
                :
                    orders?.map((item) => {
                        return (
                            <div className='manage-cart-list' onClick={()=>navigator(`${item._id}`)}>
                                <span>#{item._id}</span>
                                <span className='manage-cart-price'>{item.price.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</span>
                                <span>{JSON.parse(item.values).length}</span>
                                <span className='manage-cart-status'>{item.status == 1 ? 'Đang xử lý' : item.status == 2 ? 'Đã xác nhận' : 'Thành công'}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ManageCart