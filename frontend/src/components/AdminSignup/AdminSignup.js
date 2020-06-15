import React, { Component } from 'react';
import '../css/Signup.css';
import firebase from "firebase";
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
class AdminSignup extends Component {
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
                    <span className="login-link">Already have an account? <Link to="/admin/signin">Login!</Link></span>
                </div>
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            emailVerified: "false",
            IncorrectCredentials: '',
            provider:'App'
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
    handleSubmit = async (event) => {
        event.preventDefault();
        const signUpRequest = Object.assign({}, this.state);

        await axios.get("http://35.155.66.64:8080/adminExists/" + this.state.email, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async (response) => {
            if (response.data === false) {
               await axios.post("http://35.155.66.64:8080/admin/signup/", signUpRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(async (response) => {
                    if (response.data === "Not a Admin") {
                        swal("Cannot register this email for Admin user. please use sjsu email id");
                    } else if (response.data === "Cannot register user") {
                        swal("Name should be unique");
                    }
                    else {
                        let res = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
                            let user = firebase.auth().currentUser;
                          await user.sendEmailVerification().then(function () {
                                swal('You are successfully registered. Please verify your email and login to continue!');
                                window.location.replace('/admin/signin');
                            }).catch(function () {
                                console.log("Error in sending email");
                            })
               }
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
                    
                });

            } else {
                swal('Oops! Email already exists');
            }

        }).catch(error => {
            swal('Oops! Error');
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.IncorrectCredentials}
                <div className="form-item">
                    <input type="text" name="name"
                        className="EmailButton" placeholder="name"
                        value={this.state.name} onChange={this.handleInputChange} required />
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
                    <button type="submit" className="btn btn-primary" >Sign Up</button>
                </div>
            </form>

        );
    }
}

export default AdminSignup;
