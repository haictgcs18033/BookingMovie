import {NavLink, Redirect, Route } from "react-router-dom"
import Header from "../Components/Header"
import { USER_LOGIN } from "../utility/setting";
import { Layout, Menu } from 'antd';
import { useState } from 'react';

const {  Content ,Sider } = Layout;
export const UserTemPlate= (props)=>{
    const [collapsed,setCollapsed]=useState(false)
    const onCollapse = collapsed => {
        setCollapsed( collapsed );
      };
      if(localStorage.getItem(USER_LOGIN)){
           let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
           const {Component,path}=props
           return <>
           <Header></Header>
           <Route path={path} exact render={(propsRoute)=>{
               return   <Layout style={{ minHeight: '100vh' }}>
               <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                 <div className="logo" />
                 <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                     <Menu.Item key="3">
                         <NavLink to={`/thongtintaikhoan/${userLogin.taiKhoan}`}>Thong tin ca nhan</NavLink>
                     </Menu.Item>
                     <Menu.Item key="4">
                     <NavLink to={`/thongtindatve/${userLogin.taiKhoan}`}>Lich su dat ve</NavLink>
                     </Menu.Item>
                 </Menu>
               </Sider>
               <Layout className="site-layout">
                 
                 <Content style={{ margin: '0 16px' }}>
                   <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                     <Component {...propsRoute} ></Component>
                   </div>
                 </Content>
               </Layout>
             </Layout>
           }}>
         </Route>
           </>
          
      } alert('Ban chua dang nhap')
      return <Redirect to='/dangnhap'></Redirect>
 
   
}