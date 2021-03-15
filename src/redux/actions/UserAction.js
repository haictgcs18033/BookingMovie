import Axios from "axios";
import { Redirect } from "react-router-dom";
import { ACCESS_TOKEN, USER_LOGIN } from "../../utility/setting";

export const loadThongTinNguoiDung=(taiKhoanUser)=>{
    return async dispatch=>{
        try{
            let result= await Axios({
                url:'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan',
                method:'POST',
               data:taiKhoanUser
            }) 
            dispatch({
                type:'LOAD_USER',
                user:result.data
            })
        }catch(err){
            console.log(err.response?.data);
        }
      
    }
}
export const handleUserInput=(newValues)=>{
    return {
        type:'USER_INPUT',
        userInfoUpdate:{
            values:newValues
        }
    }
}
export const handleChangeInfo=(newInfo,props)=>{
    return async dispatch=>{
        try{
           let result= await Axios({
               url:'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
               method:"PUT",
               data:{...newInfo,maLoaiNguoiDung:'KhachHang'}, 
               headers:{"Authorization":'Bearer '+localStorage.getItem(ACCESS_TOKEN)}
           })
          alert('Ban can phai dang nhap lai de cap nhat thong tin')
          window.localStorage.clear()
            props.history.push('/dangnhap')
           
        }catch(err){
             console.log(err.response?.data);
        }
  
    }
}