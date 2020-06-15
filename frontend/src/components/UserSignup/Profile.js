import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenName:'',
            nickName:'',
            email: '',
            password: '',
            streetNumber:'',
 	        streetName:'',
 	        city:'',
 	        state:'',
            zip:'',
            IncorrectCredentials:'',
            credits:'',
            contributionStatus:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    async componentDidMount()
    {
        let email= sessionStorage.getItem("email");

       await axios.get("http://35.155.66.64:8080/user/profiledetails/"+email, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async (response) => {
            if(response.data.status)
            sessionStorage.setItem("contributionStatus",response.data.status);
            if(response.data.credits)
            sessionStorage.setItem("credits",response.data.credits)
            this.setState({
                screenName: response.data.screenName,
                nickName: response.data.nickName,
                email: response.data.email,
                password: response.data.password
            })
           
           if(response.data.address!=null)
           {
           this.setState(
               {
                streetNumber: response.data.address.streetNumber,
                streetName:response.data.address.streetName,
                city:response.data.address.city,
                state:response.data.address.state,
                zip: response.data.address.zip,
               }
           )
            }
        })
       
        if(sessionStorage.getItem('credits'))
        {
            this.setState({
                credits: sessionStorage.getItem('credits')
            })
        }
           
        if(sessionStorage.getItem('contributionStatus'))
        {
            this.setState({
                contributionStatus: sessionStorage.getItem('contributionStatus')
            })
        }

    }
    handleClose=(e)=>
    {
        e.preventDefault();
        window.location.replace('/cartshare/pool');
    }
    onValidate=()=>
    {
     if(this.state.zip!="")
       {
        const validZipcode=RegExp( "^[0-9]{5}(?:-[0-9]{4})?$");
        if(!validZipcode.test(this.state.zip))
        {
            this.setState(
                {
                    IncorrectCredentials: "Invalid Zipcode. Valid Zipcodes should be like 90086-1929 or 90086"
                }
            )
            return false;
        }
        return true;
       }
       return true;
    }
    handleSubmit= async (event)=>
    {
        event.preventDefault();  
        console.log("in submit"); 
        let isValid = this.onValidate();
        if(isValid)
        {console.log("in valid");
            const profile = Object.assign({}, this.state);
            axios.put("http://35.155.66.64:8080/user/updateProfile/"+this.state.email,profile, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async (response) => {
                Object.assign(this.state, response.data);
                swal("Profile has been updated Successfully");
            })
        }
    }
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        this.setState({
            [inputName] : inputValue
        });        
    }
    render() {
        return (
            <div className="row" style={{ marginBottom: "15px", padding: "30px" }} className="signup-container">
                <div className="signup-content">
                <h1 className="login-title">Profile</h1>
            <form onSubmit={this.handleSubmit}>
                {this.state.IncorrectCredentials}
                <span><b>Screen Name</b></span>  <div className="form-item">
                    <input type="text" name="screenName" 
                        className="EmailButton" placeholder="screenName"
                        value={this.state.screenName} onChange={this.handleInputChange} readOnly/>
                </div><br/>
                <span><b>Nick name</b></span>   <div className="form-item">
                 <input type="text" name="nickName" 
                        className="EmailButton" placeholder="nickName"
                        value={this.state.nickName} onChange={this.handleInputChange} />
                </div><br/>
                <span><b>Email</b></span> <div className="form-item">
                    <input type="email" name="email" 
                        className="EmailButton" placeholder="email"
                        value={this.state.email} onChange={this.handleInputChange} readOnly/>
                </div><br/>
                <span><b>Street Number</b></span> <div className="form-item">
                    <input type="text" name="streetNumber" 
                        className="EmailButton" placeholder="streetNumber"
                        value={this.state.streetNumber} onChange={this.handleInputChange} />
                </div><br/>
                <span><b>Street Name</b></span> <div className="form-item">
                    <input type="text" name="streetName" 
                        className="EmailButton" placeholder="streetName"
                        value={this.state.streetName} onChange={this.handleInputChange} />
                </div><br/>
                <span><b>City</b></span><div className="form-item">
                    <input type="text" name="city" 
                        className="EmailButton" placeholder="city"
                        value={this.state.city} onChange={this.handleInputChange} />
                </div><br/>
                <span><b>State</b></span><div className="form-item">
                    <input type="text" name="state" 
                        className="EmailButton" placeholder="state"
                        value={this.state.state} onChange={this.handleInputChange} />
                </div><br/>
                <span><b>Zip</b></span><div className="form-item">
                    <input type="text" name="zip" 
                        className="EmailButton" placeholder="zip"
                        value={this.state.zip} onChange={this.handleInputChange} />
                </div><br/>
                
                <span><b>Credits</b></span> <div className="form-item">
                    <input type="text" name="credits" 
                        className="EmailButton" placeholder="credits"
                        value={this.state.credits} readOnly/>
                </div><br/>
                <span><b>Contribution Status</b></span> <div className="form-item">
                    <input type="text" name="contributionStatus" 
                        className="EmailButton" placeholder="contributionStatus"
                        value={this.state.contributionStatus} readOnly/>
                </div><br/>
             <div className="form-item">
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                    <button onClick={this.handleClose} style={{margin:"20px"}} className="btn btn-primary">Close</button>
             </div>
            </form>                    
   </div>  </div> 
        );
    }
}


export default Profile;
