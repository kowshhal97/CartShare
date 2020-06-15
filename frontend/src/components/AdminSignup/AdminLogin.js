import React, { Component } from 'react';
import firebase from '../firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import '../css/Login.css';
import axios from 'axios';
import swal from 'sweetalert';
class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uiConfig: {
                signInFlow: 'popup',
                signInSuccess: () => false,
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID
                ],
                callbacks: {
                    signInSuccessWithAuthResult: (res) => {
                        let val = res.user.emailVerified;
                        val = val.toString();
                        let provider=res.user.providerData[0].providerId;
                        let signUpRequest = {
                            "name": res.user.displayName,
                            "email": res.user.email,
                            "emailVerified": val,
                            "provider": provider
                        }
                        axios.get("http://35.155.66.64:8080/adminExists/" + res.user.email, {
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
                                    if (response.data == "Not a Admin") {
                                        swal("Cannot register this email for Admin user. Refresh the application and use SJSU id.");
                                        this.setState({
                                            signinRedirect:true
                                        })
                                    }
                                    else {
                                        if (!res.user.emailVerified) {
                                            firebase.auth().currentUser.sendEmailVerification().then(function () {
                                                swal("Email is not verified. Please verify the email and refresh the application to login");
                                            })
                                            this.setState({
                                                signinRedirect:true
                                            })
                                        }
                                        else {
                                            sessionStorage.setItem("email", res.user.email);
                                            sessionStorage.setItem("persona", "admin");
                                            sessionStorage.setItem("id", response.data.id);
                                            sessionStorage.setItem("username", response.data.name);
                                            window.location.replace('/admin/stores');
                                        }
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
                                        this.setState({
                                            signinRedirect:true
                                        })
                                    }
                                    else {
                                        sessionStorage.setItem("email", res.user.email);
                                        sessionStorage.setItem("persona", "admin");
                                        sessionStorage.setItem("id", response.data.id);
                                        sessionStorage.setItem("username", response.data.name);
                                        window.location.replace('/admin/stores');

                                    }
                                } else {
                                    swal("User already exists with this email id. Use Cart Share Login to continue or Refresh to use another email with Google or Facebook!!");
                                       
                                    this.setState({
                                        signinRedirect:true
                                    })
                                }

                            }
                        }).catch(error => {
                            console.log("error in catch" + error);
                        })


                    }
                }
            },
            Email: "",
            Password: "",
            selectedOption: "",
            signinRedirect:false
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    handleOptionChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        });

        window.location.replace('/signin');
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

    submitLogin(e) {
        e.preventDefault();
        let logindata = {
            "email": this.state.Email,
            "password": this.state.Password

        }
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
    }

    render() {
      
       // if(this.state.signinRedirect)
        //{
          // window.location.replace('/admin/signin');
       // }
      
        return (
            <div className="row" style={{ marginBottom: "15px", padding: "30px" }} className="signup-container">
                <div className="signup-content">
                    <h3 className="login-title">Login to CartShare</h3>
                    <form onSubmit={this.submitLogin}>
                        <div className="radio">
                            <label>
                                <input type="radio" value="Pool User" checked={this.state.selectedOption === 'Pool User'}
                                    onChange={this.handleOptionChange} />
                                <b>Pool User</b>
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
                        </div>
                        <div><StyledFirebaseAuth uiConfig={this.state.uiConfig} firebaseAuth={firebase.auth()} /></div>

                        <p>New user? <a href="/admin/signup">Create an Account</a></p>
                        
                    </form>
                </div>
            </div>
        )
    }
}
export default AdminLogin;
