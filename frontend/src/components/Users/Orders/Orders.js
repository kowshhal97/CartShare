import React, { Component } from 'react'
import Axios from 'axios';
import ProductList from './ProductList';
import { Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading'


class Orders extends Component {
    state = { productList: [], status: "No orders", pickUpBy: "Nobody",orderId:"" ,loader:false}
    componentDidMount() {
        this.setState({
            loader : true 
        })
        Axios.get('http://35.155.66.64:8080/order/user/' + sessionStorage.getItem('poolUserId'))

            .then(res => {
                this.setState({
                    loader : false 
                })
                // console.log(res.data.pickedUpBy)
                this.setState({ productList: res.data.orderedProducts, status: res.data.status, pickUpBy: res.data.pickedUpBy,orderId:res.data.id });
            })
            .catch(err => {
                this.setState({
                    loader : false 
                })
                toast.warn('Please visit the pool section first!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    NotRecieved = () => {
        this.setState({
            loader : true 
        })
        
        Axios.post("http://35.155.66.64:8080/order/notDelivered/"+this.state.orderId).then(res=>{
            this.setState({
                loader : false 
            })
            toast.info('We have notified the deliverer!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(err=>{
            window.alert("Fail");
        });
        
        
    }

    render() {

        if ((this.state.pickUpBy != 'Nobody' &&this.state.pickUpBy!=null&& this.state.pickUpBy.id.toString() === sessionStorage.getItem('id') && this.state.status === "Delivered")) {
            this.setState({ productList: [] ,status:"No orders"});
        }
        return (
            <div>


                <div>
                <Loading loading={this.state.loader}></Loading>
                    <ToastContainer />
                    <div style={{ width: '70%', float: "left" }}>
                        <ProductList list={this.state.productList} />
                        {this.state.status === "Delivered" ?
                            (<Button variant="contained" size="medium" color="primary" style={{ width: "20%", marginLeft: "50%", marginRight: "50%", marginTop: "2%" }} onClick={this.NotRecieved}>
                                Not Recieved
                    </Button>) : null}
                    </div>
                    <div>
                        <a class="ui teal tag label">{this.state.status}</a>
                        <a class="ui teal tag label">{this.state.status}</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Orders;