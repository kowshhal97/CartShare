import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../App.css';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
       
    }
    handleLogout=()=>
    {
        sessionStorage.clear();

    }


    render() {
        let navBar = null;
        if(sessionStorage.getItem('persona') === 'user' && sessionStorage.getItem("email"))
        {
            navBar = (
                <div>
                     <ul class="nav navbar-nav ">
                        <li><Link to="/cartshare/pool" style={{ color: "white" }}>Pool</Link></li>
                    </ul>
                  
                     <ul class="nav navbar-nav ">
                        <li><Link to="/cartshare/stores" style={{ color: "white" }}>Stores</Link></li>
                    </ul>
                     <ul class="nav navbar-nav ">
                        <li><Link to="/cartshare/orders"  style={{ color: "white" }}>My Order</Link></li>
                    </ul>
                    <ul class="nav navbar-nav ">
                        <li><Link to="/cartshare/pickUp" style={{ color: "white" }}>Pick-Up Pool Orders</Link></li>
                    </ul>
                    <ul class="nav navbar-nav ">
                        <li><Link to="/cartshare/deliveries" style={{ color: "white" }}>Delivery</Link></li>
                    </ul>
                    <ul class="nav navbar-nav ">
                        <li><Link to="/user/profile" style={{ color: "white" }}>Profile</Link></li>
                    </ul>
                    <ul class="nav navbar-nav ">
                        <li><Link to="/user/message" style={{ color: "white" }}>Message</Link></li>
                    </ul>
                    
                    <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "white" }}><span class="glyphicon glyphicon-log-out"></span> Logout</Link></li>

                </ul>
            </div>
        )
       }
       if(sessionStorage.getItem('persona') === 'admin' && sessionStorage.getItem("email"))
        {
            navBar = (
                <div>
                     <ul class="nav navbar-nav ">
                        <li><Link to="/admin/stores" style={{ color: "white" }}>Stores</Link></li>
                    </ul>
                    <ul class="nav navbar-nav ">
                        <li><Link to="/admin/products" style={{ color: "white" }}>Products</Link></li>
                    </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/signin" onClick={this.handleLogout} style={{ color: "white" }}><span class="glyphicon glyphicon-log-out"></span> Logout</Link></li>

                </ul>
            </div>
        )
       }
        let redirectVar = null;

    // if (!sessionStorage.getItem("persona")) redirectVar = <Redirect to="/signin" />


        return (
            <div>
                {redirectVar}
                <nav class="navbar  nav-bar-complete" style={{ backgroundColor: "#111111", borderRadius: "0px", padding: "0px", margin: "0px", paddingTop: "3px", paddingBottom: "3px" }}>
                    <div class="container-fluid">
                    <ul class="nav navbar-nav navbar-left">
                    <li><Link style={{ color: "white" }}><span class="glyphicon glyphicon-log-out"></span> Cart Share</Link></li>
                </ul>
                   {navBar}
                    </div>
                </nav>
            </div>
        )
    }
}


export default NavBar;