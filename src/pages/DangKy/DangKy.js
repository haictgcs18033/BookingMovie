import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { handleInput, signup } from '../../redux/actions/QuanLiNguoiDungAction'


export default function DangKy(props) {
   const user = useSelector(state => state.QuanLiPhimReducer.user)
   const dispatch = useDispatch()
   let { taiKhoan, matKhau, email, soDT, hoTen } = user.values
   let handleChangeInput = (e) => {
      let { value, name } = e.target;
      const newValues = { ...user.values };
      newValues[name] = value
      dispatch(handleInput(newValues))
   }
   let userInfor = user.values;
   let handleSubmit = (e) => {
      e.preventDefault();
      dispatch(signup(userInfor, props))
      console.log(userInfor);
   }
   return (
      <div className="wrapper">
         <div className="signup-box">
            <form className="container" onSubmit={handleSubmit}>
               <h3 className="text-center">Dang ki nguoi dung</h3>
                     <div className="form-group">
                        <label>Tai khoan</label>
                        <input className="form-control" type="text" name="taiKhoan"
                           value={taiKhoan}
                           onChange={handleChangeInput} />
                        {hoTen}
                     </div>
                     <div className="form-group">
                        <label>Mat khau</label>
                        <input className="form-control" type="text" name="matKhau" value={matKhau} onChange={handleChangeInput} />
                     </div>
                     <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="text" name="email" value={email} onChange={handleChangeInput} />
                     </div>
                     <div className="form-group">
                        <label>So dien thoai</label>
                        <input className="form-control" type="text" name="soDT" value={soDT} onChange={handleChangeInput} />
                     </div>
                     <div className="form-group">
                        <label>Ho ten</label>
                        <input className="form-control" type="text" name="hoTen" value={hoTen} onChange={handleChangeInput} />
                     </div>
                     <button className="btn btn-success">Dang ky</button>
                     <NavLink className="btn btn-secondary ml-2" to="/dangnhap">Tro ve</NavLink>

            </form>
         </div>
      </div>

   )
}
