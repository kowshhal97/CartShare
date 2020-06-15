import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router';

class CreatePool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectVar : "",
            id: "",
            name: "",
            description: "",
            erroMsg : "",
            poolId: "",
            neighbourhoodName: "",
            open: props.open,
            "zipCode": "",
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.neighbourhoodNameChange = this.neighbourhoodNameChange.bind(this);
        this.descriptionHandler = this.descriptionHandler.bind(this);
        this.poolIdHandler = this.poolIdHandler.bind(this);
        this.unitTypeChangeHandler = this.unitTypeChangeHandler.bind(this);
        this.zipCodeChange = this.zipCodeChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addNewpoolHtml = this.addNewpoolHtml.bind(this);
        this.addpool = this.addpool.bind(this);
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
            poolId: "",
            unitType: "",
            "createdBy": "",
            "zipCode": "",
            "neighbourhoodName": ""
        })
        if (nextProps.edit) {
            let pool = nextProps.editpool;
            this.setState({
                id: pool.id,
                poolId: pool.poolId,
                name: pool.name,
                description: pool.description,
                "zipCode": pool.zipCode,
                neighbourhoodName: pool.neighbourhoodName
            })
        }
    }

    disableAddPool = ()=>
    {
        return !(this.state.poolId && this.state.name && this.state.description && this.state.zipCode &&  this.state.zipCode>=10000 && this.state.neighbourhoodName)
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
    poolIdHandler(e) {
        this.setState({
            poolId: e.target.value,
        })
    }
    unitTypeChangeHandler(e) {
        this.setState({
            unitType: e.target.value,
        })
    }
    zipCodeChange = (e) => {
        // console.log(e.target.files[0]);
        if(e.target.value<=99999 && e.target.value>=0)
        this.setState({
            zipCode: e.target.value
        })
    }
    neighbourhoodNameChange = (e) => {
        // console.log(e.target.files[0]);
        this.setState({
            neighbourhoodName: e.target.value
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
            "zipCode": "",
            "neighbourhoodName": ""
        });
        this.props.handleAddClose();
    }

    addpool() {
        let data =
        {
            
            "userId": sessionStorage.getItem('id'),
            "poolId": this.state.poolId,
            "name": this.state.name,
            "neighbourhoodName": this.state.neighbourhoodName,
            "description": this.state.description,
            "zipCode": this.state.zipCode
        }


        if (!this.props.edit) {

            axios.post(`http://35.155.66.64:8080/pool`, data)
                .then(response => {
                    // console.log("Status Code : ",response.status);
                    if (response.status === 200) {
                        // console.log("Job dded")
                        sessionStorage.setItem('poolId', response.data.id)
                        sessionStorage.setItem('poolUserId', response.data.members[0].id);
                        sessionStorage.setItem('contributionStatus', response.data.members[0].constributionStatus)
                        sessionStorage.setItem('credits', response.data.members[0].credits)
                        this.setState({
                            open: false,
                            showDialog: false
                        });
                        this.props.addPool(response.data);

                    } else {
                        // console.log("Job Failure");
                        // console.log(response);
                        this.setState({
                            open: false,
                        })
                    }
                }).catch(err=>{
                    console.log(JSON.stringify(err));
                    // console.log(err.request.response.data.message)
                    toast.warn("Pool Id / Pool Name allready presnt", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // this.setState({
                    //     erroMsg : "",
                    //     open: false,
                    // })

                });
        }
        else {

            data.id = this.state.id ;
            axios.put(`http://35.155.66.64:8080/pool`, data)
                .then(response => {
                    // console.log("Status Code : ",response.status);
                    if (response.status === 200) {
                        // console.log("Job dded")

                        this.setState({
                            open: false,
                            showDialog: false
                        });
                        this.props.editpoolFunc(response.data);

                    } else {
                        // console.log("Job Failure");
                        // console.log(response);
                        toast.warn("Pool Id / Pool Name allready presnt", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        this.setState({
                            erroMsg : "",
                            open: false,
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                    toast.warn("Pool Id / Pool Name allready presnt", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // this.setState({
                    //     erroMsg : "",
                    //     open: false,
                    // })

                })
        }

    }





    addNewpoolHtml() {
        return (
            <div>
                <Dialog class="addpoolDialog" open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" style={{ "min-width": "700px", }}>
              
                    <div class="modal-content" style={{ padding: "20px" }}>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Provide Pool Details</h5>
                            <button type="button" class="close" onClick={this.handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label id="validationCustomUsername">Pool Name</label>
                                    <input type="text" class="form-control" id="validationCustomUsername" value={this.state.name} onChange={this.nameChangeHandler} placeholder="Name" required />

                                </div>
                                <div class="form-group">
                                <label for="inputAddress">Pool Id</label>
                                    {this.props.edit?
                                    <div class = "row">
                                    {this.state.poolId}
                                    </div>
                                    :<div>
                                    
                                    <input type="text" class="form-control" id="inputAddress" placeholder="Pool Id" value={this.state.poolId} onChange={this.poolIdHandler} /> </div>}
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress2">Description</label>
                                    <input type="text" class="form-control" id="inputAddress2" placeholder="Description" value={this.state.description} onChange={this.descriptionHandler} />
                                </div>
                                <div class="row">

                                    <div class="form-group col-md-6" style={{ paddingLeft: "0px" }}>
                                        <label for="inputState">Neighbourhood Name</label>
                                        <input type="text" class="form-control" id="inputState" placeholder="Neighbourhood Name" value={this.state.neighbourhoodName} onChange={this.neighbourhoodNameChange} />
                                    </div>
                                 
                                    <div class="form-group col-md-6" style={{ paddingRight: "0px" }}>
                                    <label for="inputzipCode">Zip Code</label>
                                    {this.props.edit?
                                    <div class = "row">

                                    {this.state.zipCode}
                                    </div>
                                    :<div>
                                      
                                        <input type="number" class="form-control" id="inputzipCode" placeholder="Zip Code" value={this.state.zipCode} onChange={this.zipCodeChange} min="0" /></div>}
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Close</button>
                            <button type="button" class="btn btn-primary" disabled={this.disableAddPool()} onClick={this.addpool} >Save changes</button>
                        </div>
                    </div>

                </Dialog>
            </div>

        )
    }

    render() {
        let redirectVar = null ;
      

        return (
            <div>
                {redirectVar}
                <ToastContainer />
                {this.state.open ? <div>{this.addNewpoolHtml()}</div> : null}
            </div>

        )
    }
}


export default CreatePool;
