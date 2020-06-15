import React, { Component } from 'react';
import '../css/Signup.css';
import firebase from "firebase";
import { Link, Redirect } from 'react-router-dom'
import Alert from 'react-s-alert';
import axios from 'axios';
import swal from 'sweetalert';
class Signup extends Component {
    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }} />;
        }

        return (
            <div className="row" style={{ marginBottom: "15px", padding: "30px" }} className="signup-container">
                <div className="signup-content">
                    <h2>Signup to CartShare</h2>
                    <SignupForm {...this.props} /><br />
                    <span className="login-link">Already have an account? <Link to="/signin">Login!</Link></span>
                </div>
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenName: '',
            nickName: '',
            email: '',
            password: '',
            streetNumber: '',
            streetName: '',
            city: '',
            state: '',
            zip: '',
            emailVerified: "false",
            IncorrectCredentials: '',
            provider: 'App'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }
    onValidate = () => {
        if (this.state.zip != "") {
            const validZipcode = RegExp("^[0-9]{5}(?:-[0-9]{4})?$");
            if (!validZipcode.test(this.state.zip)) {
                this.setState(
                    {
                        IncorrectCredentials: "Invalid Zipcode. Valid Zipcodes should be like 90086"
                    }
                )
                return false;
            }
            return true;
        }
        return true;
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        let isValid = this.onValidate();
        if (isValid) {
            const signUpRequest = Object.assign({}, this.state);
            let email = this.state.email;
            if (email.substring(email.indexOf("@")) === "@sjsu.edu") {
                await axios.get("http://35.155.66.64:8080/adminExists/" + this.state.email, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(async (response) => {
                    if (response.data === false) {
                        axios.post("http://35.155.66.64:8080/admin/signup/", signUpRequest, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(async (response) => {
                           
                                let res = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
                                let user = firebase.auth().currentUser;

                                await user.sendEmailVerification().then(function () {
                                    window.location.replace('admin/signin');
                                }).catch(function () {
                                    console.log("Error in sending email");
                                })
                         }).catch(async (error) => {
                            await  axios.delete("http://35.155.66.64:8080/removeAdmin/"+this.state.email, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            }).then(async (response) => {
            
                               if(response.data === "deleted")
                                  swal('Cannot register user! Password length should be minimum of 8 characters/User Already Exists');
                                else
                                swal('Error');
                            }).catch(errorw=>{
                                swal('Error!');
                            })
                        })

                    }
                    else {
                        swal('Oops! Email already exists');
                    }

                }).catch(error => {
                    swal('Oops! Email already exists');
                })

            } else {
                
                await axios.get("http://35.155.66.64:8080/userExists/" + this.state.email, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(async (response) => {
                    if (response.data === false) {

                        await axios.post("http://35.155.66.64:8080/signup/", signUpRequest, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(async (response) => {
                          
                            if(response.data === "Cannot register user")
                            {
                                swal('Cannot register user. Screen Name and Nick name should be unique')
                            }else{
                                let res = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
                                let user = firebase.auth().currentUser;
        
                                await user.sendEmailVerification().then(function () {
                                    window.location.replace('/signin');
                                }).catch(function () {
                                    console.log("Error in sending email");
                                })
                            }
                        }).catch(async (error) => {
                            await axios.delete("http://35.155.66.64:8080/removeUser/"+this.state.email, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            }).then(async (response) => {
            
                               if(response.data === "deleted")
                                  swal('Cannot register user! Password length should be minimum of 8 characters or User Already Exists');
                                else
                                swal('Error');
                            }).catch(errorw => {
                                swal('Error!');
                            })
                        });


                    }else
                    {
                        swal('Oops! Email already exists');
                    }
                }).catch(error=>{
                    swal('Oops! Email already exists');
                })
               
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.IncorrectCredentials}
                <div className="form-item">
                    <input type="text" name="screenName"
                        className="EmailButton" placeholder="screenName"
                        value={this.state.screenName} onChange={this.handleInputChange} required />
                </div><br />
                <div className="form-item">
                    <input type="text" name="nickName"
                        className="EmailButton" placeholder="nickName"
                        value={this.state.nickName} onChange={this.handleInputChange} required />
                </div><br />
                <div className="form-item">
                    <input type="email" name="email"
                        className="EmailButton" placeholder="email"
                        value={this.state.email} onChange={this.handleInputChange} required />
                </div><br />
                <div className="form-item">
                    <input type="password" name="password"
                        className="EmailButton" placeholder="password"
                        value={this.state.password} onChange={this.handleInputChange} required />
                </div><br />
                <div className="form-item">
                    <input type="text" name="streetNumber"
                        className="EmailButton" placeholder="streetNumber"
                        value={this.state.streetNumber} onChange={this.handleInputChange} />
                </div><br />
                <div className="form-item">
                    <input type="text" name="streetName"
                        className="EmailButton" placeholder="streetName"
                        value={this.state.streetName} onChange={this.handleInputChange} />
                </div><br />
                <div className="form-item">
                    <input type="text" name="city"
                        className="EmailButton" placeholder="city"
                        value={this.state.city} onChange={this.handleInputChange} />
                </div><br />
                <div className="form-item">
                    <input type="text" name="state"
                        className="EmailButton" placeholder="state"
                        value={this.state.state} onChange={this.handleInputChange} />
                </div><br />
                <div className="form-item">
                    <input type="text" name="zip"
                        className="EmailButton" placeholder="zip"
                        value={this.state.zip} onChange={this.handleInputChange} />
                </div><br />
                <div className="form-item">
                    <button type="submit" className="btn btn-primary" >Sign Up</button>
                </div>
            </form>

        );
    }
}

export default Signup;
