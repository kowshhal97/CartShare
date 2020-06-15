
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class StoreModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            streetName: "",
            streetNumber: "",
            city: "",
            open: props.open,
            "createdBy": "",
            "zip": "",
            "state": ""
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.stateChange = this.stateChange.bind(this);
        this.streetNameHandler = this.streetNameHandler.bind(this);
        this.streetNumberHandler = this.streetNumberHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.zipChange = this.zipChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addNewStoreHtml = this.addNewStoreHtml.bind(this);
        this.addStore = this.addStore.bind(this);
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            id: "",
            name: "",
            streetName: "",
            streetNumber: "",
            city: "",
            "createdBy": "",
            "zip": "",
            "state": ""
        })
        if (nextProps.edit) {
            let store = nextProps.store;
            this.setState({
                id: store.id,
                name: store.name,
                streetName: store.address.streetName,
                streetNumber: store.address.streetNumber,
                city: store.address.city,
                "zip": store.address.zip,
                "state": store.address.state
            })
        }
    }

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value,
        })
    }
    streetNameHandler(e) {
        this.setState({
            streetName: e.target.value,
        })
    }
    streetNumberHandler(e) {
        this.setState({
            streetNumber: e.target.value,
        })
    }
    cityChangeHandler(e) {
        this.setState({
            city: e.target.value,
        })
    }
    zipChange = (e) => {
        // console.log(e.target.files[0]);
        this.setState({
            zip: e.target.value
        })
    }
    stateChange = (e) => {
        // console.log(e.target.files[0]);
        this.setState({
            state: e.target.value
        })
    }
    handleClose() {
        this.setState({
            id: "",
            name: "",
            streetName: "",
            streetNumber: "",
            city: "",
            open: false,
            "createdBy": "",
            "zip": "",
            "state": ""
        });
        this.props.handleAddClose();
    }

    addStore() {
        let data = {

            name: this.state.name,
            createdBy: sessionStorage.getItem('email'),
            streetName: this.state.streetName,
            streetNumber: this.state.streetNumber,
            city: this.state.city,
            "zip": this.state.zip,
            "state": this.state.state
        }
        if (!this.props.edit) {
            axios.post(`http://35.155.66.64:8080/admin/store/add/`, data)
                .then(response => {
                    // console.log("Status Code : ",response.status);
                    if (response.status === 200) {
                        // console.log("Job dded")

                        this.setState({
                            open: false,
                            showDialog: false
                        });
                        this.props.addStore(response.data);

                    } else {
                        // console.log("Job Failure");
                        // console.log(response);
                        this.setState({
                            open: false,
                        })
                    }
                });
        }
        else {

            axios.put(`http://35.155.66.64:8080/admin/store/update/${this.props.store.id}`, data)
                .then(response => {
                    // console.log("Status Code : ",response.status);
                    if (response.status === 200) {
                        // console.log("Job dded")

                        this.setState({
                            open: false,
                            showDialog: false
                        });
                        this.props.editStore(response.data);

                    } else {
                        // console.log("Job Failure");
                        // console.log(response);
                        this.setState({
                            open: false,
                        })
                    }
                });
        }

    }

    validateAddStore = () => {
        return !(this.state.name && this.state.streetName && this.state.streetNumber && this.state.zip && this.state.zip >= 10000)
    }



    addNewStoreHtml() {
        return (
            <div>
                <Dialog class="addStoreDialog" open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ "min-width": "700px", }}>

                    <div class="modal-content" style={{ padding: "20px" }}>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Provide New Store Details</h5>
                            <button type="button" class="close" onClick={this.handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label id="validationCustomUsername">Store Name</label>
                                    <input type="text" class="form-control" id="validationCustomUsername" value={this.state.name} onChange={this.nameChangeHandler} placeholder="Name" required />

                                </div>
                                <div class="form-group">
                                    <label for="inputAddress">Stree Number</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="Street Number" value={this.state.streetNumber} onChange={this.streetNumberHandler} />
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress2">Stree Name</label>
                                    <input type="text" class="form-control" id="inputAddress2" placeholder="Street Name" value={this.state.streetName} onChange={this.streetNameHandler} />
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-6" style={{ paddingLeft: "0px" }}>
                                        <label for="inputCity">City</label>
                                        <input type="text" class="form-control" id="inputCity" placeholder="City" value={this.state.city} onChange={this.cityChangeHandler} />

                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputState">State</label>
                                        <input type="text" class="form-control" id="inputState" placeholder="State" value={this.state.state} onChange={this.stateChange} />
                                    </div>
                                    <div class="form-group col-md-2" style={{ paddingRight: "0px" }}>
                                        <label for="inputZip">Zip</label>
                                        <input type="text" class="form-control" id="inputZip" placeholder="Zip" value={this.state.zip} onChange={this.zipChange} />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Close</button>
                            <button type="button" class="btn btn-primary" disabled={this.validateAddStore()} onClick={this.addStore} >Save changes</button>
                        </div>
                    </div>

                </Dialog>
            </div>

        )
    }
    render() {
        let redirectVar = null;
        if (!sessionStorage.getItem("persona"))
            redirectVar = <Redirect to="/admin/signin" />
        return (
            <div>
                {redirectVar}
                {this.state.open ? <div>{this.addNewStoreHtml()}</div> : null}
            </div>

        )
    }
}


export default StoreModification;
