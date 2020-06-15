import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import StoreModification from './StoreModification';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Dialog from '@material-ui/core/Dialog';

import { ToastContainer, toast } from 'react-toastify';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import ProductModification from './ProductModification';
import { Avatar } from '@material-ui/core';
const _ = require('lodash');
class StoreProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddProduct: false,
            editProduct: {},
            searchProductName: "",
            searchStore : "",
            searchSku : "",
            filterProducts: [],
            productList: [
            ]
        };
        this.showAllProducts = this.showAllProducts.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.showAddProduct = this.showAddProduct.bind(this);
        this.showEditProduct = this.showEditProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.getFilterProducts = this.getFilterProducts.bind(this);
        this.productSearchHandler = this.productSearchHandler.bind(this);

        // sessionStorage.setItem('email', 'kuchadi@sjsu.edu');
        // sessionStorage.setItem('id', 1);

    }

    componentDidMount() {
        this.getAllProductsOfStore();
    }

    getAllProductsOfStore() {
        axios.get(`http://35.155.66.64:8080/admin/product/all`)
            .then(response => {
                // console.log("Status Code : ",response.status);
                if (response.status === 200) {
                    // console.log("Job dded")
                    this.setState({
                        productList: response.data,
                        filterProducts: response.data
                    })
                } else {

                }
            });
    }
    showAllProducts() {
        if (this.state.filterProducts) {
            let listItems = [];
            this.state.filterProducts.map((product) => {

                listItems.push(
                    <div class="col-md-4" style={{ "max-width": "300px" }}>
                        <ProductDetail product={product} showEditProduct={this.showEditProduct} deleteProduct={this.deleteProduct} > </ProductDetail>
                    </div>);
            }


            );
            return listItems;
        }
    }
    showAddProduct() {
        this.setState({
            showAddProduct: true,
        })
    }
    handleAddClose() {
        this.setState({
            editProduct: {},
            showAddProduct: false,
        })

    }
    editProduct(data) {
        let list = this.state.productList;

        let index = _.findIndex(list, function (o) { return o.sku === data.sku });

        list[index] = data;

        this.setState({
            productList: list,
            filterProducts: this.getFilterProducts(list, this.state.searchProductName,this.state.searchSku,this.state.searchStore),
            editProduct: {},
            showAddProduct: false,
        })

    }

    deleteProduct(data) {
        let list = this.state.productList;

        let index = _.findIndex(list, function (o) { return o.sku === data.sku });

        list = list.slice(0, index).concat(list.slice(index + 1));

        this.setState({
            productList: list,
            filterProducts: this.this.getFilterProducts(list, this.state.searchProductName,this.state.searchSku,this.state.searchStore),
            editProduct: {},
            showAddProduct: false,
        })
    }
    addProduct(data) {
        console.log(data);
        let list = this.state.productList;
        list.push(data);
        this.setState({
            productList: list,
            filterProducts: this.this.getFilterProducts(list, this.state.searchProductName,this.state.searchSku,this.state.searchStore)
        })
        this.setState({
            editProduct: {},
            showAddProduct: false,
        })
    }
    showEditProduct(data) {

        this.setState({
            editProduct: data,
            showAddProduct: true
        })
    }
    productSearchHandler(e) {
        let searchProductTxt = e.target.value;
        this.setState({
            filterProducts: this.getFilterProducts(this.state.productList, searchProductTxt,this.state.searchSku,this.state.searchStore),
            searchProductName: searchProductTxt
        })
    }

    productSearchHandlerByStore =(e)=>
    {
        let searchProductStoreTxt = e.target.value;
       
        this.setState({
            filterProducts: this.getFilterProducts(this.state.productList, this.state.searchProductName,this.state.searchSku,searchProductStoreTxt),
            searchStore: searchProductStoreTxt
        })
    }
    productSearchHandlerBySku = (e)=>
    {
        let sku = e.target.value;
        this.setState({
            filterProducts: this.getFilterProducts(this.state.productList, this.state.searchProductName,sku,this.state.searchStore),
            searchSku: sku
        })
    }
    getFilterProducts(list, searchProductTxt,searchSku , searchStore) {
        return _.filter(list, function (o) { return o.name.toLowerCase().includes(searchProductTxt.toLowerCase()) && o.storeName.toLowerCase().includes(searchStore.toLowerCase()) &&  o.sku.toString().includes(searchSku.toString().toLowerCase())});

    }

    render() {
        let redirectVar = null;
        if (!sessionStorage.getItem("persona")) 
            redirectVar = <Redirect to = "/admin/signin" />
        return (
            <div>
                <div>
                    <div className="row" style={{ marginBottom: "15px", padding: "30px" }}>
                        {redirectVar}
                        <div className="col-md-4" style={{ padding: "0px" }}>
                            <p style={{ fontSize: "25px" }}>Showing All Products </p>
                        </div>
                        <div className="col-md-6" >
                        </div>
                        <div className="col-md-2" >
                            {/* <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.showAddProduct}>
                                <b style={{ fontSize: "14px", color: "white" }}>Add Product</b>
                            </button> */}
                        </div>
                    </div>
                    <Divider light style={{ margin: "2px 0px 15px" }} />
                    <ProductModification open={this.state.showAddProduct} curr_store={{id : this.state.editProduct.storeid}} handleAddClose={this.handleAddClose} addProduct={this.addProduct} edit={this.state.editProduct.name ? true : false} editProduct={this.state.editProduct} editProductFunc={this.editProduct}></ProductModification>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label id="validationCustomUsername"> Search By Product Name</label>
                                <input type="text" class="form-control" id="validationCustomUsername" name="searchProductName" value={this.state.searchProductName} onChange={this.productSearchHandler} placeholder="Product Name" required />
                            </div>
                            <div class="form-group">
                                <label id="validationCustomUsername"> Search By Store Name</label>
                                <input type="text" class="form-control" id="validationCustomUsername" name="searchStore" value={this.state.searchStore} onChange={this.productSearchHandlerByStore} placeholder="Store Name" required />
                            </div>
                            <div class="form-group">
                                <label id="validationCustomUsername"> Search By SKU</label>
                                <input type="text" class="form-control" id="validationCustomUsername" name="searchSku" value={this.state.searchSku} onChange={this.productSearchHandlerBySku} placeholder="SKU " required />
                            </div>
                        </div>
                        <div class="col-md-9">
                            {this.showAllProducts()}
                        </div>

                    </div>

                </div>
            </div>
        )
    }

}



