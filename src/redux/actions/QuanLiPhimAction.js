import Axios from "axios"
import swal from "sweetalert"
import { ACCESS_TOKEN } from "../../utility/setting"
import { GET_DATA_PHIM } from "../const/ConstBookingMovie"

export const handleMovieInput=(newValues)=>{
    return {
        type:'INPUT_MOVIE',
        movie:{
            values:newValues
        }
    }
}
export const getDataPhim=()=>{
    return async dispatch=>{
        try{
            let result= await Axios({
               url:'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
               method:'GET'
            })
            dispatch({
                type:GET_DATA_PHIM,
                dataPhim:result.data
            })
        }catch(err){
             console.log(err.response?.data);
        }
      
    }
}
export const addMovie=(movie)=>{
    const formData=new FormData();
        for(let item in movie){
          formData.append(item, movie[item]);
        }
        formData.append('maNhom','GP01')
     return async dispatch =>{
         try{
            let result= await Axios({
                method:'POST',
                url:'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh',
                data: formData
            })
          alert('Thanh cong')
          dispatch(getDataPhim())
         }catch(err){
            alert(err.response?.data)
         }  
     }
}
 export const deleteMovieAdmin=(maPhim)=>{
     return async dispatch=>{
         try{
            let result= await Axios({
                url:`https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
                method:'DELETE',
                headers:{'Authorization':'Bearer '+localStorage.getItem(ACCESS_TOKEN)}
            })
            dispatch(getDataPhim())
            alert('Thanh Cong')
         }catch(err){
             console.log(err.response?.data);
         }
      
     }
 } 
 export const updateMovie=(movie)=>{
    const formData=new FormData();
        for(let item in movie){
          formData.append(item, movie[item]);
        }
       return async dispatch=>{
           try{
               let result= await Axios({
                   url:'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload',
                   method:"POST",
                   data:formData,
                   headers:{'Authorization':'Bearer '+localStorage.getItem(ACCESS_TOKEN)}
               })
               swal("Thay doi phim thanh cong!", "", "success");
               dispatch(getDataPhim())
           }catch(err){
                 console.log(err.response?.data);
           }
       }
 }
