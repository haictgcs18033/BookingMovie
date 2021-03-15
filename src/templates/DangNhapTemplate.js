import { Route } from "react-router-dom"
import Header from "../Components/Header"


export const LoginTemplate=(props)=>{
    const {Component,path}=props
     return  <Route path={path} exact render={(propsRoute)=>{
         return <div>
             <Component {...propsRoute}></Component>
         </div>
     }} ></Route>
}