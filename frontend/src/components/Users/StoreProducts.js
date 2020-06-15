import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Dialog from '@material-ui/core/Dialog';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import Loading from '../Loading';

import OrderConfirmDialog from './Order Confirm Dialog/orderConfirmDialog'

let OrderDialog=null;
const _ = require('lodash');
export class StoreProducts extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            showAddProduct: false,
            searchProductName: "",
            loader : false ,
            editProduct: {},
            cart: [],
            store: !props.store ? props.location.state.store : props.store,
            filterProducts: !props.store ? props.location.state.store.products : props.store.products,
            productList: !props.store ? props.location.state.store.products : props.store.products,
            showDialog: false
        };
        this.showAllProducts = this.showAllProducts.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.showAddProduct = this.showAddProduct.bind(this);
        this.showEditProduct = this.showEditProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
        this.removeQuantity = this.removeQuantity.bind(this);
        this.productSearchHandler = this.productSearchHandler.bind(this);
        this.getBack = this.getBack.bind(this);
        // sessionStorage.setItem('email', 'kuchadi@sjsu.edu');
        // sessionStorage.setItem('id', 1);

    }

    dialogCloseHandler = () => {

        
        this.setState({showDialog: false})
    };

    componentDidMount() {
        if(this.props.location && this.props.location.state)
        this.getAllProductsOfStore();
    }

    getAllProductsOfStore() {
        axios.get(`http://35.155.66.64:8080/admin/product/${this.props.location.state.store.id}`)
            .then(response => {
                // console.log("Status Code : ",response.status);
                if (response.status === 200) {
                    // console.log("Job dded")
                    this.setState({
                        productList: response.data,
                        filterProducts : response.data
                    })
                } else {

                }
            });
    }

    addQuantity(product) {
        
        let list = this.state.cart
        let index = _.findIndex(list, function (o) { return o.sku === product.sku });
        if (index != -1) {
            list[index].quantity++;
            this.setState({
                cart: list
            })
        }
        else {
            let data = {
                "storeId": this.state.store.id,
                "sku": product.sku,
                "name":product.name,
                "price":product.price,
                "imageUrl":product.imageUrl,
                "quantity": 1
            }
            list.push(data);
            this.setState({
                cart: list
            })
        }
    }
    removeQuantity(product) {
        let list = this.state.cart
        let index = _.findIndex(list, function (o) { return o.sku === product.sku });
        if (index != -1) {
            list[index].quantity--;
            if (list[index].quantity === 0) {
                list = list.slice(0, index).concat(list.slice(index + 1));
            }
            this.setState({
                cart: list
            })
        }
    }
    showAllProducts() {
        if (this.state.filterProducts) {
            let listItems = [];
            this.state.filterProducts.map((product) => {

                listItems.push(
                    <div class="col-md-4" style={{ "max-width": "300px" , paddingBottom : "20px" }}>
                        <ProductDetail product={product} storeid={this.state.store.id} showEditProduct={this.showEditProduct} addProduct={this.addProduct} addQuantity={this.addQuantity} removeQuantity={this.removeQuantity}> </ProductDetail>
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
    productSearchHandler(e) {
        let searchProductTxt = e.target.value;
        let list = this.state.productList;
        let fList = _.filter(list, function (o) { return o.name.toLowerCase().includes(searchProductTxt.toLowerCase()); });
        this.setState({
            filterProducts: fList,
            searchProductName: searchProductTxt
        })
    }
    editProduct(data) {
        let list = this.state.productList;

        let index = _.findIndex(list, function (o) { return o.sku === data.sku });

        list[index] = data;

        this.setState({
            productList: list,
            editProduct: {},
            showAddProduct: false,
        })

    }

    addProduct(data) {
        let list = this.state.productList;

        let index = _.findIndex(list, function (o) { return o.sku === data.sku });

        list = list.slice(0, index).concat(list.slice(index + 1));

        this.setState({
            productList: list,
            editProduct: {},
            showAddProduct: false,
        })
    }

    dialogCloseHandler = (e) => {
        
        OrderDialog=null;
        this.setState({showDialog: false})
    };

    showEditProduct(data) {

        this.setState({
            editProduct: data,
            showAddProduct: true
        })
    }
    getBack() {
        if (this.props.location.state) {
            return (<Link to={{
                pathname: this.props.location.state.return.path,
                state: { props: this.props.location.state.return.props ? this.props.location.state.return.props : {} }
            }}>
                {this.props.location.state.return.text}
            </Link>)
        }

    }


    confirmOrder =(e)=>{
        e.preventDefault()
        console.log(this.state.cart);

        OrderDialog=(
        <OrderConfirmDialog close={this.dialogCloseHandler} display={true} cart={this.state.cart}>

        </OrderConfirmDialog>)

this.setState({showDialog: true})
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
                {OrderDialog}
                    <div class="row" style = {{ padding : "30px"}}>
                        {this.getBack()}
                    </div>
                    <div className="row" style={{ marginBottom: "15px", padding: "30px" }}>
                        <div className="col-md-4" style={{ padding: "0px" }}>
                            <p style={{ fontSize: "25px" }}>Products of {this.state.store.name}</p>
                        </div>
                        <div className="col-md-6" >
                        </div>
                        <div className="col-md-2" >
                           {/* { sessionStorage.getItem('store') != this.state.store.storeid ? <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" disabled={!this.state.cart.length} onClick={this.showAddProduct}>
                                <b style={{ fontSize: "14px", color: "white" }} onClick={this.confirmOrder}>Check Out</b>
                            </button>:""}  */}
                           {this.state.cart.length? <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" disabled={!this.state.cart.length} onClick={this.showAddProduct}>
                                <b style={{ fontSize: "14px", color: "white" }} onClick={this.confirmOrder}>Check Out</b>
                            </button>:""}
                        </div>
                    </div>
                    <Divider light style={{ margin: "2px 0px 15px" }} />
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label id="validationCustomUsername"> Search By Product Name</label>
                                <input type="text" class="form-control" id="validationCustomUsername" name="searchProductName" value={this.state.searchProductName} onChange={this.productSearchHandler} placeholder="Product Name" required />

                            </div>
                            {/* <div className="row" >
                                    <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.searchProducts}>
                                        <b style={{ fontSize: "14px", color: "white" }}>Search </b>
                                    </button>
                                </div> */}
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
            redirectVar: "",
            editQuantity: 0,
            selectedQuantity: 0,
        }
        this.handleMouseLEave = this.handleMouseLEave.bind(this);
        this.handlemouseEnter = this.handlemouseEnter.bind(this);
        this.showEditProduct = this.showEditProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openAdd = this.openAdd.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.subQunatity = this.subQunatity.bind(this);
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

    addProduct() {


    }
    handleClose() {
        this.setState({
            showAdd: false
        })
    }
    openAdd() {
        this.setState({
            showAdd: true
        })
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
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

    subQunatity() {
        if (this.state.selectedQuantity > 0) {
            this.props.removeQuantity(this.props.product);
            this.setState({ selectedQuantity: this.state.selectedQuantity - 1 })
        }
    }

    render() {
        return (
            <Card>

                <div class="row" style={{ padding: "10px" }} >
                    <div class="row">
                        {this.props.product.imageUrl ? <img src={this.props.product.imageUrl} alt="new" class="companyImage" style={{
                            "max-height": "250px",
                            "min-height": "250px"
                        }}></img> :  
                        <img src="https://sainfoinc.com/wp-content/uploads/2018/02/image-not-available.jpg" alt="new" class="companyImage" style={{
                            "max-height": "250px",
                            "min-height": "250px"
                        }}/> 
                        // <div style={{
                        //     "max-height": "250px",
                        //     "min-height": "250px"
                        // }}></div>
                        }
                    </div>
                    <div class="row">
                        <div class="col-md-10" style={{ fontSize: "20px", cursor: "pointer" }}>
                            <Link >  {this.props.product.name}</Link>

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


                    </div>
                    {sessionStorage.getItem('store') == this.props.storeid ?
                        <div class="row" style={{ minHeight: "30px" }}>

                            <center>
                                <div class="col-md-4 minus">
                                    <RemoveCircleIcon color="primary" disabled={true} fontSize="large" onClick={this.subQunatity} style={{ cursor: "pointer" }}></RemoveCircleIcon>

                                </div>
                                <div class="col-md-2">
                                    {this.state.selectedQuantity}
                                </div>
                                <div class="col-md-4" >

                                    <AddCircleIcon role="button" color="primary" fontSize="large" onClick={() => { this.props.addQuantity(this.props.product); this.setState({ selectedQuantity: this.state.selectedQuantity + 1 }) }} style={{ cursor: "pointer" }}></AddCircleIcon>

                                </div>
                            </center>
                        </div> : ""}
                </div>
            </Card>
        )
    }

}

// export default StoreProducts;