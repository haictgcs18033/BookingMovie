import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Carousel from './Components/Carousel';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom'
import TrangChu from './pages/TrangChu/TrangChu.js'
import DangNhap from './pages/DangNhap/DangNhap'
import DangKy from './pages/DangKy/DangKy'
import ChiTietPhim from './pages/ChiTietPhim/ChiTietPhim'
import { LoginTemplate } from './templates/DangNhapTemplate';
import { HomeTemplate } from './templates/TrangChuTemplate';
import './sass/BookingMovie.scss'
import { ChiTietPhimTemplate } from './templates/ChiTietPhimTemplate';
import { DangKyTemplate } from './templates/DangKyTemplate';
import { BookingTempalte } from './templates/BookingTemplate';
import DatVe from './pages/Datve/DatVe';
import { AdminTemplate } from './templates/AdminTemplate';
import Admin from './pages/Admin/Admin';
import QuanLiNguoiDung from './pages/QuanLiNguoiDung/QuanLiNguoiDung';
import QuanLiPhim from './pages/QuanLiPhim/QuanLiPhim';
import { createBrowserHistory } from 'history';
import { UserTemPlate } from './templates/UserTemplate';
import ThongTinCaNhan from './pages/TaiKhoan/ThongTinCaNhan';
import ThongTinDatVe from './pages/TaiKhoan/ThongTinDatVe';
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      {/* <Header />
    <Carousel></Carousel> */}
      <Switch>
        <HomeTemplate path="/trangchu" Component={TrangChu}></HomeTemplate>
        <LoginTemplate path="/dangnhap" Component={DangNhap}></LoginTemplate>
        <BookingTempalte path="/datVe/:maLichChieu" Component={DatVe}></BookingTempalte>
        <DangKyTemplate path="/dangky" Component={DangKy}></DangKyTemplate>
        <ChiTietPhimTemplate path="/chitietphim/:maPhim" Component={ChiTietPhim}></ChiTietPhimTemplate>
        <AdminTemplate path="/admin/quanlinguoidung" Component={QuanLiNguoiDung}></AdminTemplate>
        <AdminTemplate path="/admin/quanliphim" Component={QuanLiPhim}></AdminTemplate>
        <AdminTemplate path="/admin" Component={QuanLiPhim}></AdminTemplate>
        <UserTemPlate path="/thongtintaikhoan/:taiKhoan" Component={ThongTinCaNhan}></UserTemPlate>
        <UserTemPlate path="/thongtindatve/:taiKhoan" Component={ThongTinDatVe}></UserTemPlate>
        <Route path="/datve" ></Route>
        <HomeTemplate exact path="/" Component={TrangChu}></HomeTemplate>
      </Switch>
    </Router>

  );
}

export default App;
