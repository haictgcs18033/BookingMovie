import React from 'react'
import { useSelector } from 'react-redux'

export default function Footer() {
    const mangRap = useSelector(state => state.QuanLiPhimReducer.mangRap)
    console.log(mangRap);
    return (
        <div className="footer-wrapper">
            <div className="container-footer">
                <div className="row">
                    <div className=" col-lg-3 col-xl-4 doitac">
                        <h3 className="mb-3">Đối tác</h3>
                        <div className="d-flex">
                            {mangRap.slice(0, 3).map((phim, index) => {
                                return <>
                                    <div className="doitac-container mr-4">
                                        <div className="overlay"></div>
                                        <img className=" d-block mx-auto" src={phim.logo}  />
                                    </div>
                                </>
                            })}
                        </div>
                        <div className="d-flex mt-3">
                            {mangRap.slice(3, 6).map((phim, index) => {
                                return <>
                                    <div className="doitac-container mr-4 mt-3">
                                        <div className="overlay"></div>
                                        <img className=" d-block mx-auto" src={phim.logo} width="60px" height="60px" />
                                    </div>
                                </>
                            })}
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-8 col-lg-6 col-xl-6 social">
                        <h3 className="">Mạng xã hội</h3>
                        <p>Theo dõi chúng tôi và sử dụng các nền tảng truyền thông xã hội sau để liên hệ với chúng tôi</p>
                        <div>
                            <i className="fab fa-facebook" />
                            <i className="fab fa-instagram" />
                            <i className="fab fa-linkedin-in" />
                            <i className="fab fa-twitter" />
                            <i className="fab fa-youtube" />
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4 col-lg-3 col-xl-2 mobile">
                        <h3>Nền tảng điện thoại</h3>
                        <div className="mt-4">
                            <i className="fab fa-apple" />
                            <i className="fab fa-android" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
