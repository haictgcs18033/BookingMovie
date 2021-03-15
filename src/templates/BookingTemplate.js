import { Route } from "react-router-dom"


export const BookingTempalte = (props) => {
    let { path, Component } = props
    return <Route path={path} exact render={(propsRoute) => {
        return <div className="bookingTemplate">
            <Component {...propsRoute}></Component>
        </div>

    }}>

    </Route>
}