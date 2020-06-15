import React, { Component } from 'react';
import Pools from './Pools';
import Divider from '@material-ui/core/Divider';
import CreatePool from './CreatePool';
import axios from 'axios';
import { Card, Tooltip } from '@material-ui/core';
import { StoreProducts } from './StoreProducts';
import { red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import { Redirect } from 'react-router';
import Loading from '../Loading';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
const _ = require('lodash');
class PoolDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPool: props.poolDetails,
            showEditPool : false ,
            poolDetails: props.poolDetails,
            loader: false,
            user: {
                "id": 1,
                "screenName": "NithyaKuchadi",
                "nickName": "Nithya",
                "email": "nithya1901@gmail.com",
                "password": "nithY@123",
                "address": {
                    "streetNumber": "1292",
                    "streetName": "Mckinley",
                    "city": "Sunnyvale",
                    "state": "CA",
                    "zip": "94086"
                },
                "poolUser": null
            },
            redirectVar: "",
        };
        this.parsePoolDetail = this.parsePoolDetail.bind(this);
        this.parsePoolDetail(props.poolDetails);
        this.orderStatus = this.orderStatus.bind(this);
        this.onStoreView = this.onStoreView.bind(this);
        this.goToStores = this.goToStores.bind(this);
    }

    async componentDidMount() {
        // await this.getPoolDetails(this.state.currentPool.id);

    }

    async getPoolDetails(poolId) {
        this.setState({
            loader: true,
        })
        axios.get(`http://35.155.66.64:8080/poolCompleteDetails?poolId=${poolId}`)
            .then(response => {
                this.setState({
                    loader: false,
                })
                if (response.status === 200) {
                    this.setState({
                        poolDetails: response.data
                    });
                    this.parsePoolDetail(response.data);

                } else {
                    this.setState({
                        open: false,
                    })
                }
            })
            .catch(res => {
                this.setState({
                    loader: false,
                })
            })
    }
    parsePoolDetail(data) {
        sessionStorage.setItem('poolid', data.id);
        if (data.poolLeader.id == sessionStorage.getItem("id")) {
            sessionStorage.setItem('leader', 'true');

        }
        if (data.currentOrder) {
            sessionStorage.setItem('store', data.currentOrder.store.id)
        }

    }
    poolCreated(data) {
        this.setState({
            currentPool: data
        })
    }
    getStoreProducts(store) {
        return (
            <div class="row">
                <StoreProducts store={store} user={this.state.user}></StoreProducts>
            </div>
        )
    }
    onStoreView() {
        // let store = this.state.poolDetails.currentOrder.store ;

        let url = `/cartshare/store/${sessionStorage.getItem('store')}`;
        this.setState({
            redirectVar: <Redirect to={{
                pathname: url,
                state: {
                    store: { id: sessionStorage.getItem('store') , name  :sessionStorage.getItem('storeName')  },
                    isAdmin: false,
                    return: {
                        path: "/cartshare/pool",
                        text: "Return to Pool Details",
                        props: {
                            poolDetails: this.state.poolDetails
                        }
                    }
                }
            }} />
        })
    }

    goToStores() {
        // let store = this.state.poolDetails.currentOrder.store ;

        let url = `/cartshare/stores`;
        this.setState({
            redirectVar: <Redirect to={{
                pathname: url,
                state: {
                    isAdmin: false,
                    return: {
                        path: "/cartshare/pool",
                        text: "Return to Pool Details",
                        props: {
                            poolDetails: this.state.poolDetails
                        }
                    }
                }
            }} />
        })
    }

    orderStatus() {

        if (sessionStorage.getItem('leader')) {
            if (sessionStorage.getItem("currentOrderId")) {
                return (<button style={{ height: "33px", backgroundColor: "#5e5e5e", cursor: "normal" }} type="button" onClick={this.onStoreView} class="btn btn-">
                    <b style={{ fontSize: "14px", color: "white" }}>Place Order</b>
                </button>)
            }
            else {
                return (<Tooltip title={<span style={{ fontSize: "15px" }}>Please Select Store to Place an Order</span>} arrow>
                    <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" onClick={this.goToStores} class="btn btn-">
                        <b style={{ fontSize: "14px", color: "white" }}>Place Order</b>
                    </button>
                </Tooltip>)
            }
        }
        else {
            if (sessionStorage.getItem("currentOrderId")) {
                return (<button style={{ height: "33px", backgroundColor: "#5e5e5e", cursor: "normal" }} type="button" onClick={this.onStoreView} class="btn btn-">
                    <b style={{ fontSize: "14px", color: "white" }}>Place Order</b>
                </button>)
            }
            else {
                return (<Tooltip title={<span style={{ fontSize: "15px" }}>Pool leader not selected the store yet.</span>} arrow>
                    <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" onClick={this.goToStores} class="btn btn-">
                        <b style={{ fontSize: "14px", color: "white" }}>Place Order</b>
                    </button>
                </Tooltip>)
            }
        }

        // if (sessionStorage.getItem('store')) {
        //     if (this.state.poolDetails.currentOrder.status)
        //         return (
        //             <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.showAddProduct}>
        //                 <b style={{ fontSize: "14px", color: "white" }}>Check Order</b>
        //             </button>
        //         )
        //     else
        //         return (
        //             <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.showAddProduct}>
        //                 <b style={{ fontSize: "14px", color: "white" }}>Place Order</b>
        //             </button>
        //         )
        // }
        // else
        //     return (<button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.showAddProduct}>
        //         <b style={{ fontSize: "14px", color: "white" }}> Place Order</b>
        //     </button>)

    }
    onEditPool =(poolData)=>
    {
        let poolDetails = {
            ...this.state.poolDetails,
            name : poolData.name,
            description: poolData.description,
neighbourhoodName: poolData.neighbourhoodName,
        }
        this.setState({
            poolDetails : poolDetails,
            showEditPool : false
        })
        console.log(poolData);
    }

    handleAddClose= ()=>{
        this.setState({
            showEditPool : false
        })
    }
    handleClose = ()=>{
        this.setState({
            showDelete : false
        })
    }

    openDelete = ()=>{
        this.setState({
            showDelete : true
        })
    }

    deletePool = ()=>{
        axios.delete(`http://35.155.66.64:8080/pool?poolId=${this.state.poolDetails.id}`)
        .then(response => {
            // console.log("Status Code : ",response.status);
            if (response.status === 200) {
                // console.log("Job dded")

                this.props.deletePool();
                this.setState({
                    showDelete: false
                })

            } else {
                // console.log("Job Failure");
                // console.log(response);
                this.setState({
                    showDelete: true
                })
            }
        });
    }

    showdeletePool() {
        return (
            <div>
                {this.state.redirectVar}
                <Dialog open={this.state.showDelete} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ "min-width": "700px" }}>
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Delete Pool</h5>
                        <button type="button" class="close" onClick={this.handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                Do you want to remove {this.state.poolDetails.name}  ?

                                </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={this.handleClose}>No</button>
                        <button type="button" class="btn btn-primary" onClick={this.deletePool} >Yes</button>
                    </div>
                </Dialog>
            </div>
        )
    }
    render() {
       
        return (
            <div>
                <Loading loading={this.state.loader}></Loading>
                <CreatePool open={this.state.showEditPool} handleAddClose={this.handleAddClose} addPool={this.addPool} edit= {true} editpool={this.state.poolDetails} editpoolFunc = {this.onEditPool} ></CreatePool>
                     {this.state.showDelete?this.showdeletePool():""}
                <div style={{ maxWidth: "400px", padding: "20px" }}>
                    {this.state.redirectVar}
                    <Card>
                        {/* {this.applyPoolHtml()} */}
                        <div class="row" style={{ padding: "10px", paddingLeft: "20px" }} >
                            <div class="row">
                                <div class="col-md-6" style={{ fontSize: "20px", padding: "10px", paddingLeft: "0px" }}>
                                    {this.state.poolDetails.name}
                                </div>
                                <div className="col-md-6" style={{

                                    "margin-top": "10px"
                                }}>
                                    {this.orderStatus()}
                                </div>
                            </div>

                            <div class="row" >
                                {this.state.poolDetails.description}
                            </div>
                            <div class="row" >
                                Neighbourhood Name : {this.state.poolDetails.neighbourhoodName}
                                    </div>
                            <div class="row" >
                                <div class = "col-md-8">
                                Zip Code : {this.state.poolDetails.zipCode}
                                </div>
                                <div class = "col-md-2" style = {{ cursor : "pointer"}}>
                                {sessionStorage.getItem('leader') ? <EditTwoToneIcon color="primary" fontSize="large" onClick={()=>{ this.setState({ showEditPool : true})}}></EditTwoToneIcon> : ""}
                      
                                </div>

                                <div class = "col-md-2" style = {{ cursor : "pointer"}}> 
                                {sessionStorage.getItem('leader') && !sessionStorage.getItem("currentOrderId") && this.state.poolDetails.members && this.state.poolDetails.members.length == 1  ? <DeleteForeverIcon color="primary" fontSize="large" onClick={this.openDelete}></DeleteForeverIcon> : ""}

                                </div>
                               
                               
                            </div>
                        </div>

                    </Card>
                </div>
                {/* {this.state.poolDetails.currentOrder ? !this.state.poolDetails.currentOrder.status ? this.getStoreProducts(this.state.poolDetails.currentOrder.store) : "" : ""} */}


            </div>
        )
    }
}


export default PoolDetails;