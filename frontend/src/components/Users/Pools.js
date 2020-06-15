import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import CreatePool from './CreatePool';
import axios from 'axios';
import { Card, Dialog, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import Loading from '../Loading';
const _ = require('lodash');
class Pools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddPool: false,
            poolName: "",

            loader: false,
            neighbourhoodName: "",
            zipCode: "",
            poolsList: props.poolList,
            editPool: {}

        };
        // this.showAllPools = this.showAllPools.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.showAddPool = this.showAddPool.bind(this);
        this.showEditProduct = this.showEditProduct.bind(this);
        this.addPool = this.addPool.bind(this);
        this.deletePool = this.deletePool.bind(this);
        this.showAllPools = this.showAllPools.bind(this);
        this.searchPools = this.searchPools.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.applyPool = this.applyPool.bind(this);

    }

    componentDidMount() {
        // this.getAllPools()
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            poolsList: nextProps.poolList
        })
    }
    getAllPools() {
        this.setState({
            loader: true
        })
        axios.get(`http://35.155.66.64:8080/allPoolDetails?poolName=${this.state.poolName}&neighbourhoodName=${this.state.neighbourhoodName}&zipCode=${this.state.zipCode}`)
            .then(response => {
                this.setState({
                    loader: false
                })
                if (response.status === 200) {
                    this.setState({
                        poolsList: response.data
                    })
                } else {
                    this.setState({
                        open: false,
                    })
                }
            })
            .catch(err => {
                this.setState({
                    loader: false
                })
            })
    }
    deletePool(data) {
        let list = this.state.poolsList;

        let index = _.findIndex(list, function (o) { return o.id === data.id });

        list = list.slice(0, index).concat(list.slice(index + 1));

        this.setState({
            poolsList: list,
            editPool: {},
            showAddPool: false,
        })
    }
    showAddPool() {
        this.setState({
            showAddPool: true,
        })
    }
    handleAddClose() {
        this.setState({
            editPool: {},
            showAddPool: false,
        })

    }
    applyPool(pool, reference) {
        let list = this.state.poolsList;
        console.log(list);
        console.log(pool);
        let index = _.findIndex(list, o => { return o.id == pool.id });
        console.log(index);
        let dat = {
            id: sessionStorage.getItem('id'),
            status: "In Progress"
        }
        list[index].appliedMembers.push(dat);
        console.log(list);
        this.setState({
            poolsList: list
        })
        // this.setState({
        //     loader: true
        // })
        // let data =
        // {
        //     "appliedPoolId": "",
        //     "userId": sessionStorage.getItem('id'),
        //     "poolId": pool.id,
        //     "referenceUserId": reference.id,
        //     "status": "In Progress"
        // }
        // axios.post('http://35.155.66.64:8080/applyPool', data).then(response => {
        //     this.setState({
        //         loader: false
        //     })
        //     let list = this.state.poolsList;
        //     let index = _.findIndex(list, o => { return o.id = pool.id });
        //     let dat = {
        //         user : {
        //             id: sessionStorage.getItem('id'),
        //         },

        //         status: "In Progress"
        //     }
        //     list[index].appliedMembers.push(dat);
        //     this.setState({
        //         poolsList: list
        //     })

        // })
        //     .catch(err => {
        //         this.setState({
        //             loader: false
        //         })
        //     })

    }
    addPool(data) {
        
        this.props.poolCreated(data);
    }
    showEditProduct(data) {

        this.setState({
            editPool: data,
            showAddPool: true
        })
    }
    searchPools() {
        this.getAllPools();
    }



    showAllPools() {
        if (this.state.poolsList && this.state.poolsList.length) {
            let listItems = [];
            this.state.poolsList.map((pool) => {

                listItems.push(
                    <div class="col-md-4" style={{ "max-width": "400px" }}>
                        <PoolDetail pool={pool} applySelectedPool={this.applyPool}> </PoolDetail>
                    </div>);
            }


            );
            return listItems;
        }
        else {
            return (
                <div class="row" style={{ "padding": "20px" }}>


                    <Card>
                        <div class="row" style={{
                            "font-size": "25px",
                            "padding": "10px"
                        }}>
                            No Pools created by any user!
                    </div>
                    </Card>
                </div>
            )
        }
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        return (
            <div>
                <Loading loading={this.state.loader}></Loading>
                <div>
                    <div>
                        <div className="row" style={{ marginBottom: "15px", padding: "30px" }}>
                            <div className="col-md-2" style={{ padding: "0px" }}>
                                <p style={{ fontSize: "25px" }}>Pools</p>
                            </div>
                            <div class="col-md-8">

                            </div>
                            <div className="col-md-2" >
                                <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.showAddPool}>
                                    <b style={{ fontSize: "14px", color: "white" }}>Create Pool</b>
                                </button>
                            </div>

                        </div>
                        <Divider light style={{ margin: "2px 0px 15px" }} />

                        <CreatePool open={this.state.showAddPool} handleAddClose={this.handleAddClose} addPool={this.addPool} edit={this.state.editPool.name ? true : false} editPool={this.state.editPool} ></CreatePool>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label id="validationCustomUsername">Pool Name</label>
                                    <input type="text" class="form-control" id="validationCustomUsername" name="poolName" value={this.state.poolName} onChange={this.inputHandler} placeholder="Pool Name" required />

                                </div>
                                <div class="form-group">
                                    <label id="validationCustomUsername">Neighbourhood Name</label>
                                    <input type="text" class="form-control" id="validationCustomUsername" name="neighbourhoodName" value={this.state.neighbourhoodName} onChange={this.inputHandler} placeholder="Neighbourhood Name" required />

                                </div>
                                <div class="form-group">
                                    <label id="validationCustomUsername">Zip Code</label>
                                    <input type="text" class="form-control" id="validationCustomUsername" name="zipCode" value={this.state.zipCode} onChange={this.inputHandler} placeholder="Zip Code" required />

                                </div>
                                <div className="row" >
                                    <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" onClick={this.searchPools}>
                                        <b style={{ fontSize: "14px", color: "white" }}>Search </b>
                                    </button>
                                </div>
                                {/* <div className="row" style={{ marginTop: "5px" }} >
                                    <div className="row" >
                                        <input className="searchBar form-control" type="text" onChange={this.searchData} placeholder="Search all Pools" />
                                    </div>
                                    <div className="row" >
                                        <button style={{ height: "33px", backgroundColor: "#5e5e5e" }} type="button" class="btn btn-" >
                                            <b style={{ fontSize: "14px", color: "white" }}>Search Pools</b>
                                        </button>
                                    </div>

                                </div> */}
                            </div>
                            <div class="col-md-9">
                                {this.showAllPools()}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}



class PoolDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showApplyPool: false,
            referenceName: "",
            errMsg: "",
            loader: false,
            referenceLeader: {},
            selectedReference: {},
        }
        this.showPoolStatus = this.showPoolStatus.bind(this);
        this.handleCloseApplyPool = this.handleCloseApplyPool.bind(this);
        this.openApplyPool = this.openApplyPool.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.refeHandler = this.refeHandler.bind(this);
        this.referenceNameHandler = this.referenceNameHandler.bind(this);
        this.applySelectPool = this.applySelectPool.bind(this);
    }
    handleCloseApplyPool() {
        this.setState({
            showApplyPool: false,
        })
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    refeHandler(e) {
        this.setState({
            [e.target.name]: JSON.parse(e.target.value),
            referenceName: "",
        })
    }
    referenceNameHandler(e) {
        this.setState({
            referenceName: e.target.value,
            selectedReference: {}
        })
    }
    openApplyPool() {
        this.setState({
            showApplyPool: true,
            selectedReference: {},
            referenceName: "",

        })
    }

    applyPool(pool, reference) {


        let data =
        {
            "appliedPoolId": "",
            "userId": sessionStorage.getItem('id'),
            "poolId": pool.id,
            "referenceUserId": reference.id,
            "status": "In Progress"
        }
        axios.post('http://35.155.66.64:8080/applyPool', data).then(response => {
            this.props.applySelectedPool(this.props.pool, true);
            this.setState({
                loader: false,
                showApplyPool: false,
            })



        })
            .catch(err => {
                this.setState({
                    loader: false
                })
            })
    }
    applySelectPool() {
        this.setState({
            loader: true
        })
        if (this.state.referenceName) {
            let index = _.findIndex(this.props.pool.members, (o) => {
                return o.screenName == this.state.referenceName
            })
            if (index != -1) {
                this.applyPool(this.props.pool, this.props.pool.members[index])
                // this.props.applySelectedPool(this.props.pool, this.props.pool.members[index]);
            }
            else {
                this.setState({
                    loader: false
                })
                this.setState({
                    errMsg: "Member doesn't exist"
                })
            }
        }
        else {
            let index = _.findIndex(this.props.pool.members, (o) => {
                return o.screenName == this.state.selectedReference.screenName
            })
            this.applyPool(this.props.pool, this.props.pool.members[index])

            // this.props.applySelectedPool(this.props.pool, this.props.pool.members[index])
        }

    }

    applyPoolHtml() {

        let refList = [];
        this.props.pool.members.map(member => {
            refList.push(<FormControlLabel value={JSON.stringify(member)} control={<Radio />} label={member.screenName} />)
        })

        return (
            <div>
                <Loading loading={this.state.loader} ></Loading>
                <Dialog open={this.state.showApplyPool} onClose={this.handleCloseApplyPool} aria-labelledby="form-dialog-title" style={{ "min-width": "700px" }}>
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Apply to  {this.props.pool.name}</h5>
                        <button type="button" class="close" onClick={this.handleCloseApplyPool} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                Please Selecte One reference person ?

                                </div>


                        </form>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="selectedReference" value={JSON.stringify(this.state.selectedReference)} onChange={this.refeHandler}>
                                {/* {refList} */}
                                <FormControlLabel value={JSON.stringify(this.props.pool.poolLeader)} control={<Radio />} label="Pool Leader" />
                            </RadioGroup>
                        </FormControl>
                        <div class="form-group">
                            <label id="validationCustomUsername">Pool Member Name</label>
                            <input type="text" class="form-control" id="validationCustomUsername" value={this.state.referenceName} onChange={this.referenceNameHandler} placeholder="Name" required />

                        </div>
                        <div class="form-group" style={{ color: "red" }}>
                            <label id="validationCustomUsername">{this.state.errMsg}</label>

                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={this.handleCloseApplyPool}>No</button>
                        <button type="button" class="btn btn-primary" onClick={this.applySelectPool} >Yes</button>
                    </div>
                </Dialog>
            </div>
        )
    }
    showPoolStatus() {
        if (this.props.pool.members.length == -1) {
            return (<div className="col-md-2" >
                <button style={{ height: "33px", backgroundColor: "#c14545" }} type="button" class="btn btn-" >
                    <b style={{ fontSize: "14px", color: "white" }}>   Full </b>
                </button>
            </div>)

        }
        else {
            let list = this.props.pool.appliedMembers;
            let index = _.findIndex(list, (p) => { return p.id == sessionStorage.getItem("id") })
            if (index == -1) {
                return (<div className="col-md-2" >
                    <button style={{ height: "33px", backgroundColor: "green" }} type="button" class="btn btn-" onClick={this.openApplyPool}>
                        <b style={{ fontSize: "14px", color: "white" }}>Apply</b>
                    </button>
                </div>)
            }
            else {
                return (
                    <div className="col-md-2" >
                        <button style={{ height: "33px", backgroundColor: "#c14545" }} type="button" class="btn btn-" disabled={true}>
                            <b style={{ fontSize: "14px", color: "white" }}>   {this.props.pool.appliedMembers[index].status}</b>
                        </button>
                    </div>)
            }

        }
    }

    render() {
        return (
            <Card>
                {this.applyPoolHtml()}
                <div class="row" style={{ padding: "10px", paddingLeft: "20px" }} onMouseEnter={this.handlemouseEnter} onMouseLeave={this.handleMouseLEave}>
                    <div class="row">
                        <div class="col-md-6" style={{ fontSize: "20px", padding: "10px", paddingLeft: "0px" }}>
                            {this.props.pool.name}
                        </div>
                        <div class="col-md-6" style={{ fontSize: "20px", padding: "10px" }}>
                            {this.showPoolStatus()}
                        </div>
                    </div>

                    <div class="row" >
                        {this.props.pool.description}
                    </div>
                    <div class="row" >
                        Neighbourhood Name : {this.props.pool.neighbourhoodName}
                    </div>
                    <div class="row" >
                        Zip Code : {this.props.pool.zipCode}
                    </div>
                </div>

            </Card>
        )
    }
}



export default Pools;