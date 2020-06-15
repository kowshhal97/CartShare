import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Signup from '../UserSignup/Signup.js';
import Login from '../UserSignup/Login.js';
import Navbar from '../Navbar.js';
import LandingPage from '../LandingPage.js';
import Profile from '../UserSignup/Profile.js';
import AdminSignup from '../AdminSignup/AdminSignup.js';
import AdminLogin from '../AdminSignup/AdminLogin.js';
import StoreList from '../Admin/StoreList.js';
import StoreProducts from '../Admin/StoreProducts.js';
import UserLandingPage from '../Users/UserLandingPage.js';
import {StoreList as userStoreList} from '../Users/StoreList';
import {StoreProducts as userStoreProducts} from '../Users/StoreProducts';

import Pickup from './../Users/PoolOrders'

import Orders from '../Users/Orders/Orders'

import Deliveries from '../Users/MyDeliveries';
import Message from '../UserSignup/Message';

// import CancelledOrders from './../Users/Orders/cancelledOrders'
// import OrderStatus from './../Users/Orders/orderStatus'
// import OpenOrders from './../Users/Orders/openOrders'
// import CancelOrder from './../Users/Orders/cancelOrder'

// import OrderDetails from './../Users/Orders/orderDetails'


class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
                <Route exact path="/" component={Login} />
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/landingpage" component={LandingPage} />
                <Route exact path="/user/profile" component={Profile} />
                <Route exact path="/admin/signin" component={AdminLogin} />
                <Route exact path="/admin/signup" component={AdminSignup} />
                 <Route exact path="/admin/stores" component={StoreList} />
                 <Route exact path="/admin/products" component={StoreProducts} />
                <Route exact path="/admin/store/:id" component={StoreProducts} />
                <Route exact path="/cartshare/store/:id" component={userStoreProducts} />
                {/* <Route exact path="/cartshare/products" component={userStoreProducts} /> */}
                <Route exact path="/cartshare/pool" component={UserLandingPage} />
                <Route exact path="/cartshare/stores" component={userStoreList} />
                <Route exact path="/cartshare/user" component={UserLandingPage} />
                <Route exact path='/cartshare/orders/' component={Orders} />
                <Route exact path='/cartshare/pickUp/' component={Pickup} />
                <Route exact path='/cartshare/deliveries' component={Deliveries} />
                <Route exact path='/user/message' component={Message} />
                {/* <Route path='/cartshare/orders/details/' component={OrderDetails} />
        

        <Route path='/cartshare/orders/cancelOrder/' component={CancelOrder} />
        <Route exact path='/user/open/' component={OpenOrders} />
        <Route path='/user/cancelled/' component={CancelledOrders} />
        <Route path='/cartshare/orders/orderStatus/' component={OrderStatus} /> */}

            </div>
        )
    }
}

export default Main;