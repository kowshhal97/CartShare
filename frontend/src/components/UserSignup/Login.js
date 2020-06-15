import React, { Component } from 'react';
import firebase from '../firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import '../css/Login.css';
import axios from 'axios';
import swal from 'sweetalert';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uiConfig: {
                signInFlow: 'popup',
                //signInSuccessUrl: '/cartshare/pool',
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID
                ],
                callbacks: {
                    signInSuccessWithAuthResult: (res) => {
                        let val = res.user.emailVerified;
                        val = val.toString();
                        let email = res.user.email;
                        let provider= res.user.providerData[0].providerId;

                        let signUpRequest = {
                            "screenName": res.user.displayName,
                            "email": email,
                            "emailVerified": val,
                            "provider": provider
                        }
                      
                        if (email.substring(email.indexOf("@")) === "@sjsu.edu") {

                            axios.get("http://35.155.66.64:8080/adminExists/" + email, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            }).then(async (response) => {
                                
                                let req = {
                                    "name": res.user.displayName,
                                    "email": email,
                                    "emailVerified": val,
                                    "provider": provider
                                }
                                if (response.data === false) {
                                    await axios.post("http://35.155.66.64:8080/admin/signup/", req, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                        }
                                    }).then(async (response) => {

                                        if (!res.user.emailVerified) {
                                            firebase.auth().currentUser.sendEmailVerification().then(function () {
                                                swal("Email is not verified. Please verify the email and refresh the application to login");
                                            })
                                            
                                           // window.location.replace('/admin/signin');
                                        }
                                        else {
                                            sessionStorage.setItem("email", res.user.email);
                                            sessionStorage.setItem("persona", "admin");
                                            sessionStorage.setItem("id", response.data.id);
                                            sessionStorage.setItem("username", response.data.name);
                                          window.location.replace('/admin/stores');
                                        }

                                    }).catch((error) => {
                                        console.log(error);
                                    })

                                } else {
                                    if (response.data.provider === "facebook.com" || response.data.provider === "google.com") {
                                        if (!res.user.emailVerified) {
                                            firebase.auth().currentUser.sendEmailVerification().then(function () {
                                                swal("Email is not verified. Please verify the email and refresh the application to login");
                                            })
                                            
                                          //  window.location.replace('/admin/signin');
                                        }
                                        else {
                                            sessionStorage.setItem("email", res.user.email);
                                            sessionStorage.setItem("persona", "admin");
                                            sessionStorage.setItem("id", response.data.id);
                                            sessionStorage.setItem("username", response.data.name);
                                            window.location.replace('/admin/stores');

                                        }
                                    } else {
                                        swal("User already exists with this email id. Use Cart Share Login to continue or Refresh the application to use another email with Google or Facebook!!");
                                        
                                       // window.location.replace('/admin/signin');
                                    }

                                }
                            }).catch(error => {
                                console.log("error in catch" + error);
                            })


                        } else {

                            axios.get("http://35.155.66.64:8080/userExists/" + email, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            }).then(async (response) => {
                                if (response.data === false) {
                                    axios.post("http://35.155.66.64:8080/signup/", signUpRequest, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                        }
                                    }).then(async (response) => {

                                        if (!res.user.emailVerified) {
                                            firebase.auth().currentUser.sendEmailVerification().then(function () {
                                                swal("Email is not verified. Please verify the email and refresh the application to login");
                                            })
                                          //  window.location.replace('/signin');
                                        }
                                        else {
                                            sessionStorage.setItem("email", res.user.email);
                                            sessionStorage.setItem("persona", "user");
                                            sessionStorage.setItem("id", response.data.id);
                                            sessionStorage.setItem("username", response.data.screenName);
                                            window.location.replace('/cartshare/pool');
                                        }
                                    }).catch((error) => {
                                        swal('Oops! Email already exists');
                                       // window.location.replace('/signin');
                                    })

                                } else {
                                  
                                    if (response.data.provider === "facebook.com" || response.data.provider === "google.com") {
                                        console.log("inside");
                                        if (!res.user.emailVerified) {
                                            firebase.auth().currentUser.sendEmailVerification().then(function () {
                                                swal("Email is not verified. Please verify the email and refresh the application to login");
                                                
                                            })
                                           // window.location.replace('/signin');
                                        }
                                        else {
                                            sessionStorage.setItem("email", res.user.email);
                                            sessionStorage.setItem("persona", "user");
                                            sessionStorage.setItem("id", response.data.id);
                                            sessionStorage.setItem("username", response.data.screenName);
                                            window.location.replace('/cartshare/pool');

                                        }
                                    } else {
                                        swal("User already exists with this email id. Use Cart Share Login to continue or Refresh to use another email with Google or Facebook!!");
                                         // window.location.replace('/signin');
                                    }
                                }
                            }).catch(error => {
                                console.log(error);
                            })

                        }
                    }
                }
            },
            Email: "",
            Password: "",
            selectedOption: "",
            display: true,
            error:""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    handleEmail = (e) => {
        this.setState(
            {
                Email: e.target.value
            }
        )

    }
    handlePassword = (e) => {
        this.setState(
            {
                Password: e.target.value
            }
        )

    }
    handleOptionChange = (e) => {
        let val=e.target.value;
        this.setState({
            selectedOption: val
        });
        
        window.location.replace('/admin/signin');
    }

    submitLogin(e) {
        e.preventDefault();
        let email=this.state.Email;
        let logindata = {
            "email": email,
            "password": this.state.Password

        }
        if (email.substring(email.indexOf("@")) === "@sjsu.edu") {
            firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.Password).then(function (res) {
                let user = firebase.auth().currentUser;
                if (user.emailVerified) {
                    axios.post('http://35.155.66.64:8080/admin/login/', logindata, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        if (response.status === 200) {
                            sessionStorage.setItem("email", response.data.email);
                            sessionStorage.setItem("id", response.data.id);
                            sessionStorage.setItem("username", response.data.name);
                            sessionStorage.setItem("persona", "admin");
                            window.location.replace('/admin/stores');
                        } if (response.status === 400) {
                            swal("Incorrect credentials");
                        }
                    }).catch((error) => {
                        var err = (error.body) || 'Incorrect Format/Credentials';
                        swal("Oops!", err + '! Please try again', "error");
                        
                    });
                } else {
                    swal("Email is not verified. Please verify the email to login");
                    
                }
            }).catch((error) => {
                swal("Incorrect Format/Credentials");
               
            })


        }else{
        firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.Password).then(function (res) {
            let user = firebase.auth().currentUser;
            if (user.emailVerified) {
                axios.post('http://35.155.66.64:8080/login/', logindata, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    if (response.status === 200) {
                        sessionStorage.setItem("email", response.data.email);
                        sessionStorage.setItem("id", response.data.id);
                        sessionStorage.setItem("persona", "user");
                        sessionStorage.setItem("username", response.data.screenName);
                        window.location.replace('/cartshare/pool');
                    } if (response.status === 400) {
                        console.log("Incorrect Credentials");
                    }
                }).catch((error) => {
                    var err = (error.body) || 'Incorrect Format/Credentials';
                    swal("Oops!", err + '! Please try again', "error");
                   
                });
            } else {
                swal("Email is not verified. Please verify the email to login");
               
            }
        }).catch((error) => {
            swal("Incorrect Format/Credentials");
           
        })
    }
    }

    render() {
        return (
            <div className="row" style={{ marginBottom: "15px", padding: "30px" }} className="signup-container">
                <div className="signup-content">
                    <h3 className="login-title">Login to CartShare</h3><br />
                    
                    <form onSubmit={this.submitLogin}>
                        <div className="radio">
                            <label>
                                <input type="radio" value="Admin" checked={this.state.selectedOption === 'Admin'}
                                    onChange={this.handleOptionChange} />
                                <b>Admin</b>
                            </label>
                        </div>
                        <div className="form-item">
                            <input type="email" name="Email"
                                className="EmailButton" placeholder="Email"
                                value={this.state.email} onChange={this.handleEmail} required />
                        </div><br />
                        <div className="form-item">
                            <input type="password" name="Password"
                                className="EmailButton" placeholder="Password"
                                value={this.state.password} onChange={this.handlePassword} required />
                        </div><br />
                        <div className="form-item">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div><br />
                        <span><b>OR</b></span>
                      { this.state.display && <div><StyledFirebaseAuth uiConfig={this.state.uiConfig} firebaseAuth={firebase.auth()} /></div>}

                        <p>New user? <a href="/signup">Create an Account</a></p>

                    </form>
                </div>
            </div>
        )
    }
}
export default Login;
