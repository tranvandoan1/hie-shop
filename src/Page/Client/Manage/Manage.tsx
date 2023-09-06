import React from 'react'
import Header from '../../../components/Header'
import './manage.css'
import Footer from '../../../components/Footer'
import { RiFileUserLine, RiExchangeLine } from 'react-icons/ri'
import { BsCart4 } from 'react-icons/bs'
import { Outlet, useNavigate } from 'react-router-dom'
type Props = {}

const Manage = (props: Props) => {
const navigator=useNavigate()
    return (
        <div style={{ background: "#e8e8e8" }}>

            <Header />

            <div className='manage'>
                <div className='manage-box'>
                    <div className='manage-left'>
                        <div className='manage-left-file'onClick={()=>navigator('info-user')}>
                            <span>
                                <RiFileUserLine />
                            </span>
                            <span>Hồ sơ</span>
                        </div>
                        <div className='manage-left-edit'onClick={()=>navigator('upload-password')}>
                            <span>
                                <RiExchangeLine />
                            </span>
                            <span>Đổi mật khẩu</span>
                        </div>
                        <div className='manage-left-cart'onClick={()=>navigator('cart')}>
                            <span>
                                <BsCart4 />
                            </span>
                            <span>Đơn hàng</span>
                        </div>
                    </div>
                    <div className='manage-right'>
                        <Outlet/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Manage