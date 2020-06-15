import React, { Component } from 'react'
import Axios from 'axios'
import ProductList from './Orders/ProductList'

import Paper from '@material-ui/core/Paper/Paper';


import CropFreeIcon from '@material-ui/icons/CropFree';

import HomeIcon from '@material-ui/icons/Home';

import Button from '@material-ui/core/Button/Button'

import DeliverDialog from './DeliveriesDialog'

import QRCode from 'qrcode.react'

import Grid from '@material-ui/core/Grid'

import Typography from '@material-ui/core/Typography'

import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router';

import Loading from '../Loading'

let popUp = null
class MyDeliveries extends Component {
    state = { deliveryList: [], popUp: false  ,loader : false  }
    componentDidMount() {
        this.setState({
            loader : true 
        })
        Axios.get('http://35.155.66.64:8080/order/deliveryInstructions/' + sessionStorage.getItem('poolUserId'))
            .then(res => {
                this.setState({
                    loader : false 
                })
                this.setState({ deliveryList: res.data })
            }).catch(err => {
                this.setState({
                    loader : false 
                })
                toast.warn('Please join a pool first', {
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

    deliveredHandler = (orderId, name) => {

        Axios.put("http://35.155.66.64:8080/order/status/" + orderId, { status: "Delivered" }).then(response => {
            toast.success('Order has been delivered!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            let newList = []
            for (let i of this.state.deliveryList) {
                let newElement = {}
                newElement = JSON.parse(JSON.stringify(i))
                if (i.order.id === orderId) {
                    continue;
                }
                newList.push(newElement)
            }
            this.setState({ deliveryList: newList })
            this.closeDialog()
            
        }).catch(err => {
            window.alert("Fail")
        });
    }

    pickUpHandler = () => {
        let obj = {}
        let pickUps = []
        for (let i of this.state.deliveryList) {
            pickUps.push({ "orderOfAUserId": i.order.id });
        }
        this.setState({
            loader : true 
        })
        obj.pickupRequests = pickUps;
        Axios.put("http://35.155.66.64:8080/order/pickUp/", obj).then(response => {
            let newList = []
            this.setState({
                loader : false 
            })
            for (let i of this.state.deliveryList) {
                if (sessionStorage.getItem('id') === (i.deliveryDetials.id).toString())
                    continue;
                let newElement = {}
                newElement = JSON.parse(JSON.stringify(i))
                newElement.order.status = "Picked Up"
                newList.push(newElement)
            }
            this.setState({ deliveryList: newList })
            this.closeDialog()
            toast.success('All Orders have been picked up!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(err => {
            console.log(err)
            this.setState({
                loader : false 
            })
            
        });


    }

    getDeliveryInstructions = (deliveryDetails, orderId) => {
        if (popUp) {
            popUp = null
        }
        else {
            popUp = (
                <div>
                    <DeliverDialog close={this.closeDialog} displayComponent={
                        <div>
                            <Grid container item xs={12} style={{ marginBottom: 10 }}>
                                <h3>{deliveryDetails.screenName}</h3>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                justify="flex-end"
                                alignItems="flex-start">

                                <Grid container item xs={12}>

                                    <h4>Street Number: </h4><b>{deliveryDetails.address.streetNumber}</b>

                                </Grid>
                                <Grid container item xs={12}>
                                    <h4>Street Name: </h4><b>{deliveryDetails.address.streetName}</b>
                                </Grid>
                                <Grid container item xs={12}>
                                    <h4>City: </h4> <b>{deliveryDetails.address.city}</b>
                                </Grid>
                                <Grid container item xs={12}>
                                    <h4>State: </h4> <b>{deliveryDetails.address.state}</b>
                                </Grid>
                                <Grid container item xs={12}>
                                    <h4>Zip Code: </h4> <b>{deliveryDetails.address.zip}</b>
                                </Grid>
                            </Grid>
                        </div>
                    }


                        actionButton={<Button variant="contained" color="primary" onClick={() => { this.deliveredHandler(orderId, deliveryDetails.screenName) }}>Delivered</Button>}

                        heading={
                            <Typography variant="h5" gutterBottom>
                                Delivery Instructions for {deliveryDetails.nickName}
                            </Typography>
                        }
                    />
                </div>
            );
        }
        this.setState({ popUp: !this.state.popUp })
    }

    handlecheckout = (id) => {
        if (popUp) {
            popUp = null
        }
        else {
            popUp = (
                <div>
                    <DeliverDialog close={this.closeDialog} displayComponent={
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <QRCode value={id} />
                        </Grid>
                    }
                        actionButton={<Button variant="contained" color="primary" onClick={() => { this.pickUpHandler(id) }}>Pick Up</Button>}

                        heading={
                            <Typography variant="h4" gutterBottom>
                                Checkout for {sessionStorage.getItem('username')}
                            </Typography>
                        }
                    />
                </div>
            );
        }
        this.setState({ popUp: !this.state.popUp })

    }

    closeDialog = () => {
        popUp = null;
        this.setState({ popUp: !this.state.popUp })
    }

    render = () => {
        let redirectVar = null ;
        if(sessionStorage.getItem("persona")!="user")
        {
            redirectVar = 
            (<Redirect to = "/signin">

            </Redirect>)
        }
        return (
            <div>
<Loading loading={this.state.loader}></Loading>
                {redirectVar}
                {popUp}
                {this.state.deliveryList.length === 0 ? (<div style={{ width: '100%', float: "left", marginLeft: "45%", marginTop: "10%" }}>No Deliveries</div>) : null}
                {this.state.deliveryList.map((deliveryItem) => {
                    return (
                        <div style={{ marginLeft: "20%", marginRight: "20%" }}>
                            <ToastContainer />
                            <Paper style={{ marginBottom: "10", marginTop: "3%" }} elevation={3}>
                                <Typography variant="h3" gutterBottom style={{ width: "80%", marginLeft: "5%", paddingTop: "3%" }}>
                                    Order for {deliveryItem.deliveryDetials.screenName}
                                </Typography>
                                <div style={{ paddingRight: "4%", paddingBottom: "1%" }}>
                                    <Grid spacing={2}>
                                    <ProductList status={deliveryItem.order.status} pickedupBy={deliveryItem.order.pickedUpBy} orderDetails={deliveryItem.deliveryDetials} list={deliveryItem.order.orderedProducts} />

                                    {deliveryItem.order.status === "Picked Up" ? (
                                        <div style={{paddingTop:5}}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            endIcon={<HomeIcon />}
                                            style={{ marginTop: 5, marginBottom: 5, marginLeft: 690 }}
                                            onClick={() => { this.getDeliveryInstructions(deliveryItem.deliveryDetials, deliveryItem.order.id) }}> Delivery Instructions</Button></div>) : null}
                                            </Grid>
                                </div>
                            </Paper>

                        </div>

                    )
                })}
                {this.state.deliveryList.length && this.state.deliveryList[0].order.status != "Picked Up" ? (
                    <div style={{width:"15%",margin:"auto"}}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<CropFreeIcon />}
                        style={{ marginTop: "10%", marginBottom: 5,minWidth:"70%" }}
                        onClick={() => { this.handlecheckout(this.state.deliveryList[0].order.id) }}>Checkout</Button>
                        </div>) : null}
            </div>)
    }
}

export default MyDeliveries