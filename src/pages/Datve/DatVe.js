import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datVeAction, layThongTinDatVeAction } from '../../redux/actions/QuanLiDatVeAction';
import { USER_LOGIN } from '../../utility/setting';

export default function DatVe(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        let { maLichChieu } = props.match.params;
        dispatch(layThongTinDatVeAction(maLichChieu))
    }, [])
    const thongTinPhongVe = useSelector(state => state.QuanLiPhimReducer.thongTinPhongVe)
    const danhSachGheDangDat = useSelector(state => state.QuanLiPhimReducer.danhSachGheDangDat)
    console.log(danhSachGheDangDat);

    const renderGheNgoi = () => {
        return thongTinPhongVe.danhSachGhe?.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheThuong = ghe.loaiGhe === 'Thuong' ? 'gheThuong' : '';
            // Ghe da dat
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let disabled = false;
            if (ghe.daDat === true) {
                disabled = true;
            }
            // Ghe dang dat
            let indexGheDangDat = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.maGhe === ghe.maGhe)
            let classGheDangDat = indexGheDangDat !== -1 ? 'gheDangDat' : '';
            return <>
                <button className={`ghe ${classGheVip} ${classGheThuong} ${classGheDaDat} ${classGheDangDat} `}
                    disabled={disabled}
                    onClick={() => {
                        dispatch({
                            type: 'GHE_DANG_DAT',
                            gheDangDat: {
                                maGhe: ghe.maGhe,
                                loaiGhe: ghe.loaiGhe,
                                giaVe: ghe.giaVe,
                                maGhe: ghe.maGhe,
                                stt: ghe.stt,
                                tenGhe: ghe.tenGhe
                            }
                        })
                    }}>
                    {ghe.daDat === true ? 'X' : ghe.tenGhe}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </>
        })
    }
    console.log(thongTinPhongVe);

    return (
        <div className="container-fluid p-0 datve-wrapper" >
            <div className="booking-step d-flex">
                {
                    danhSachGheDangDat.length === 0 ?
                        <>
                            <p className="active">01. Chọn Ghế</p>
                            <p>02. Đặt Vé</p>
                        </> :
                        <>
                            <p >01. Chọn Ghế</p>
                            <p className="active">02. Đặt Vé</p>
                        </>
                }

            </div>
            <div className="container-fluid title-mobile ">
                <img src={thongTinPhongVe.thongTinPhim?.hinhAnh} className="rounded-circle" />
                <h2 >{thongTinPhongVe.thongTinPhim?.tenPhim}</h2>
            </div>
            <div className="container-fluid p-0">
                <div className="row m-0">
                    <div className="col-md-12 col-lg-8 col-xl-8 danhSachGhe">
                        <div className=" text-light mt-3 screen"><p className="text-center mb-0">Màn hình</p></div>
                        <div className="ghe-user">
                            {renderGheNgoi()}
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-4 px-0">
                        <div className="thongTinDatVe">
                            
                                <div className="giaTien">
                                    <p>
                                        {danhSachGheDangDat.reduce((tongTien, gheDangDat, index) => {
                                            tongTien += gheDangDat.giaVe
                                            return tongTien;
                                        }, 0).toLocaleString()}
                                    </p>
                                </div>
                                <div className="gheDat">
                                    <div className="d-flex justify-content-between ">
                                        <p className="mb-0" style={{ fontWeight: 'bold' }}>Ghế</p>
                                        {danhSachGheDangDat.length === 0 ? '' :
                                            <button onClick={(() => (dispatch({
                                                type: 'CLEAR_GHE',
                                            })))}> Clear all </button>
                                        }
                                    </div>
                                    {danhSachGheDangDat.length === 0 ? '' :
                                        <div className="ghe-container" >
                                            {
                                                danhSachGheDangDat.map((gheDangDat, index) => {
                                                    return <>
                                                        <span className="soGhe " key={index}>
                                                            {gheDangDat.stt}
                                                        </span>
                                                        {(index + 1) % 6 === 0 ? <br /> : ''}
                                                    </>
                                                })
                                            }
                                        </div>
                                    }

                                </div>
                                <div className="col-12 p-0 mt-3">
                                    <h3><span className="title">{thongTinPhongVe.thongTinPhim?.tenPhim}</span></h3>
                                    <div className="hinhAnhPhim">
                                        <img src={thongTinPhongVe.thongTinPhim?.hinhAnh} />
                                    </div>
                                </div>
                                <div className="col-12 p-0 thongTinChiTiet">
                                    <p><span className="title">Cụm rạp : </span><span>{thongTinPhongVe.thongTinPhim?.tenCumRap}</span></p>
                                    <p><span className="title">Địa chỉ : </span><span>{thongTinPhongVe.thongTinPhim?.diaChi}</span></p>
                                    <p>
                                        <span className="title">Giờ chiếu : </span><span className="mr-2">{thongTinPhongVe.thongTinPhim?.gioChieu}</span>
                                    </p>
                                    <p> <span className="title">Ngày Chiếu : </span><span>{thongTinPhongVe.thongTinPhim?.ngayChieu}</span></p>
                                    {
                                        danhSachGheDangDat.length === 0 ?
                                            <button className="btn btn-disable" disabled>Đặt Vé</button> :
                                            <button className="btn btn-confirm"
                                                onClick={() => {
                                                    if (localStorage.getItem(USER_LOGIN)) {
                                                        //  Lay user login tu local storage
                                                        let taiKhoanNguoiDung = JSON.parse(localStorage.getItem(USER_LOGIN))
                                                        let thongTinVe = {
                                                            "maLichChieu": props.match.params.maLichChieu,
                                                            "danhSachVe": danhSachGheDangDat,
                                                            "taiKhoanNguoiDung": taiKhoanNguoiDung.taiKhoan
                                                        }
                                                        dispatch(datVeAction(thongTinVe))
                                                    } else {
                                                        //  Neu khong co user login chuyen huong trang ve trang dang nhap
                                                        props.history.push('/dangNhap')
                                                    }
                                                }

                                                }>
                                                <span className="overlay"></span>
                                                <span>Đặt Vé</span>
                                            </button>
                                    }

                                </div>
                           
                        </div>
                    </div>

                </div>
            </div>
            <div className="container-fluid p-0">
                <div className="small-device">
                    <div className="row m-0">
                        <div className="col-8 p-0 ">
                            <h3>Thong tin chi chi tiet</h3>
                            <p><span className="title">Cụm rạp : </span><span>{thongTinPhongVe.thongTinPhim?.tenCumRap}</span></p>
                            <p><span className="title">Địa chỉ : </span><span>{thongTinPhongVe.thongTinPhim?.diaChi}</span></p>
                            <p>
                                <span className="title">Giờ chiếu : </span><span className="mr-2">{thongTinPhongVe.thongTinPhim?.gioChieu}</span>
                            </p>
                            <p> <span className="title">Ngày Chiếu : </span><span>{thongTinPhongVe.thongTinPhim?.ngayChieu}</span></p>
                        </div>
                        <div className="col-4 p-0">
                            <div className="row m-0">
                                <div className="gheDuocDat col-12 p-0">
                                    <div className="d-flex justify-content-end">
                                        {danhSachGheDangDat.length === 0 ? '' :
                                            <button className="mb-3" onClick={(() => (dispatch({
                                                type: 'CLEAR_GHE',
                                            })))}> Clear all </button>
                                        }
                                    </div>

                                    <div>
                                        {
                                            danhSachGheDangDat.map((gheDangDat, index) => {
                                                return <>
                                                    <span className="soGhe " key={index}>
                                                        {gheDangDat.stt}
                                                    </span>
                                                    {(index + 1) % 6 === 0 ? <br /> : ''}
                                                </>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row m-0">
                                <div className="Button col-12 p-0">
                                    {
                                        danhSachGheDangDat.length === 0 ?
                                            <button className="btn btn-disable" disabled>Đặt Vé</button> :
                                            <button className="btn btn-confirm"
                                                onClick={() => {
                                                    if (localStorage.getItem(USER_LOGIN)) {
                                                        //  Lay user login tu local storage
                                                        let taiKhoanNguoiDung = JSON.parse(localStorage.getItem(USER_LOGIN))
                                                        let thongTinVe = {
                                                            "maLichChieu": props.match.params.maLichChieu,
                                                            "danhSachVe": danhSachGheDangDat,
                                                            "taiKhoanNguoiDung": taiKhoanNguoiDung.taiKhoan
                                                        }
                                                        dispatch(datVeAction(thongTinVe))
                                                    } else {
                                                        //  Neu khong co user login chuyen huong trang ve trang dang nhap
                                                        props.history.push('/dangNhap')
                                                    }
                                                }

                                                }>
                                                <span className="overlay"></span>
                                                <span>Đặt Vé</span>
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
