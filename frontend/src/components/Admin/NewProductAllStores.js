import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import S3FileUpload from 'react-s3';
import { Redirect } from 'react-router';
import Loading from '../Loading';
import { uploadFile } from 'react-s3';
import { Avatar, FormControl, InputLabel, Input, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
const _ = require('lodash');
const config = {
    bucketName: process.env.bucketName,
    region: 'us-west-1',
    accessKeyId: process.env.accessKey,
    secretAccessKey: process.env.secretAccessKey
}
const shortid = require('shortid');
class NewProductAllStores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: "",
            brand: "",
            unitType: "",
            loader : false ,
            sku: "",
            quantity: "",
            stores: [],
            selecteStores: [],
            storeList: props.storeList,
            // storeList:  [
            //     'Oliver Hansen',
            //     'Van Henry',
            //     'April Tucker',
            //     'Ralph Hubbard',
            //     'Omar Alexander',
            //     'Carlos Abbott',
            //     'Miriam Wagner',
            //     'Bradley Wilkerson',
            //     'Virginia Andrews',
            //     'Kelly Snyder',
            //   ],
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
        this.onStoreChnage = this.onStoreChnage.bind(this);
        this.checkBoxmultiple = this.checkBoxmultiple.bind(this);
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
            stores: [],
            storeList: nextProps.storeList,
            selecteStores : [],
            unitType: "",
            sku: "",
            loader : false ,
            imageUrl: "",
            image: "",
            "createdBy": "",
            "price": "",
            "quantity": ""
        })

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
        if(e.target.value >= 0)
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
        if(e.target.value >= 0)
        this.setState({
            quantity: e.target.value
        })
    }
    handleClose() {
        this.setState({
            id: "",
            name: "",
            description: "",
            loader : false ,
            brand: "",
            unitType: "",
            open: false,
            "createdBy": "",
            "price": "",
            "quantity": ""
        });
        this.props.handleAddClose();
    }
    validateProduct = ()=>
    {
        return !(this.state.name && this.state.selecteStores && this.state.image && this.state.description &&
        this.state.unitType && this.state.price && this.state.quantity  )
    }
    async addProduct() {

        this.setState({
            loader : true 
        })
        console.log(config);
        let result = this.state.imageUrl
        if (this.state.image) {
            result = await S3FileUpload
                .uploadFile(this.state.image, config);
            result = result.location;
        }

        let selectedStores = [];
        for(let store of this.state.selecteStores)
        {
            selectedStores.push(JSON.parse(store).id);
        }

        let data = {
            stores : selectedStores ,
            "sku": this.state.sku,
            name: this.state.name,
            description: this.state.description,
            "imageUrl": result,
            unitType: this.state.unitType,
            "price": this.state.price,
            "quantity": this.state.quantity

        }

        if (!this.props.edit) {
            axios.post(`http://35.155.66.64:8080/admin/product/allstores`, data)
                .then(response => {
                    // console.log("Status Code : ",response.status);
                    if (response.status === 200) {
                        // console.log("Job dded")

                        this.setState({
                            open: false,
                            loader : false ,
                            showDialog: false
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
                });
        }
        else {

            axios.put(`http://35.155.66.64:8080/admin/product/${this.props.curr_store.id}/${this.state.sku}`, data)
                .then(response => {
                    // console.log("Status Code : ",response.status);
                    if (response.status === 200) {
                        // console.log("Job dded")

                        this.setState({
                            open: false,
                            loader : false ,
                            showDialog: false
                        });
                        this.props.editProductFunc(response.data);

                    } else {
                        // console.log("Job Failure");
                        // console.log(response);
                        this.setState({
                            open: false,
                            loader : false ,
                        })
                    }
                });
        }

    }

    removeImage() {
        this.setState({
            imageUrl: ""
        })
    }

    onStoreChnage(event) {
        this.setState({
            selecteStores: event.target.value
        });
    };

    // onStoreChnage(event) {
    //     this.setState({
    //         selecteStores: event.target.value
    //     });
    // };

    checkBoxmultiple(name) {
        let index = _.findIndex(this.state.selecteStores, (s) => {

            return JSON.parse(s).name == name.name
        })
        if (index >= 0)
            return true;
        return false;
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
                                <div class="form-group storesInput">
                                    <FormControl >
                                        <InputLabel id="demo-mutiple-checkbox-label">Stores</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-checkbox-label"
                                            id="demo-mutiple-checkbox"
                                            multiple
                                            value={this.state.selecteStores}
                                            onChange={this.onStoreChnage}
                                            input={<Input />}
                                            renderValue={(selected) => {
                                                let re = "";
                                                for (let s of selected) {
                                                        re = re + JSON.parse(s).name + ","
                                                }
                                                
                                                return re;
                                            }}

                                        >
                                            {this.state.storeList.map((name) => (
                                                <MenuItem key={JSON.stringify(name)} value={JSON.stringify(name)}>
                                                    <Checkbox checked={this.checkBoxmultiple(name)} />
                                                    <ListItemText primary={name.name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                {/* <div class="form-group">
                                    <label for="inputAddress">SKU</label>
                                    {this.props.edit ? <div class="row">  {this.state.sku} </div> : <input type="number" class="form-control" id="inputAddress" placeholder="SKU" value={this.state.sku} onChange={this.skuHandler} min="0" />}
                                </div> */}
                                <div class="form-group">
                                    <label for="inputAddress2">Description</label>
                                    <input type="text" class="form-control" id="inputAddress2" placeholder="Description" value={this.state.description} onChange={this.descriptionHandler} />
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-6" style={{ paddingLeft: "0px" }}>
                                        <label for="inputunitType">Unit Type</label>
                                        <input type="string" class="form-control" id="inputunitType" placeholder="Unit Type" value={this.state.unitType} onChange={this.unitTypeChangeHandler} />

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
                                    {this.state.imageUrl ? <div class="row">
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
                            <button type="button" class="btn btn-primary" disabled= {this.validateProduct()} onClick={this.addProduct}  >Save changes</button>
                        </div>
                    </div>

                </Dialog>
            </div>

        )
    }
    render() {
        console.log(this.state)
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


export default NewProductAllStores;
