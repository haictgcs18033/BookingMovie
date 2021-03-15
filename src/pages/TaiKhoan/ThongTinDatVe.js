import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadThongTinNguoiDung } from '../../redux/actions/UserAction'
import { USER_LOGIN } from '../../utility/setting'

export default function ThongTinDatVe() {
    let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
    const taiKhoanUserParam = userLogin.taiKhoan
    const userInfo = useSelector(state => state.QuanLiPhimReducer.userInfo)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadThongTinNguoiDung({ taiKhoan: taiKhoanUserParam }))
    }, [])
    console.log(userInfo);
    return (
        <div>
            <h2 className="text-center">Lich su dat ve</h2>
            {!userInfo.thongTinDatVe?.length?<h1>Bạn chưa đặt vé</h1> : 
             userInfo.thongTinDatVe.map((thongTin, index) => {
                return <div key={index} className="card text-left mb-4">
                   <div className="card-header bg-success" style={{fontWeight:'bold',color:'white'}}>Tên phim : {thongTin.tenPhim}</div>
                    <div className="card-body">
                      <div className="row">
                          <div className="col-4 noidungve">
                             <p >Thời lượng</p>
                             <p>Ngày đặt vé</p>
                             <p>Giá vé</p>
                             <p>Ghế ngồi đã đặt</p>
                          </div>
                          <div className="col-8">
                            <p>{thongTin.thoiLuongPhim}</p>  
                            <p>{thongTin.ngayDat}</p>
                            <p>{thongTin.giaVe}</p>
                            <ul>{thongTin.danhSachGhe.map((ghe,index)=>{
                                return <li key={index}>
                                   <span>Ten Rap : </span>
                                   <span>{ghe.tenHeThongRap} - </span>
                                   <span>Rap : </span>
                                   <span>{ghe.tenCumRap} - </span>
                                   <span>So ghe : </span>
                                   <span>{ghe.tenGhe}</span>
                                </li>
                            })}</ul>
                          </div>
                      </div>
                     
                    </div>
                </div>

            })
            }
           

        </div>
    )
}
