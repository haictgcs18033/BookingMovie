import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getDataCumRap, getDataHeThong, getDataHeThongRap, getDataLichChieuTungRap, getDataPhim } from '../../redux/actions/QuanLiDatVeAction'
import moment from 'moment'

export default function TrangChu(props) {
    // Lay danh sach phim từ axios
    const mangPhim = useSelector(state => state.QuanLiPhimReducer.mangPhim)
    const mangRap = useSelector(state => state.QuanLiPhimReducer.mangRap)
    const mangCumRap = useSelector(state => state.QuanLiPhimReducer.mangCumRap)
    const thongTinLichChieu = useSelector(state => state.QuanLiPhimReducer.thongTinLichChieu)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDataPhim());
        // let maHeThongRap = 'BHDStar';
        dispatch(getDataHeThongRap())
    }, [])
    const renderPhim = () => {
        return mangPhim.slice(0, 8).map((phim, index) => {
            return (
                <div className="col-md-4 col-lg-3 col-xl-3 my-2" key={index}>
                    <div className="card-phim">
                        <img className="img-phim " src={phim.hinhAnh} alt />
                        <div className="card-content">
                            <h1 style={{ fontSize: 20 }}>{phim.tenPhim}</h1>
                            <NavLink to={`/chitietphim/${phim.maPhim}`} className="btn btn-primary">Xem</NavLink>
                        </div>
                    </div>
                </div>
            )
        }
        )
    }
    const renderPhim1 = () => {

        return mangPhim.slice(8, 16).map((phim, index) => {
            return (
                <div className="col-md-4 col-lg-3 col-xl-3 my-2" key={index}>
                    <div className="card-phim">
                        <img className="img-phim " src={phim.hinhAnh} alt />
                        <div className="card-content">
                            <h1 style={{ fontSize: 20 }}>{phim.tenPhim}</h1>
                            <NavLink to={`/chitietphim/${phim.maPhim}`} className="btn btn-primary">Xem</NavLink>
                        </div>
                    </div>
                </div>
            )
        }
        )
    }
    const renderPhim2 = () => {

        return mangPhim.slice(16, 24).map((phim, index) => {
            return (
                <div className="col-md-4 col-lg-3 col-xl-3 my-2" key={index}>
                    <div className="card-phim">
                        <img className="img-phim " src={phim.hinhAnh} alt />
                        <div className="card-content">
                            <h1 style={{ fontSize: 20 }}>{phim.tenPhim}</h1>
                            <NavLink to={`/chitietphim/${phim.maPhim}`} className="btn btn-primary">Xem</NavLink>
                        </div>
                    </div>
                </div>
            )
        }
        )
    }
    const renderPhimSMDevice = () => {
        return mangPhim.slice(0, 18).map((phim, index) => {
            return <div className=" col-6 col-sm-4  my-2" key={index}>
                <div className="card-phim">
                    <img className="img-phim " src={phim.hinhAnh} alt />
                    <div className="card-content">
                        <h1 style={{ fontSize: 20 }}>{phim.tenPhim.length > 10 ?
                            <span>{phim.tenPhim.substr(0, 10)}...</span> :
                            <span>{phim.tenPhim}</span>}</h1>
                        <NavLink to={`/chitietphim/${phim.maPhim}`} className="btn btn-primary">Xem</NavLink>
                    </div>
                </div>
            </div>
        })
    }
    const renderRap = () => {
        return mangRap.map((rap, index) => {
            return <div className="p-3 col-2" key={index} >
                <div className="rap-img">
                    <img src={rap.logo}
                        onClick={() => { getCumRap(rap.maHeThongRap); }}
                        onLoad={() => { getCumRap('BHDStar') }}
                    />
                </div>

            </div>
        })
    }


    const getCumRap = (maHeThongRap) => {
        dispatch(getDataCumRap(maHeThongRap))
        dispatch(getDataLichChieuTungRap(maHeThongRap))
    }
    const renderCumRap = () => {
        return mangCumRap?.map((cumRap, index) => {
            let activeClass = index === 0 ? 'active' : '';
            return <a key={index} class={`nav-link ${activeClass}`}
                data-toggle="pill"
                href={`#${cumRap.maCumRap}`}
                role="tab" >{cumRap.tenCumRap}</a>
        })
    }
    const renderLichChieuTheoTungRap = () => {
        return thongTinLichChieu.map((lichChieu, index) => {
            return <>
                {
                    lichChieu.lstCumRap.map((lstCumRap, index) => {
                        let activeClass = index === 0 ? 'active' : '';
                        return <div className={`tab-pane fade show  ${activeClass}`} id={lstCumRap.maCumRap} role="tabpanel">
                            {lstCumRap.danhSachPhim.slice(0, 5).map((phim, index) => {
                                return <>
                                    <div className="content p-3">
                                        <div className="media   d-flex" >
                                            <img src={phim.hinhAnh} alt="John Doe" className="media-img" />
                                            <div className="media-body ml-5">
                                                <h4><NavLink to={`/chitietphim/${phim.maPhim}`}>{phim.tenPhim}</NavLink></h4>
                                                <div className="row">
                                                    {phim.lstLichChieuTheoPhim.slice(0, 8).map((time, index) => {
                                                        return <div className="col-md-4 col-lg-3 col-xl-3 gioChieu" key={index}>
                                                            <p>{moment(time.ngayChieuGioChieu).format('LT')}</p>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            })}
                        </div>
                    })
                }
            </>
        })
    }
    return (
        <>
            <div className="container-fluid phim-wrapper">
                <h2 > Phim hay </h2>
                <div className="container ">
                    <div id="carouselPhim" className="carousel slide" data-interval="false">
                        <ol className="carousel-indicators movie-indicators">
                            <li data-target="#carouselPhim" data-slide-to={0} className="active" />
                            <li data-target="#carouselPhim" data-slide-to={1} />
                            <li data-target="#carouselPhim" data-slide-to={2} />
                        </ol>
                        <div className="carousel-inner phim-padding">
                            <div className="carousel-item active">
                                <div className="row">
                                    {renderPhim()}
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    {renderPhim1()}
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    {renderPhim2()}
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev movie-prev" href="#carouselPhim" role="button" data-slide="prev">
                            <i className="fa fa-angle-left" />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next movie-next" href="#carouselPhim" role="button" data-slide="next">
                            <i class="fa fa-angle-right"></i>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <div className="phim-sm">
                        <div className="row m-0">
                            {renderPhimSMDevice()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid rap-phim">
                <h2 className="mt-5">Rạp phim</h2>
                <div className="row">
                    <div className="container-fluid">
                        <div className="row w-100">
                            {renderRap()}
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className=" row w-100 mx-0 rap-container">
                            <div className="col-4 h-100" >
                                <div className="cumrap">
                                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        {renderCumRap()}
                                    </div>
                                </div>
                            </div>
                            <div className="col-8 h-100">
                                <div className="cumLichChieu">
                                    <div class=" tab-content" id="v-pills-tabContent">
                                        {renderLichChieuTheoTungRap()}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container-fluid doitac-homepage">
                <h1>Đối tác</h1>
                <div className="container-fluid p-0">
                    <div className="row">
                        {renderRap()}
                    </div>
                </div>
            </div>
        </>
    )
}
