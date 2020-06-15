import React, { Component } from 'react'
import PoolOrderItem from './PoolOrderItem';
import { Button } from '@material-ui/core'
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import Loading from '../Loading'
import { Redirect } from 'react-router';

let selectedorders = []

class PoolOrders extends Component {
    state = { list: [], prevOrder: null,loader : false }
    componentDidMount() {
        selectedorders = []
        this.setState({
            loader : true 
        })

        Axios.get('http://35.155.66.64:8080/order/getUnPickedUpOrders/' + sessionStorage.getItem('poolid'))
            .then(res => {
                this.setState({
                    loader : false 
                })
                if (this.props.location.prevOrder) {
                    this.setState({ prevOrder: this.props.location.prevOrder, list: res.data });
                }
                else
                    this.setState({ list: res.data });
            }).catch(err=>{
                this.setState({
                    loader : false 
                })
                toast.warn('Please visit pool section!', {
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

    onSelectedOrder = () => {
        selectedorders.push({ orderOfAUserId: this.state.list[0].id })
        this.setState({ list: this.state.list.slice(1, this.state.list.length) });
    }
    onPickUpOrder = () => {
        
        const poolId = sessionStorage.getItem('poolid');
        const id = sessionStorage.getItem('id');

        Axios.put(`http://35.155.66.64:8080/order/${poolId}/${id}`, { deliveries: selectedorders })
            .then(res => {
                
                 window.location.replace('/cartshare/deliveries')

                //email condition check and code
                console.log(res);
            }).catch(err=>{
                
            })

        if (this.state.prevOrder != null) {

            Axios.post(`http://35.155.66.64:8080/order/PlacedWithPickups/${this.state.prevOrder.id}`, { deliveries: selectedorders })
            .then(res => {
                window.location.replace('/cartshare/orders')
                

                console.log(res);
            }).catch("Fail!")

            
            //place email with order confirmation
        }
        else {

            Axios.post(`http://35.155.66.64:8080/order/onlyPickup`, { deliveries: selectedorders })
            .then(res => {
                window.location.replace('/cartshare/deliveries')
                this.setState({
                    loader : false 
                })
                console.log(res);
            }).catch("Fail!")
            //place email with only current orders;
        }

    }
    render = () => {
        console.log(this.state.prevOrder);
        if(this.state.prevOrder!=null&&this.state.list.length===0){
            this.onPickUpOrder();
        }
        let redirectVar = null ;
        if(sessionStorage.getItem("persona")!="user")
        {
            redirectVar = 
            (<Redirect to = "/signin">

            </Redirect>)
        }
        return (
            
            <div>
                <ToastContainer />
                <Loading loading={this.state.loader}></Loading>
                {redirectVar}
                {selectedorders.length != 0 && this.state.list.length === 0 ? (<div style={{ width: '40%', margin: "auto", marginTop: "10%" }}>You have picked up all the orders! please click done to complete the Pick up.
                <div style={{ width: "30%", margin: "auto", marginTop: 20 }}>
                        <Button variant="contained"
                            color="secondary"
                            style={{ width: "100%" }} onClick={this.onPickUpOrder}>
                            Done
                </Button>
                    </div>
                </div>) :
                    <div style={{ width: '70%', margin: "auto" }}>
                        {this.state.list.length > 0 && <PoolOrderItem productList={this.state.list[0].orderedProducts} />}
                        {this.state.list.length === 0 && <div style={{ width: '70%', float: "left", marginLeft: "60%", marginTop: "10%" }}>No Orders</div>}
                        <div style={{ width: "35%", margin: "auto", marginTop: "2%" }}>
                            {this.state.list.length > 0 && <div><Button variant="contained"
                                color="primary"
                                style={{ width: "40%", float: "left" }} onClick={this.onSelectedOrder}>
                                Pick Up Order
                </Button>
                                <Button variant="contained"
                                    color="primary"
                                    style={{ width: "40%", float: "right" }} onClick={this.onPickUpOrder}>
                                    Done
                </Button></div>}
                        </div>
                    </div>}

            </div>
        )
    }
}

export default PoolOrders;