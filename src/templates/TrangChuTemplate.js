import { Route } from "react-router-dom";
import Carousel from "../Components/Carousel";
import Footer from "../Components/Footer";
import Header from "../Components/Header";


export const HomeTemplate=(props)=>{
    const {Component,path}=props;
    return <Route path={path} exact render={(propsRoute)=>{
        return <div>
            <Header></Header>
            <Carousel></Carousel>
            <Component {...propsRoute}></Component>
            <Footer></Footer>
        </div>
    }}></Route>
}