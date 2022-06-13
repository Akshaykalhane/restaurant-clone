import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
// import Header from './Header';
import Home from './component/Home/Home';
import Footer from "./Footer";
import Listing from './component/listing/listing'
import Details from "./component/Details/restDisplay";
import ViewOrder from "./component/bookings/viewOrder";
import PlaceOrder from "./component/bookings/placeOrder";
import Login from "./component/login/login";
import Register from "./component/login/register";

const Routing =()=>{
    return(
        <BrowserRouter>
            <div>
                {/* <Header /> */}
                <Route exact path="/" component={Home}/>
                <Route path="/listing/:mealId" component={Listing}/>
                <Route path="/details" component={Details} />
                <Route path="/placeOrder/:restName" component={PlaceOrder}/>
                <Route path="/viewBooking" component={ViewOrder} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Footer />
            </div>
            {/* <Home /> */}
        </BrowserRouter>
    )
}

export default Routing;