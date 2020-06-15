import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Dialog from '@material-ui/core/Dialog';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../Loading';
const _ = require('lodash');
export class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddStore: false,
            loader : false ,
            editProduct: {},
            storeList: [
            ]
        };
        this.showAllStores = this.showAllStores.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.showAddStore = this.showAddStore.bind(this);
        this.showEditProduct = this.showEditProduct.bind(this);
        this.addStore = this.addStore.bind(this);
        this.editStore = this.editStore.bind(this);
        this.selectStore = this.selectStore.bind(this);
        // sessionStorage.setItem('email', 'kuchadi@sjsu.edu');
        // sessionStorage.setItem('id', 1);

    }

    componentDidMount() {
        this.getAllStores();
    }

    getAllStores() {
        this.setState({
            loader : true,
        })
        axios.get(`http://35.155.66.64:8080/admin/store/allStores`)
            .then(response => {
                this.setState({
                    loader : false
                })
                // console.log("Status Code : ",response.status);
                if (response.status === 200) {
                    // console.log("Job dded")
                    this.setState({
                        storeList: response.data
                    })
                } else {
                    // console.log("Job Failure");
                    // console.log(response);
                    this.setState({
                        open: false,
                    })
                }
            })
            .catch( res =>{
                this.setState({
                    loader : false
                })
            })
    }
    showAllStores() {
        if (this.state.storeList) {
            let listItems = [];
            this.state.storeList.map((store) => {

                listItems.push(
                    <div class="col-md-4" style={{ "max-width": "300px" }}>
                        <StoreDetail store={store} showEditProduct={this.showEditProduct} selectStore={this.selectStore} > </StoreDetail>
                    </div>);
            }


            );
            return listItems;
        }
    }
    showAddStore() {
        this.setState({
            showAddStore: true,
        })
    }
    handleAddClose() {
        this.setState({
            editProduct: {},
            showAddStore: false,
        })

    }
    editStore(data) {
        let list = this.state.storeList;

        let index = _.findIndex(list, function (o) { return o.id === data.id });

        list[index] = data;

        this.setState({
            storeList: list,
            editProduct: {},
            showAddStore: false,
        })

    }

    selectStore(data) {
        let list = this.state.storeList;

        let index = _.findIndex(list, function (o) { return o.id === data.id });

        list = list.slice(0, index).concat(list.slice(index + 1));

        this.setState({
            storeList: list,
            editProduct: {},
            showAddStore: false,
        })
    }
    addStore(data) {
        console.log(data);
        let list = this.state.storeList;
        list.push(data);
        this.setState({
            storeList: list
        })
        this.setState({
            editProduct: {},
            showAddStore: false,
        })
    }
    showEditProduct(data) {

        this.setState({
            editProduct: data,
            showAddStore: true
        })
    }


    render() {

        let redirectVar = null ;
        if(sessionStorage.getItem("persona")!="user")
        {
            redirectVar = 
            (<Redirect to = "/signin">

            </Redirect>)
        }
        return (
            <div>
                {redirectVar}
                <div>
                <Loading loading = {this.state.loader}></Loading>
                    <div className="row" style={{ marginBottom: "15px", padding: "30px" }}>
                        <div className="col-md-4" style={{ padding: "0px" }}>
                            <p style={{ fontSize: "25px" }}>Stores</p>
                        </div>
                        <div className="col-md-6" >
                        </div>
                        <div className="col-md-2" >

                        </div>
                    </div>
                    <Divider light style={{ margin: "2px 0px 15px" }} />
                    <div class="row">
                        {this.showAllStores()}
                    </div>

                </div>
            </div>
        )
    }

}



class StoreDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditIcon: false,
            loader : false ,
            redirectVar: ""
        }
        this.handleMouseLEave = this.handleMouseLEave.bind(this);
        this.handlemouseEnter = this.handlemouseEnter.bind(this);
        this.showEditProduct = this.showEditProduct.bind(this);
        this.selectStore = this.selectStore.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openSelect = this.openSelect.bind(this);
        this.showSelectStore = this.showSelectStore.bind(this);
        this.onStoreView = this.onStoreView.bind(this);
        this.getStoreStatus = this.getStoreStatus.bind(this);
    }
    handlemouseEnter() {
        this.setState({
            showEditIcon: true
        })
    }
    handleMouseLEave() {
        this.setState({
            showEditIcon: false
        })
    }

    showEditProduct() {
        this.props.showEditProduct(this.props.store)
    }

    selectStore() {
        this.setState({
            loader : true ,
        })
        axios.post(`http://35.155.66.64:8080/order/${sessionStorage.getItem('poolid')}/${this.props.store.id}`)
            .then(response => {
                this.setState({
                    loader : false ,
                })
                if (response.status === 200) {
                    // console.log("Job dded")
                   
                    sessionStorage.setItem('store', this.props.store.id)
                    sessionStorage.setItem('currentOrderId',response.data)
                    this.setState({
                        showSelect: false
                    })

                } else {
                    // console.log("Job Failure");
                    // console.log(response);
                    this.setState({
                        showSelect: true
                    })
                }
            })
            .catch(res =>{
                this.setState({
                    loader : false ,
                })
            })

    }
    handleClose() {
        this.setState({
            showSelect: false
        })
    }
    openSelect() {
        this.setState({
            showSelect: true
        })
    }
    showSelectStore() {
        return (
            <div>
                {this.state.redirectVar}
                <Dialog open={this.state.showSelect} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ "min-width": "700px" }}>
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Select Store</h5>
                        <button type="button" class="close" onClick={this.handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                Do you want to select {this.props.store.name}   for the Pool order  ?

                                </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={this.handleClose}>No</button>
                        <button type="button" class="btn btn-primary" onClick={this.selectStore} >Yes</button>
                    </div>
                </Dialog>
            </div>
        )
    }

    onStoreView() {
        let url = `/cartshare/store/${this.props.store.id}`;
        this.setState({
            redirectVar: <Redirect to={{
                pathname: url,
                state: {
                    store: this.props.store,
                    isAdmin: false,
                    return : {
                        path : "/cartshare/stores",
                        text : "Return to All Stores",
                        
                    }
                }
            }} />
        })
    }
    getStoreStatus() {
        if(sessionStorage.getItem('store'))
        {
            return(
                <div class="col-md-2" style={{ padding: "0px", cursor: "pointer" }} >
                { sessionStorage.getItem('store') == this.props.store.id ? "Selected Store" : "" }
            </div>
            )
        }
        return (
            <div class="col-md-2" style={{ padding: "0px", cursor: "pointer" }} onClick={this.openSelect}>
                {this.state.showEditIcon ? sessionStorage.getItem('leader') ? "Select":"" : ""}
            </div>
        )
    }

    render() {
        let redirectVar = null ;
        if(sessionStorage.getItem("persona")!="user")
        {
            redirectVar = 
            (<Redirect to = "/signin">

            </Redirect>)
        }
        return (

            <Card>
                {redirectVar}
                 <Loading loading = {this.state.loader}></Loading>
                {this.showSelectStore()}
                <div class="row" style={{ padding: "10px" }} onMouseEnter={this.handlemouseEnter} onMouseLeave={this.handleMouseLEave}>
                    <div class="row">
                        <div class="col-md-8" style={{ fontSize: "20px", cursor: "pointer" }}>
                            <Link onClick={this.onStoreView}>  {this.props.store.name}</Link>

                        </div>
                        {this.getStoreStatus()}

                    </div>
                    <div class="row">
                        <div class="col-md-10" >
                            Address : {this.props.store.address.streetName}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10" >
                            {this.props.store.address.streetNumber}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10" >
                            City : {this.props.store.address.city}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10" >
                            State : {this.props.store.address.state}
                        </div>
                    </div>
                    <div class="row" style={{ minHeight: "30px" }}>
                        <div class="col-md-10" >
                            Zip : {this.props.store.address.zip}
                        </div>
                        
                    </div>
                </div>
            </Card>
        )
    }

}

// export  StoreList;