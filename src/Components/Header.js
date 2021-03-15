import React from 'react'
import { NavLink } from 'react-router-dom'
import { USER_LOGIN } from '../utility/setting'


export default function Header() {
    let taiKhoan = JSON.parse(localStorage.getItem(USER_LOGIN))
    let logout = () => {
        window.localStorage.clear()
    }
    return (
        <header>
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/trangchu">
                            {/* <img src="./img/movie-logo.jpg" /> */}
                            <span>Cybersoft Movie</span>
                        </NavLink>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#movieNavBar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="movieNavBar">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/trangchu">Trang chủ</NavLink>
                                </li>

                                <li className="nav-item">

                                    {
                                        localStorage.getItem(USER_LOGIN)
                                            ?
                                            <>
                                                {taiKhoan.maLoaiNguoiDung === 'KhachHang' ?
                                                    <li class="nav-item dropdown">
                                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            {`Hello ${taiKhoan.hoTen}`}
                                                        </a>

                                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <NavLink className="dropdown-item" to={`/thongtintaikhoan/${taiKhoan.taiKhoan}`} id="navbarDropdown" >
                                                               Thông tin tài khoản
                                                            </NavLink>
                                                            <NavLink className="dropdown-item" to="/dangnhap" onClick={() => {
                                                                logout()
                                                            }}>Đăng xuất</NavLink>
                                                        </div>
                                                    </li>
                                                    :
                                                    <li class="nav-item dropdown">
                                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <span><i className="fa fa-angle-left"></i></span>
                                                            <span>Hello</span>
                                                            <span>{` ${taiKhoan.hoTen}`}</span>
                                                            <span><i className="fa fa-angle-down ml-2"></i></span>
                                                        </a>
                                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <NavLink className="dropdown-item" to={`/admin`} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                {`Hello ${taiKhoan.hoTen}`}
                                                            </NavLink>
                                                            <NavLink className="dropdown-item" to="/dangnhap" onClick={() => {
                                                                logout()
                                                            }}>Đăng xuất</NavLink>
                                                        </div>
                                                    </li>
                                                }
                                            </>
                                            :
                                            <NavLink className="nav-link" to="/dangnhap">Đăng Nhập</NavLink>
                                    }

                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dangky">Đăng kí</NavLink>
                                </li>



                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}
