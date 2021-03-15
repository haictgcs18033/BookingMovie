import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { dangNhapAction } from '../../redux/actions/QuanLiNguoiDungAction';


export default function DangNhap(props) {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        taiKhoan: '',
        matKhau: ''
    })
    console.log(state);
    const handleChangeInput = e => {
        let { name, value } = e.target
        setState({ ...state, [name]: value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(dangNhapAction(state, props))
        console.log(state);
    }
    return (
        <div className="wrapper">
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <h1 >Dang nhap</h1>
                    <div className="input-group">
                        <label>Tai khoan</label>
                        <input name="taiKhoan" onChange={handleChangeInput} />
                    </div>
                    <div className="input-group">
                        <label>Mat khau</label>
                        <input name="matKhau" onChange={handleChangeInput} />
                    </div>
                    <div className="d-flex my-3">
                        <button className="btn-login  " style={{ marginRight: '1rem' }}>
                            <span className="login-text">Dang Nhap</span>
                            <span className="overlay"></span>
                        </button>
                        <NavLink className="btn btn-primary" to="/dangky">Dang ky
                            </NavLink>
                    </div>

                </form>
            </div>
        </div>

    )
}
