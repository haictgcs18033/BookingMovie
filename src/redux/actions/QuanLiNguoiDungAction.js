
import Axios from 'axios'
import swal from 'sweetalert';

import { ACCESS_TOKEN, USER_LOGIN } from '../../utility/setting';
import { GET_DATA_USER } from '../const/ConstBookingMovie';
export const dangNhapAction = (nguoiDung, props) => {

    return async dispatch => {
        try {
            const result = await Axios({
                url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
                method: 'POST',
                data: nguoiDung
            })
            
            console.log(result.data);
            localStorage.setItem(ACCESS_TOKEN, result.data.accessToken)
            localStorage.setItem(USER_LOGIN, JSON.stringify(result.data))
            props.history.push('/')
        } catch (err) {
            alert(err.response?.data);
        }
    }
}
export const handleInput = (newValues) => {
    return {
        type: 'INPUT',
        user: {
            values: newValues
        },
       userInAdmin:{
           values:newValues
       }
    }
}
export const signup = (userValues,props) => {
    return async dispatch => {
        try {
            const result = await Axios({
                url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
                method: 'POST',
                data: {...userValues,maNhom:'GP01'}
            })
          console.log(result.data)
          alert('Đăng kí thành công . Bạn hãy đăng nhập !')
          props.history.push('/dangnhap')
        } catch (err) {
            alert(err.response?.data);
        }
    }
}
export const getDataUser=(valueSearch)=>{
    return async dispatch=>{
        try{
            const result = await Axios({
                url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01
                ${valueSearch!==''?`&tuKhoa=${valueSearch}`:''} `,
       
                method: 'GET'
            })
            dispatch({
                type:GET_DATA_USER,
                dataUser:result.data
            })
        }catch(err){
            console.log(err.response?.data);
        }
    }
}
export const addUser=(newUser)=>{
    return async dispatch=>{
        try{
           let result=await Axios({
               url:'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung',
               method:'POST',
               data:{...newUser,maNhom:'GP01'},
               headers:{'Authorization':'Bearer '+ localStorage.getItem(ACCESS_TOKEN)}
           })
           console.log(result.data);
           dispatch(getDataUser())
        //    alert('Them nguoi dung thanh cong')
        }catch(err){
            alert(err.response?.data);
        }
    }
}

export const deleteUserAdmin=(taiKhoanUser)=>{
    return async dispatch=>{
        try{
            let result= await Axios({
                url:`https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoanUser}`,
                method:'DELETE',
                headers:{'Authorization':'Bearer '+localStorage.getItem(ACCESS_TOKEN)}
            })
            alert(result.data);
            dispatch(getDataUser())
        }catch(err){
           alert(err.response?.data);
        }
    }
}
export const handleUpdateUser=(userUpdate)=>{
    return async dispatch=>{
      try{
         let result = await Axios({
             url:'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
             method:'PUT',
             data:{...userUpdate,maNhom:'GP01'},
             headers:{'Authorization':'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
         })
         swal("Thay doi du lieu thanh cong!", "", "success");
         console.log(result.data)
         dispatch(getDataUser())
      }catch(err){
            console.log(err.response?.data);
      }
    }
}