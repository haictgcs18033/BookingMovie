import { Route } from "react-router-dom"
import Header from "../Components/Header"


export const ChiTietPhimTemplate = (props) => {
    const { Component, path } = props
    return <Route path={path} render={(propsRoute) => {
        return <div>
            <Header></Header>
            <Component {...propsRoute}></Component>
        </div>
    }}></Route>
}