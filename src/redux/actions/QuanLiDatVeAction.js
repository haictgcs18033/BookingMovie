import Axios from 'axios'
import swal from 'sweetalert';
import { ACCESS_TOKEN } from '../../utility/setting';
import { GET_DATA_CUM_RAP, GET_DATA_LICH_CHIEU_PHIM, GET_DATA_PHIM, GET_DATA_RAP, LAY_THONG_TIN_DAT_VE } from '../const/ConstBookingMovie';
// Actions for home page
export const getDataPhim=()=>{
    return async dispatch=>{
        let result= await Axios({
            url :'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
            method:'GET'
        });
        try{
            dispatch({
                type:GET_DATA_PHIM,
                dataPhim:result.data
            })
        }catch(err){
            console.log(err.response?.data);
        }
      
      
    }
}
export const getDataHeThongRap=()=>{
    return async dispatch=>{
          let result = await Axios({
              url:`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap`,
              method:"GET"
          })
          console.log(result);
          try{
            dispatch({
                type:GET_DATA_RAP,
                dataRap:result.data
            })
          }catch(err){
              console.log(err.response?.data);
          }
          
    }
}
export const getDataCumRap=(maHeThongRap)=>{
    return async dispatch=>{
        let result=await Axios({
            url :`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
            method:'GET'
        })
        console.log(result);
        try{
            dispatch({
                type:GET_DATA_CUM_RAP,
                dataCumRap:result.data
            })
        }catch(err){
            console.log(err.response?.data);
        }
    }
}
// Actions for dat ve page
export const getDataLichChieuTungRap=(maHeThongRap)=>{
    return async dispatch=>{
        let result=await Axios({
            url:`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`,
            method:'GET'
        })
        console.log(result);
        try{
           dispatch({
               type:GET_DATA_LICH_CHIEU_PHIM,
               dataLichChieu:result.data
           })
        }catch(err){
            console.log(err);
            console.log(err.response?.data);
        }
    }
}
export const layThongTinDatVeAction=(maLichChieu)=>{
     return async dispatch=>{
         try{
            let result= await Axios({
                url:`https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
                method:'GET'
            })
            dispatch({
                type :LAY_THONG_TIN_DAT_VE,
                thongTinPhongVe : result.data
            })
         }catch(err){
              console.log(err.response?.data);
         }
        
     }
}

// Action dat ve
export const datVeAction= (thongTinVe)=>{
    return async dispatch=>{
        try{
           let {data,status}= await Axios({
               url:'https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe',
               method:'POST',
               data:thongTinVe,
               headers:{'Authorization':'Bearer '+ localStorage.getItem(ACCESS_TOKEN)}
           })
        //    Load lai danh sach ghe
        dispatch(layThongTinDatVeAction(thongTinVe.maLichChieu))
        swal({
            title: "Đặt vé thành công",
            text: "Hãy bấm OK để tiếp tục hành động",
            icon: "success",
            button: "OK",
          });
        dispatch({type:'DAT_VE_THANH_CONG'})
           console.log(data);
        }catch(err){
            console.log(err.response?.data);
        }
    }
}
