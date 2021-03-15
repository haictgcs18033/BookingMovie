import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAdmin, handleInput, handleUpdateUser } from '../redux/actions/QuanLiNguoiDungAction'
import { SUA_NGUOI_DUNG } from '../redux/const/ConstBookingMovie'

export default function User({ users, loading}) {

    const userInAdmin = useSelector(state => state.QuanLiPhimReducer.userInAdmin)
    const userType = useSelector(state => state.QuanLiPhimReducer.userType)
    const dispatch = useDispatch()
    let { taiKhoan, matKhau, hoTen, email, soDt, maLoaiNguoiDung } = userInAdmin.values
    let { khachHang, quanTri } = userType
    if (loading) {
        return <h2>Loading...</h2>
    }
    // console.log(users);
    let deleteUser = (taiKhoanUser) => {
        dispatch(deleteUserAdmin(taiKhoanUser))
    }
    let handleChangeInput = (e) => {
        let { value, name } = e.target
        let newValues = { ...userInAdmin.values };
        newValues[name] = value;
        dispatch(handleInput(newValues))
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        let userUpdate = userInAdmin.values
        dispatch(handleUpdateUser(userUpdate))
    }
    return (
        <div>
            <table className="container">
                <thead className="bg-warning ">
                    <tr className="font-weight-bold user-info">
                        <th>STT</th>
                        <th>Tài khoản</th>
                        <th>Mật khẩu</th>
                        <th>Họ Tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Loại người dùng</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="bg-light ">
                    {users.map((user, index) => {
                        return <tr key={index} className="user-content">
                            <td className="text-dark" style={{fontWeight:"bold",fontSize:'20px'}}>{index + 1}</td>
                            <td>{user.taiKhoan}</td>
                            <td>{user.matKhau}</td>
                            <td>{user.hoTen}</td>
                            <td>{user.email}</td>
                            <td>{user.soDt}</td>
                            <td>{user.maLoaiNguoiDung}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteUser(user.taiKhoan)}>Xoá</button>
                            </td>
                            <td>
                                <button type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => {
                                        dispatch({
                                            type: SUA_NGUOI_DUNG,
                                            userUpdate: user
                                        })
                                    }}>
                                    Sửa
                                </button>
                                {/* Modal */}
                                <form className="modal fade"
                                    id="exampleModal"
                                    tabIndex={-1}
                                    role="dialog"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Chinh sua nguoi dung</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div className="modal-body" >
                                                <div className="d-flex mb-2">
                                                    <label className="mb-0 mr-2">Username</label>
                                                    <input type="text" className="form-control" name="taiKhoan" value={taiKhoan}
                                                        onChange={handleChangeInput}></input>
                                                </div>
                                                <div className="d-flex  mb-2">
                                                    <label className="mb-0 mr-2">Password</label>
                                                    <input type="text" className="form-control" name="matKhau" value={matKhau}
                                                        onChange={handleChangeInput}></input>
                                                </div>
                                                <div className="d-flex  mb-2">
                                                    <label className="mb-0 mr-2">Name</label>
                                                    <input type="text" className="form-control" name="hoTen" value={hoTen}
                                                        onChange={handleChangeInput}></input>
                                                </div>
                                                <div className="d-flex  mb-2">
                                                    <label className="mb-0 mr-2">Email</label>
                                                    <input type="text" className="form-control" name="email" value={email}
                                                        onChange={handleChangeInput}></input>
                                                </div>
                                                <div className="d-flex  mb-2">
                                                    <label className="mb-0 mr-2">Phone</label>
                                                    <input type="text" className="form-control" name="soDt" value={soDt}
                                                        onChange={handleChangeInput}></input>
                                                </div>
                                                <div className="d-flex  mb-2">
                                                    <label>Loai nguoi dung</label>
                                                    <select className="custom-select" name="maLoaiNguoiDung" onChange={handleChangeInput} value={maLoaiNguoiDung}>
                                                        <option selected>Open this select menu</option>
                                                        <option value={khachHang}>Khach Hang</option>
                                                        <option value={quanTri}>Quan Tri</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                <button type="submit" className="btn btn-primary">Lưu</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>


        </div>
    )
}
