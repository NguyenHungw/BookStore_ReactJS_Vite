import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi';
import { VscSearchFuzzy } from 'react-icons/vsc';
import { Divider, Badge, Drawer, notification, message } from 'antd';
import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { callLogOutAccount } from '../../services/api.service';
import { doLogOutAction } from '../../redux/account/accountSlice';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const role = user.role
    const navigate = useNavigate();
    const dispath = useDispatch();
    console.log("check user>>>",user)
    const handleLogout = async() => {
        const res = await callLogOutAccount()
        if(res?.data){
            notification.success({
                message:'Đăng Xuất',
                description:'Đăng Xuất Thành Công'
            })
            navigate('/')
            dispath(doLogOutAction())
        }
    }
    const items = [
        {
            label: (
                <label>
                    <Link to={'/v'}>Test</Link>
                </label>
            ),
            key: 'v',
        },
        {
            label: (
                <label>
                    cxz
                </label>
            ),
            key: 'v3',
        },
        isAuthenticated && role ==='ADMIN'
            ? {
                  label: (
                      <label>
                          <Link to={'/admin'} >Quản lý tài khoản</Link>
                      </label>
                  ),
                  key: 'admin',
              }
            : null, // không hiển thị nếu isLoading = false
        {
            label: <label onClick={handleLogout}>Đăng xuất</label>,
            key: 'logout',
        },
    ].filter(item => item !== null); // Lọc ra các item null


    return (
        <>
            <div className='header-container'>
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className='page-header__logo'>
                            <span className='logo'>
                                <FaReact className='rotate icon-react' /> Hỏi Dân IT
                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                            />
                        </div>

                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Badge
                                    count={5}
                                    size={"small"}
                                >
                                    <FiShoppingCart className='icon-cart' />
                                </Badge>
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                Welcome {user?.fullName}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Quản lý tài khoản</p>
                <Divider />

                <p>Đăng xuất</p>
                <Divider />
            </Drawer>
        </>
    )
};

export default Header;
