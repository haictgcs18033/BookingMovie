import { GET_DATA_CUM_RAP, GET_DATA_LICH_CHIEU_PHIM, GET_DATA_PHIM, GET_DATA_RAP, GET_DATA_USER, LAY_THONG_TIN_DAT_VE, SUA_NGUOI_DUNG } from "../const/ConstBookingMovie"

const stateDefault = {
    mangPhim: [],
    mangRap:[],
    mangCumRap:[],
    thongTinLichChieu:[],
    thongTinPhongVe:{},
    danhSachGheDangDat:[
    ],
    // Input
    user :{
        values:{
           taiKhoan:'',
           matKhau:'',
           email:'',
           soDT:'',
           hoTen:'',
        }
    } ,
    userType:{
        khachHang:'KhachHang',
        quanTri:'QuanTri'
    },
       
    userInAdmin :{
      values:{
          taiKhoan:'',
          matKhau:'',
          email:'',
          soDt:'',
          hoTen:'',
          maLoaiNguoiDung:''
      }
    },
    mangNguoiDung:[],
   
    movie:{
        values:{
            maPhim:"",
            tenPhim:'',
            biDanh:'',
            trailer:'',
            hinhAnh:'',
            moTa:'',
            ngayKhoiChieu:""
        }
    },
    userInfo:{

    },
    userInfoUpdate:{
        values:{
           hoTen:'',
           email:"",
           soDT:'',
           matKhau:""
        }
    }

}

export const QuanLiPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_DATA_PHIM: {
            let mangPhimCapNhat = { ...state, mangPhim: action.dataPhim }
            return mangPhimCapNhat
        }
        case GET_DATA_RAP:{
            let mangRapCapNhat={...state,mangRap:action.dataRap}
            return mangRapCapNhat
        }
        case GET_DATA_CUM_RAP:{
            let mangCumRapCapNhat={...state,mangCumRap:action.dataCumRap}
            return mangCumRapCapNhat
        }
        case GET_DATA_LICH_CHIEU_PHIM : {
              let mangRapCapNhat= {...state,thongTinLichChieu:action.dataLichChieu}
              return mangRapCapNhat
        }
        case LAY_THONG_TIN_DAT_VE:{
            let thongTinPhongVeCapNhat={...state,thongTinPhongVe:action.thongTinPhongVe}
            return thongTinPhongVeCapNhat
        }
        case 'GHE_DANG_DAT':{
            let gheDangDatCapNhat=[...state.danhSachGheDangDat]
            let indexGheDangDat=gheDangDatCapNhat.findIndex(gheDangDat=>gheDangDat.maGhe===action.gheDangDat.maGhe);
            if(indexGheDangDat!==-1){
               gheDangDatCapNhat.splice(indexGheDangDat,1)
            }else{
                gheDangDatCapNhat.push(action.gheDangDat)
            }
            return {...state,danhSachGheDangDat:gheDangDatCapNhat}
        }
        case 'CLEAR_GHE':{
            let gheDangDatCapNhat=[...state.danhSachGheDangDat]
            gheDangDatCapNhat.length=0;
            return{...state,danhSachGheDangDat:gheDangDatCapNhat}
        }
        case 'DAT_VE_THANH_CONG':{
            return {...state,danhSachGheDangDat:[]}
        }
        case 'INPUT':{
            return{...state,user : action.user,userInAdmin:action.userInAdmin}
        }
        case GET_DATA_USER:{
            return {...state, mangNguoiDung:action.dataUser}
        }
        case SUA_NGUOI_DUNG:{
        //    state.userUpdate={...action.userUpdate}
           let newUser={...state.userInAdmin}
           newUser.values={...action.userUpdate}
           return {...state,userInAdmin:newUser}
        }
        case 'INPUT_MOVIE':{
            return{...state,movie:action.movie}
        }
        case 'SUA_PHIM':{
            let newPhim={...state.movie}
            newPhim.values={...action.phim}
            return{...state,movie:newPhim}
        }
       case 'LOAD_USER':{
           return{...state,userInfo:action.user}
       }
       case 'USER_INPUT':{
           return {...state,userInfoUpdate:action.userInfoUpdate}
        }
       case 'SUA_THONG_TIN':{
           let newInfo={...state.userInfoUpdate}
           newInfo.values={...action.user}
           return{...state,userInfoUpdate:newInfo}
       }
      
        default:{
            return state

        }
       
    }
}