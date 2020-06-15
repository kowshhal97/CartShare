import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import S3FileUpload from 'react-s3';
import { Redirect } from 'react-router';
//Optional Import
import { uploadFile } from 'react-s3';
import { Avatar } from '@material-ui/core';
import Loading from '../Loading';
const config = {
    bucketName: process.env.bucketName,
    region: 'us-west-1',
    accessKeyId: process.env.accessKey,
    secretAccessKey: process.env.secretAccessKey
}
const shortid = require('shortid');
class ProductModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: "",
            brand: "",
            loader : false ,
            unitType: "",
            sku: "",
            quantity: "",
            image: "",
            open: props.open,
            "createdBy": "",
            "price": "",
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.descriptionHandler = this.descriptionHandler.bind(this);
        this.skuHandler = this.skuHandler.bind(this);
        this.unitTypeChangeHandler = this.unitTypeChangeHandler.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.addNewProductHtml = this.addNewProductHtml.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            id: "",
            name: "",
            description: "",
            brand: "",
            unitType: "",
            sku : "",
            loader : false ,
            imageUrl : "",
            image : "",
            "createdBy": "",
            "price": "",
            "quantity": ""
        })
        if (nextProps.edit) {
            let product = nextProps.editProduct;
            this.setState({
                id: product.id,
                sku: product.sku,
                name: product.name,
                imageUrl : product.imageUrl,
                description: product.description,
                brand: product.brand,
                unitType: product.unitType,
                "price": product.price,
                quantity: product.quantity
            })
        }
    }

    validateProduct = ()=>
    {
        console.log(this.state);
        return !(this.state.name && (this.state.imageUrl || this.state.image) && this.state.description &&
         this.state.unitType && this.state.price && this.state.quantity  )
    }
    nameChangeHandler(e) {
        this.setState({
            name: e.target.value,
        })
    }
    descriptionHandler(e) {
        this.setState({
            description: e.target.value,
        })
    }
    skuHandler(e) {
        this.setState({
            sku: e.target.value,
        })
    }
    unitTypeChangeHandler(e) {
        this.setState({
            unitType: e.target.value,
        })
    }
    priceChange = (e) => {
        // console.log(e.target.files[0]);
        this.setState({
            price: e.target.value
        })
    }
    handleFileChange = (e) => {
        // console.log(e.target.files[0]);
        this.setState({
            image: e.target.files[0]
        })
    }
    quantityChange = (e) => {
        // console.log(e.target.files[0]);
        this.setState({
            quantity: e.target.value
        })
    }
    handleClose() {
        this.setState({
            id: "",
            name: "",
            description: "",
            brand: "",
            unitType: "",
            open: false,
            "createdBy": "",
            "price": "",
            "quantity": ""
        });
        this.props.handleAddClose();
    }

    async addProduct() {

        console.log(config);
        this.setState({
            loader : true,
        })
        let result = this.state.imageUrl
        if(this.state.image)
        { result = await S3FileUpload
            .uploadFile(this.state.image, config);
            result = result.location;}
        
        let data = {
            "storeid": this.props.editProduct.storeid,
            "sku": this.state.sku,
            name: this.state.name,
            description: this.state.description,
            "imageUrl": result,
            unitType: this.state.unitType,
            "price": this.state.price,
            "quantity": this.state.quantity

        }

        if (!this.props.edit) {
            axios.post(`http://35.155.66.64:8080/admin/product/add`, data)
                .then(response => {
                    // console.log("Status Code : ",response.status);
                    if (response.status === 200) {
                        // console.log("Job dded")

                        this.setState({
                            open: false,
                            showDialog: false,
                            loader : false ,
                        });
                        this.props.addProduct(response.data);

                    } else {
                        // console.log("Job Failure");
                        // console.log(response);
                        this.setState({
                            open: false,
                            loader : false ,
                        })
                    }
                })
                .catch(err =>{
                    this.setState({
                        loader : false ,
                    })
                   
                })
                ;
        }
        else {

            axios.put(`http://35.155.66.64:8080/admin/product/${this.props.editProduct.storeid}/${this.state.sku}`, data)
                .then(response => {
                    // console.log("Status Code : ",response.status);
                    if (response.status === 200) {
                        // console.log("Job dded")

                        this.setState({
                            loader : false ,
                            open: false,
                            showDialog: false
                        });
                        this.props.editProductFunc(response.data);

                    } else {
                        // console.log("Job Failure");
                        // console.log(response);
                        this.setState({
                            loader : false ,
                            open: false,
                        })
                    }
                })
                .catch(err =>{
                    this.setState({
                        loader : false ,
                    })
                   
                })
        }

    }

    removeImage()
    {
        this.setState({
            imageUrl : ""
        })
    }



    addNewProductHtml() {
        return (
            <div>
                  <Loading loading={this.state.loader}></Loading>
                <Dialog class="addProductDialog" open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ "min-width": "700px", }}>

                    <div class="modal-content" style={{ padding: "20px" }}>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Provide New Product Details</h5>
                            <button type="button" class="close" onClick={this.handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label id="validationCustomUsername">Product Name</label>
                                    <input type="text" class="form-control" id="validationCustomUsername" value={this.state.name} onChange={this.nameChangeHandler} placeholder="Name" required />

                                </div>
                                {/* <div class="form-group">
                                    <label for="inputAddress">SKU</label>
                                 {this.props.edit ?<div class ="row">  {this.state.sku} </div>:   <input type="number" class="form-control" id="inputAddress" placeholder="SKU" value={this.state.sku} onChange={this.skuHandler} />}
                                </div> */}
                                <div class="form-group">
                                    <label for="inputAddress2">Description</label>
                                    <input type="text" class="form-control" id="inputAddress2" placeholder="Description" value={this.state.description} onChange={this.descriptionHandler} />
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-6" style={{ paddingLeft: "0px" }}>
                                        <label for="inputunitType">Unit Type</label>
                                        <input type="string" class="form-control" id="inputunitType" placeholder="unitType" value={this.state.unitType} onChange={this.unitTypeChangeHandler} />

                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputState">Quantity</label>
                                        <input type="number" class="form-control" id="inputState" placeholder="Quantity" value={this.state.quantity} onChange={this.quantityChange} />
                                    </div>
                                    <div class="form-group col-md-2" style={{ paddingRight: "0px" }}>
                                        <label for="inputprice">Price in $</label>
                                        <input type="number" class="form-control" id="inputprice" placeholder="price" value={this.state.price} onChange={this.priceChange} />
                                    </div>
                                </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlFile1">Product Image</label>
                                        { this.state.imageUrl ? <div class="row">
                                            <div class="col-md-10">
                                                <Avatar variant="square" src={this.state.imageUrl} />
                                            </div>
                                            <div class="col-md-2" style={{ cursor: "pointer" }} onClick={this.removeImage}>
                                             X
                                           </div>
                                        </div> :
                                            <div>
                                                <input type="file" class="form-control-file" id="exampleFormControlFile1" data-show-upload="true" onChange={this.handleFileChange} data-show-caption="true" />
                                                </div>}
                                        </div>

                            </form>
                                </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Close</button>
                                <button type="button" class="btn btn-primary" disabled = {this.validateProduct()} onClick={this.addProduct} >Save changes</button>
                            </div>
                        </div>

                </Dialog>
                    </div>

                )
            }
    render() {

        let redirectVar = null;
        if (!sessionStorage.getItem("persona")) 
            redirectVar = <Redirect to = "/admin/signin" />
        return (
            <div>
                {redirectVar}
                    {this.state.open ? <div>{this.addNewProductHtml()}</div> : null}
                </div>

                )
            }
        }
        
        
        export default ProductModification;