class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditIcon: false,
            redirectVar: ""
        }
        this.handleMouseLEave = this.handleMouseLEave.bind(this);
        this.handlemouseEnter = this.handlemouseEnter.bind(this);
        this.showEditProduct = this.showEditProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.showdeleteProduct = this.showdeleteProduct.bind(this);
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
        this.props.showEditProduct(this.props.product)
    }

    deleteProduct() {
        axios.delete(`http://35.155.66.64:8080/admin/product/${this.props.product.storeid}/${this.props.product.sku}`)
            .then(response => {
                // console.log("Status Code : ",response.status);
                if (response.status === 200) {
                    // console.log("Job dded")

                    this.props.deleteProduct(this.props.product);
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
            }).catch(err=>{
                toast.warn("Products has Unfullfilled orders", {
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
    showdeleteProduct() {
        return (
            <div>
                {this.state.redirectVar}
                <Dialog open={this.state.showDelete} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ "min-width": "700px" }}>
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Delete Product</h5>
                        <button type="button" class="close" onClick={this.handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                Do you want to remove {this.props.product.name}  ?

                                </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={this.handleClose}>No</button>
                        <button type="button" class="btn btn-primary" onClick={this.deleteProduct} >Yes</button>
                    </div>
                </Dialog>
            </div>
        )
    }

    onStoreView() {
        let url = `/admin/store/${this.props.store.id}`;
        this.setState({
            redirectVar: <Redirect to={{
                pathname: url,
                state: {
                    store: this.props.store,
                    isAdmin: true,
                }
            }} />
        })
    }


    render() {
        let redirectVar = null;
        if (!sessionStorage.getItem("persona")) 
            redirectVar = <Redirect to = "/admin/signin" />
        return (
            <Card>
                  <ToastContainer />
                {redirectVar}
                {this.showdeleteProduct()}
                <div class="row" style={{ padding: "10px" }} onMouseEnter={this.handlemouseEnter} onMouseLeave={this.handleMouseLEave}>
                    <div class="row">
                        {this.props.product.imageUrl ? <img src={this.props.product.imageUrl} onClick={this.handleClickOpen} alt="new" class="companyImage" style={{
                            "max-height": "250px",
                            "min-height": "250px"
                        }}></img> : <div style={{
                            "max-height": "250px",
                            "min-height": "250px"
                        }}></div>}
                    </div>
                    <div class="row">
                        <div class="col-md-10" style={{ fontSize: "20px", cursor: "pointer" }}>
                           {this.props.product.name}

                        </div>

                        <div class="col-md-1" style={{ padding: "0px", cursor: "pointer" }}>
                            {this.state.showEditIcon ? <EditTwoToneIcon color="primary" fontSize="large" onClick={this.showEditProduct}></EditTwoToneIcon> : ""}

                        </div>
                    </div>
                    <div class = "row">
                    <div class="col-md-10" >
                            Store : {this.props.product.storeName}
                            </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10" >
                            Description : {this.props.product.description}
                        </div>
                    </div>
                    <div class="row" style={{ minHeight: "30px" }}>
                        <div class="col-md-10" >
                            $  {this.props.product.price} / {this.props.product.unitType}
                        </div>

                        <div class="col-md-1" style={{ padding: "0px", cursor: "pointer" }}>
                            {this.state.showEditIcon ? <DeleteForeverIcon color="primary" fontSize="large" onClick={this.openDelete}></DeleteForeverIcon> : ""}

                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default StoreProducts;