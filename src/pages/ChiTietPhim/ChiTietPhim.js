import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { NavLink } from 'react-router-dom'

export default function ChiTietPhim(props) {
    const [chiTietPhim, setChiTiePhim] = useState({})
    useEffect(async () => {
        const maPhim = props.match.params.maPhim
        let result = await Axios({
            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
            method: 'GET'
        })
        console.log(result);
        setChiTiePhim(result.data)
    }, [])
    console.log(chiTietPhim);
    return (
        <div className="chiTietPhim container-fluid">
            <div className="background">
                <img src={chiTietPhim.hinhAnh} />
            </div>
            <div className="overlay"></div>
            <div className="thongTinPhim">
                <div className="row m-0">
                    <div className="col-4 h-100 phim-hinhanh">
                        <img src={chiTietPhim.hinhAnh} />
                    </div>
                    <div className="col-8 ">
                        <div className="content">
                            <h1>{chiTietPhim.tenPhim}</h1>
                            <p><span>Đánh giá : </span>{chiTietPhim.danhGia}/10</p>
                            <p> <span>Mô tả : </span> {chiTietPhim.moTa}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lichChieu">
                <h3 className="text-center">Thong tin lich chieu</h3>
                <div className="row m-0">
                    <div class="col-xs-12 col-md-4 col-lg-4 col-xl-4 nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        {chiTietPhim.heThongRapChieu?.map((heThongRap, index) => {
                            let activeClass = index === 0 ? 'active' : ''
                            return <a key={index} class={`nav-link ${activeClass}`}
                                data-toggle="pill"
                                href={`#${heThongRap.maHeThongRap}`} role="tab" >
                                <img src={heThongRap.logo} width="30px" className="mr-2" />
                                {heThongRap.tenHeThongRap}</a>
                        })}


                    </div>

                    <div class="col-xs-12 col-md-8 col-lg-8 col-xl-8 tab-content p-0" id="v-pills-tabContent">
                        {chiTietPhim.heThongRapChieu?.map((heThongRap, index) => {
                            let activeClass = index === 0 ? 'active' : '';
                            return <div className={`tab-pane fade show ml-4 ${activeClass}`} id={heThongRap.maHeThongRap} role="tabpanel" aria-labelledby="v-pills-home-tab">
                                {heThongRap.cumRapChieu.map((cumrap, index) => {
                                    return <div key={index}>
                                        <h3 >{cumrap.tenCumRap}</h3>

                                        <div className="thoiGian">
                                            <div className="row m-0">
                                                {cumrap.lichChieuPhim.slice(0, 12).map((lichchieu, index) => {
                                                    return <NavLink to={`/datVe/${lichchieu.maLichChieu}`} className="col-3 p-0">
                                                        {moment(lichchieu.ngayChieuGioChieu).format('LT')}
                                                    </NavLink>
                                                })}
                                            </div>
                                        </div>


                                    </div>
                                })}
                            </div>
                        })}

                    </div>

                </div>
            </div>
        </div>
    )
}
