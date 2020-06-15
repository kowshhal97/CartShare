import React, { Component } from 'react';
import Pools from './Pools';
import PoolDetails from './PoolDetails';
import axios from 'axios';
import Loading from '../Loading'
import { Redirect } from 'react-router';
class UserLandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentPool : "",
            currentPool: "",
            poolList: [],
            user: {},
            loader: false,
            load: false,
            // user : {
            //     "id": 1,
            //     "screenName": "VamsiMundra",
            //     "nickName": "Vamsi",
            //     "email": "vamsi@gmail.com",
            //     "address": {
            //         "streetNumber": "1292",
            //         "streetName": "Mckinley",
            //         "city": "Sunnyvale",
            //         "state": "CA",
            //         "zip": "94086"
            //     },
            //     "poolDetails": {
            //         "id": 6,
            //         "poolId": "24567",
            //         "name": "Fountain Plaza",
            //         "neighbourhoodName": "James street",
            //         "description": "All poolers",
            //         "zipCode": "95110",
            //         "poolLeader": {
            //             "id": 2,
            //             "screenName": "VamsiMundra",
            //             "nickName": "Vamsi",
            //             "email": "vamsi@gmail.com",
            //             "address": {
            //                 "streetNumber": "1292",
            //                 "streetName": "Mckinley",
            //                 "city": "Sunnyvale",
            //                 "state": "CA",
            //                 "zip": "94086"
            //             }
            //         }
            //     }
            // }
        };
        // sessionStorage.clear();
        // sessionStorage.setItem('id', 4);
        // sessionStorage.setItem('persona', 'user')
        this.poolCreated = this.poolCreated.bind(this);

    }

    componentDidMount() {
        this.getCompleteUserPoolDetails();
    }

    getCompleteUserPoolDetails() {
        this.setState({
            loader: true
        })
        axios.get(`http://35.155.66.64:8080/user/poolCompleteDetails?userId=${sessionStorage.getItem('id')}`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.poolDetails) {

                        if (response.data.poolUserId)
                            sessionStorage.setItem('poolUserId', response.data.poolUserId);
                        else if(sessionStorage.getItem('poolUserId'))
                        sessionStorage.removeItem('poolUserId')
                        if (response.data.cuurentOrderId)
                            sessionStorage.setItem('currentOrderId', response.data.cuurentOrderId);
                        else if(sessionStorage.getItem('currentOrderId')) {
                            sessionStorage.removeItem('currentOrderId')
                        }

                        sessionStorage.setItem('credits', response.data.contribution);
                        if (response.data.contributionStatus)
                            sessionStorage.setItem("contributionStatus", response.data.contributionStatus);
                        if (response.data.poolDetails.poolLeader.id == sessionStorage.getItem("id"))
                            sessionStorage.setItem('leader', true)
                        if (response.data.currentStoreId) {
                            sessionStorage.setItem('store', response.data.currentStoreId)
                            sessionStorage.setItem('storeName', response.data.storeName)
                        }
                        else if (sessionStorage.getItem('store'))
                        {
                            sessionStorage.removeItem("store");
                            sessionStorage.removeItem("storeName");
                        }
                    }
                    this.setState({
                        currentPool: response.data.poolDetails,
                        poolList: response.data.poolList,

                        user: response.data,
                        load: true,
                        loader: false,
                    });


                } else {
                    this.setState({
                        loader: false,
                    })
                }
            })
            .catch(err => {
                this.setState({
                    loader: false,
                })
            })
    }

    poolCreated(data) {
        this.setState({
            currentPool: data
        })
    }
    deletePool = ()=>{
        this.getCompleteUserPoolDetails();
        sessionStorage.removeItem("poolId");
        sessionStorage.removeItem("poolUserId");
        sessionStorage.removeItem("poolid");
        sessionStorage.removeItem("leader");
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
                <Loading loading={this.state.loader}></Loading>
                {
                    this.state.load ?
                        <div>
                            {this.state.currentPool ? <PoolDetails poolDetails={this.state.currentPool} deletePool = {this.deletePool}></PoolDetails> : <Pools poolCreated={this.poolCreated} poolList={this.state.poolList}></Pools>}

                        </div> : ""
                }
            </div>
        )
    }
}


export default UserLandingPage;