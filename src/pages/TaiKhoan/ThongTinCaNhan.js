import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeInfo, handleUserInput, loadThongTinNguoiDung } from '../../redux/actions/UserAction';
import { USER_LOGIN } from '../../utility/setting';

export default function ThongTinCaNhan(props) {
    let userLogin=JSON.parse(localStorage.getItem(USER_LOGIN))
    const taiKhoanUserParam = userLogin.taiKhoan
    // props.match.params.taiKhoan
    const userInfo = useSelector(state => state.QuanLiPhimReducer.userInfo)
    const userInfoUpdate=useSelector(state=>state.QuanLiPhimReducer.userInfoUpdate)
    let {hoTen,email,soDT,matKhau}=userInfoUpdate.values
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadThongTinNguoiDung({taiKhoan:taiKhoanUserParam}))
    }, [])

    let handleChangeInput=(e)=>{
     let {value,name}=e.target
     let newValues={...userInfoUpdate.values}
     newValues[name]=value
     dispatch(handleUserInput(newValues))
    }
    let handleSubmit=(e)=>{
      e.preventDefault()
      let userNewInfo=userInfoUpdate.values
      dispatch(handleChangeInfo(userNewInfo,props))
    }
    console.log(userInfo);
    return (
        <div className="thongtincanhan">
            <div className="card ">
                <div className="card-header bg-danger">
                <h3 className="mb-0">Thông tin cá nhân</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <p>Tên</p>
                            <p>Mật khẩu</p>
                            <p>Email</p>
                            <p>Số điện thoại</p>
                        </div>
                        <div className="col-8">
                            <p>{userInfo.hoTen}</p>
                            <p>{userInfo.matKhau}</p>
                            <p>{userInfo.email}</p>
                            <p>{userInfo.soDT}</p>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div>
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-primary" data-toggle="modal" 
                        data-target="#exampleModal"
                        onClick={()=>{
                            dispatch({
                                type:'SUA_THONG_TIN',
                                user:userInfo
                            })
                        }}>
                           Chỉnh sửa thông tin
                        </button>
                        {/* Modal */}
                        <form className="modal fade " id="exampleModal" tabIndex={-1} 
                        role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
                        onSubmit={handleSubmit}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Chinh sua thong tin</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>Ten</label>
                                            <input type="text" className="form-control" name="hoTen" value={hoTen}
                                            onChange={handleChangeInput} />
                                        </div>
                                        <div className="form-group">
                                            <label>Mat khau</label>
                                            <input type="text" className="form-control" name="matKhau" value={matKhau}
                                            onChange={handleChangeInput}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" name="email" value={email}
                                            onChange={handleChangeInput}/>
                                        </div>
                                        <div className="form-group">
                                            <label>So dien thoai</label>
                                            <input type="text" className="form-control" name="soDT" value={soDT}
                                            onChange={handleChangeInput}/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" >Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    )
}
