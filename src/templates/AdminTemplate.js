import { NavLink, Redirect, Route } from 'react-router-dom'
import { USER_LOGIN } from '../utility/setting'
// Copy phan import tu thu vien antd
import { Layout, Menu } from 'antd';
import '../../node_modules/antd/dist/antd.min.css'
import { useState } from 'react';
import Header from '../Components/Header';

const {  Content ,Sider } = Layout;


export const AdminTemplate = props => {
    const [collapsed,setCollapsed]=useState(false)
    const onCollapse = collapsed => {
        setCollapsed( collapsed );
      };
    if (localStorage.getItem(USER_LOGIN)) {
        // Phai la uan tri moi duoc vao
        let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
        if (userLogin.maLoaiNguoiDung == 'QuanTri') {
            return <>
            <Header></Header>
            <Route path={props.path} exact render={(propsRoute) => {
                // Noi dung render khi nguoi dung go dung cac route admin
                return  <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                  <div className="logo" />
                  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                      <Menu.Item key="3">
                          <NavLink to="/admin/quanliphim">Quản lí phim</NavLink>
                      </Menu.Item>
                      <Menu.Item key="4">
                      <NavLink to="/admin/quanlinguoidung">Quản lí người dùng</NavLink>
                      </Menu.Item>
                  </Menu>
                </Sider>
                <Layout className="site-layout">
                  
                  <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                      <props.Component {...propsRoute} ></props.Component>
                    </div>
                  </Content>
                </Layout>
              </Layout>
            }}></Route>
        </>
        }
        alert('Ban khong phai la Admin')
        return <Redirect to='/dangNhap'></Redirect>
    }
    alert('Ban khong phai la Admin')
    return <Redirect to='/dangNhap'></Redirect>

}