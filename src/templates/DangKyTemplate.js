import { Route } from "react-router-dom"
import Header from "../Components/Header"
export const DangKyTemplate=(props)=>{
    const {Component,path}=props
    return <Route path={path} render={(propsRoute)=>{
        return <div>
            <Component {...propsRoute}></Component>
        </div>
    }}></Route>
}