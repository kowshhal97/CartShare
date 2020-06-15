import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import StoreModification from './StoreModification';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Dialog from '@material-ui/core/Dialog';
import Loading from '../Loading';
import { ToastContainer, toast } from 'react-toastify';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import NewProductAllStores from './NewProductAllStores';
const _ = require('lodash');
class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddStore: false,
            showAddProduct : false ,
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
        this.handleAddProductClose = this.handleAddProductClose.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.showAddProduct = this.showAddProduct.bind(this);

        this.deleteStore = this.deleteStore.bind(this);
        // sessionStorage.setItem('email', 'kuchadi@sjsu.edu');
        // sessionStorage.setItem('id', 1);

    }

    componentDidMount() {
        this.getAllStores();
    }

    getAllStores() {
        this.setState({
            loader : true ,
        })
        axios.get(`http://35.155.66.64:8080/admin/store/allStores/`)
            .then(response => {
                this.setState({
                    loader : false 
                })
                if (response.status === 200) {
                    this.setState({
                        storeList: response.data
                    })
                } else {
                    this.setState({
                        open: false,
                    })
                }
            })
            .catch(err=>{
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
                        <StoreDetail store={store} showEditProduct={this.showEditProduct} deleteStore = {this.deleteStore} > </StoreDetail>
                    </div>);
            }


            );
            if(listItems.length)
            return listItems;
            else
            {
                return (
                    <div class ="row" style = {{ "padding" : "20px"}}>

                   
                    <Card>
                        <div class ="row" style = {{     "font-size": "25px",
    "padding": "10px"}}>
                                No Stores added yet!
                        </div>
                    </Card>
                    </div>
                )
            }
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

    deleteStore(data) {
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
    showAddProduct() {
        this.setState({
            showAddProduct: true,
        })
    }
    handleAddProductClose() {
        this.setState({
            editProduct: {},
            showAddProduct: false,
        })

    }
    addProduct(data) {
        console.log(data);
        let list = this.state.productList;
        // list.push(data);
        // this.setState({
        //     productList: list,
        //     filterProducts: this.getFilterProducts(list, this.state.searchProductName),
        // })
        this.setState({
            editProduct: {},
            showAddProduct: false,
        })
    }

    render() {

        return (
            <div>
                <div>
                <Loading loading={this.state.loader}></Loading>
                    <NewProductAllStores  open={this.state.showAddProduct} storeList = {this.state.storeList}  handleAddClose={this.handleAddProductClose} addProduct={this.addProduct}   ></NewProductAllStores>
                    <div className="row" style={{ marginBottom: "15px", padding: "30px" }}>
                        <div className="col-md-4" style={{ padding: "0px" }}>
                            <p style={{ fontSize: "25px" }}>Showing All Stores</p>
                        </div>
                        <div className="col-md-4" >
                        </div>
                        <div className="col-md-2" >
                            <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" disabled = {!this.state.storeList.length} onClick={this.showAddProduct}>
                                <b style={{ fontSize: "14px", color: "white" }}>Add Product</b>
                            </button>
                        </div>
                        <div className="col-md-2" >
                            <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.showAddStore}>
                                <b style={{ fontSize: "14px", color: "white" }}>Add Store</b>
                            </button>
                        </div>
                    </div>
                    <Divider light style={{ margin: "2px 0px 15px" }} />
                    <StoreModification open={this.state.showAddStore} handleAddClose={this.handleAddClose} addStore={this.addStore} edit={this.state.editProduct.name ? true : false} store={this.state.editProduct} editStore={this.editStore}></StoreModification>
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
            redirectVar : ""
        }
        this.handleMouseLEave = this.handleMouseLEave.bind(this);
        this.handlemouseEnter = this.handlemouseEnter.bind(this);
        this.showEditProduct = this.showEditProduct.bind(this);
        this.deleteStore = this.deleteStore.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.showDeleteStore = this.showDeleteStore.bind(this);
        this.onStoreView = this.onStoreView.bind(this);
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

    deleteStore() {
        axios.delete(`http://35.155.66.64:8080/admin/store/delete/${this.props.store.id}`)
            .then(response => {
                // console.log("Status Code : ",response.status);
                if (response.status === 200) {
                    // console.log("Job dded")

                    this.props.deleteStore(this.props.store);
                    this.setState({
                        showDelete : false
                    })

                } else {
                    // console.log("Job Failure");
                    // console.log(response);
                    this.setState({
                        showDelete : true
                    })
                }
            }).catch(err=>{
                toast.warn("Store has Unfullfilled orders", {
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
    handleClose() {
        this.setState({
            showDelete: false
        })
    }
    openDelete() {
        this.setState({
            showDelete: true
        })
    }
    showDeleteStore() {
        return (
            <div>
                {this.state.redirectVar}
                <Dialog open={this.state.showDelete} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ "min-width": "700px" }}>
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Delete Store</h5>
                        <button type="button" class="close" onClick={this.handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                Do you want to remove {this.props.store.name}  ?

                                </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={this.handleClose}>No</button>
                        <button type="button" class="btn btn-primary" onClick={this.deleteStore} >Yes</button>
                    </div>
                </Dialog>
            </div>
        )
    }

    onStoreView()
    {
        // let url = `/admin/store/${this.props.store.id}`;
        // this.setState({
        //     redirectVar: <Redirect to={{
        //         pathname: url,
        //         state: {
        //             store: this.props.store,
        //             isAdmin: true,
        //         }
        //     }} />
        // })
    }


    render() {
        let redirectVar = null;
        if (!sessionStorage.getItem("persona")) 
            redirectVar = <Redirect to = "/admin/signin" />
        return (
            <Card>
                {redirectVar}
                <ToastContainer></ToastContainer>
                {this.showDeleteStore()}
                <div class="row" style={{ padding: "10px" }} onMouseEnter={this.handlemouseEnter} onMouseLeave={this.handleMouseLEave}>
                    <div class="row">
                        <div class="col-md-10" style={{ fontSize: "20px" , cursor : "pointer" }}>
                        <Link onClick = {this.onStoreView}>  {this.props.store.name}</Link>
                           
                        </div>

                        <div class="col-md-1" style={{ padding: "0px", cursor: "pointer" }}>
                            {this.state.showEditIcon ? <EditTwoToneIcon color="primary" fontSize="large" onClick={this.showEditProduct}></EditTwoToneIcon> : ""}

                        </div>
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
                    <div class="row" style = {{ minHeight : "30px"}}>
                        <div class="col-md-10" >
                            Zip : {this.props.store.address.zip}
                        </div>
                        <div class="col-md-1" style={{ padding: "0px", cursor: "pointer" }}>
                            {this.state.showEditIcon && (this.props.store.currentOrders == null || this.props.store.currentOrders.length === 0) ? <DeleteForeverIcon color="primary" fontSize="large" onClick={this.openDelete}></DeleteForeverIcon> : ""}

                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default StoreList;