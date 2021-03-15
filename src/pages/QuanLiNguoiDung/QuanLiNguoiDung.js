import { Button, Modal } from 'antd';

import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '../../Components/Pagination';
import User from '../../Components/User';
import { addUser, getDataUser, handleInput, searchUser } from '../../redux/actions/QuanLiNguoiDungAction';


export default function QuanLiNguoiDung() {
    const dispatch = useDispatch()
    const mangNguoiDung = useSelector(state => state.QuanLiPhimReducer.mangNguoiDung)

    const userInAdmin = useSelector(state => state.QuanLiPhimReducer.userInAdmin)
    const userType = useSelector(state => state.QuanLiPhimReducer.userType)
    let { taiKhoan, matKhau, soDt, email, hoTen } = userInAdmin.values
    let { khachHang, quanTri } = userType
    // Use State for pagination
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage] = useState(30);
    // Use state for search
    const [searchTerm, setSearchTerm] = useState({ valueSearch: '' })

    //    Use State for Modal
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        dispatch(getDataUser(searchTerm.valueSearch));
        setLoading(false);
    }, [searchTerm.valueSearch])
    //   Get current user ;
    const indexOfLastPage = currentPage * userPerPage;
    const indexOfFirstPage = indexOfLastPage - userPerPage;
    const currentUsers = mangNguoiDung.slice(indexOfFirstPage, indexOfLastPage)
    // Change page :
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Modal
    const showModal = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    // handleChange
    const handleChangeInput = (e) => {
        let { value, name } = e.target;
        let newValues = { ...userInAdmin.values };
        newValues[name] = value;
        console.log(newValues);
        dispatch(handleInput(newValues));
    }
    const handleOk = (e) => {
        e.preventDefault();
        let newUser = userInAdmin.values;
        dispatch(addUser(newUser))
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    let handleInputSearch = (e) => {
        setSearchTerm({ valueSearch: e.target.value })
    }

    return (
        <div className="layout-user">
            <h1 className=" mb-3">Quản lí người dùng</h1>

            <div className="d-flex justify-content-between ">
                <Button type="primary" className="mt-2" onClick={showModal}>
                    Thêm người dùng
                </Button>
                <div className="search-user">
                    <form className="container" >
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Search user" value={searchTerm.valueSearch} onChange={handleInputSearch} />
                            <button disabled className="btn "><i class="fa fa-search"></i></button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                title="Thêm người dùng"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <form className="container" onSubmit={handleOk}>
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
                        <select className="custom-select" name="maLoaiNguoiDung" onChange={handleChangeInput}>
                            <option selected>Open this select menu</option>
                            <option value={khachHang}>Khach Hang</option>
                            <option value={quanTri}>Quan Tri</option>
                        </select>
                    </div>
                </form>
            </Modal>

            <Pagination userPerPage={userPerPage}
                totalUser={mangNguoiDung.length}
                paginate={paginate}
            ></Pagination>
            <User users={currentUsers} loading={loading} ></User>
        </div>
    )
}
