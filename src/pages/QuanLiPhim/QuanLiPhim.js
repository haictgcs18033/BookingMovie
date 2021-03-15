import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataPhim } from '../../redux/actions/QuanLiDatVeAction'
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { addImage, addMovie, handleMovieInput, updateMovie } from '../../redux/actions/QuanLiPhimAction';
import { deleteMovieAdmin } from '../../redux/actions/QuanLiPhimAction';

export default function QuanLiPhim() {
    const mangPhim = useSelector(state => state.QuanLiPhimReducer.mangPhim)
    const movie = useSelector(state => state.QuanLiPhimReducer.movie)
    let { tenPhim, biDanh, hinhAnh, trailer, ngayKhoiChieu, moTa } = movie.values
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [paginate, setPaginate] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    })
    const pageSize = 10;
    useEffect(() => {
        setLoading(true)
        dispatch(getDataPhim())
        setPaginate({
            current,
            totalPage: mangPhim.length / pageSize,
            minIndex: 0,
            maxIndex: pageSize
        })
        setLoading(false)
    }, [])
    let handleChange = (page) => {
        setPaginate({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        })
    }
    let { current, maxIndex, minIndex } = paginate
    // console.log(current);

    let handleChangeInput = (e) => {
        let { name, value } = e.target
        let newValues = { ...movie.values }
        newValues[name] = value;
        if (name === 'hinhAnh') {
            newValues[name] = e.target.files[0]
        }
        console.log(newValues);
        dispatch(handleMovieInput(newValues))
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        let movieItem = movie.values
        console.log(movieItem);
        dispatch(addMovie(movieItem))
    }
    let deleteMovie = (maPhim) => {
        dispatch(deleteMovieAdmin(maPhim))
    }
    let handleUpdatePhim=(e)=>{
        e.preventDefault()
        let movieUpdate=movie.values
        dispatch(updateMovie(movieUpdate))
    }
 
    return (
        <div className="quanliphim">
            <div className="d-flex justify-content-between">
                <Pagination
                    pageSize={pageSize}
                    defaultCurrent={current}
                    total={mangPhim.length}
                    onChange={handleChange}
                />
                <div>
                    {/* Button trigger modal */}
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Thêm phim
                    </button>
                    {/* Modal */}
                    <form
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        role="dialog"
                        aria-hidden="true"
                        onSubmit={handleSubmit}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Them Phim</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="formGroup">
                                        <label>Ten phim</label>
                                        <input type="text" className="form-control" name="tenPhim" value={tenPhim}
                                            onChange={handleChangeInput} />
                                    </div>
                                    <div className="formGroup">
                                        <label>Bi danh</label>
                                        <input type="text" className="form-control" name="biDanh" value={biDanh}
                                            onChange={handleChangeInput} />
                                    </div>
                                    <div className="formGroup">
                                        <label>Hinh anh</label>
                                        <input type="file" className="form-control-file" name="hinhAnh"
                                            onChange={handleChangeInput} />
                                    </div>
                                    <div className="formGroup">
                                        <label>Trailer</label>
                                        <input type="text" className="form-control" name="trailer" value={trailer}
                                            onChange={handleChangeInput} />
                                    </div>
                                    <div className="formGroup">
                                        <label>Mo ta</label>
                                        <input type="text" className="form-control" name="moTa" value={moTa}
                                            onChange={handleChangeInput} />
                                    </div>
                                    <div className="formGroup">
                                        <label>Ngay khoi chieu</label>
                                        <input type="text" className="form-control" name="ngayKhoiChieu" value={ngayKhoiChieu}
                                            onChange={handleChangeInput} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>

            <div className="mt-3">
                <div className="row">
                    {mangPhim.map((phim, index) => {
                        if (index >= minIndex && index < maxIndex) {
                            return <div className="col-3">
                                <div className="card text-left my-2">
                                    <img className="card-img-top " style={{ height: '200px' }} src={phim.hinhAnh} alt />
                                    <div className="card-body">
                                        <h4 className="card-title">{phim.tenPhim.length>15 ? <span>{phim.tenPhim.substr(0,15)}...</span> :
                                        <span>{phim.tenPhim}</span>}</h4>
                                        <button className="btn btn-danger mr-2" onClick={() => deleteMovie(phim.maPhim)}>Xóa phim</button>
                                        <button type="button" className="btn btn-primary" data-toggle="modal" 
                                        data-target="#exampleModalUpdatePhim"
                                        onClick={()=>{
                                            dispatch({
                                                type:'SUA_PHIM',
                                                phim:phim
                                            })
                                        }}>
                                            Sửa phim
                                        </button>
                                        {/* Modal */}
                                        <form
                                            className="modal fade"
                                            id="exampleModalUpdatePhim"
                                            tabIndex={-1}
                                            role="dialog"
                                            aria-hidden="true"
                                            onSubmit={handleUpdatePhim}>
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Cap nhat phim</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="formGroup">
                                                            <label>Ten phim</label>
                                                            <input type="text" className="form-control" name="tenPhim" value={tenPhim}
                                                                onChange={handleChangeInput} />
                                                        </div>
                                                        <div className="formGroup">
                                                            <label>Bi danh</label>
                                                            <input type="text" className="form-control" name="biDanh" value={biDanh}
                                                                onChange={handleChangeInput} />
                                                        </div>
                                                        <div className="formGroup">
                                                            <label>Hinh anh</label>
                                                            <input type="file" className="form-control-file" name="hinhAnh"
                                                                onChange={handleChangeInput} />
                                                        </div>
                                                        <div className="formGroup">
                                                            <label>Trailer</label>
                                                            <input type="text" className="form-control" name="trailer" value={trailer}
                                                                onChange={handleChangeInput} />
                                                        </div>
                                                        <div className="formGroup">
                                                            <label>Mo ta</label>
                                                            <input type="text" className="form-control" name="moTa" value={moTa}
                                                                onChange={handleChangeInput} />
                                                        </div>
                                                        <div className="formGroup">
                                                            <label>Ngay khoi chieu</label>
                                                            <input type="text" className="form-control" name="ngayKhoiChieu" value={ngayKhoiChieu}
                                                                onChange={handleChangeInput} />
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }
                    }
                    )}
                </div>


            </div>
        </div>
    )
}
