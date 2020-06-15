import React, { Component } from 'react';
import axios from 'axios';
import '../css/Signup.css';
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PoolerNames: [{ "id": '', "screenName": "Select" }],
            userid: '',
            Message: "",
            selectedpoolerid: "",
            Subject: "",
            displayMessageUI: "",
            empty: "",
            SuccessMessage:""
        }
    }
    sendMessage = async (e) => {
        e.preventDefault();
        let postmessage = {
            "subject": this.state.Subject,
            "message": this.state.Message
        }
        
        if (this.state.selectedpoolerid === '') {
            this.setState({
                displayMessageUI: "Select a Pooler to send a message"
            })
        } else {
            await axios.post("http://35.155.66.64:8080/email/" + this.state.userid + "/" + this.state.selectedpoolerid, postmessage, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
               if (response.data === "email sent!") {
                    this.setState({
                        SuccessMessage: "Message successfully Sent!"
                    })
                } else {
                    this.setState({
                        displayMessageUI: "Error in sending message"
                    })
                    
                }
            }).catch(error => {
               
                this.setState(
                    {
                        displayMessageUI: "Error in sending message!"
                    }
                )
            })
        }
    }
    async componentDidMount() {
        let id = sessionStorage.getItem("id");
        await this.setState({
            userid: id
        })

        await axios.get("http://35.155.66.64:8080/user/poolCompleteDetails?userId=" + id, {
           headers: {
                'Content-Type': 'application/json',
           }
        }).then(response => {

            let membersArray = response.data.poolDetails.members;
        
         
            let newarray=[];
            for (let i = 0; i < membersArray.length; i++) {
                 if (id !== membersArray[i].id.toString()) {
                   newarray=newarray.concat(membersArray[i]);
                 }
              
           }
           this.setState({
                PoolerNames: this.state.PoolerNames.concat(newarray)
            })

       }).catch(error => {
           console.log("error");
        })

    }
    poolMemberChange = (e) => {
        let id = e.target.value;
        this.setState({
            selectedpoolerid: id
        })
    }
    handleMessage = (e) => {
        this.setState({
            Message: e.target.value
        })
    }
    handleSubject = (e) => {
        this.setState({
            Subject: e.target.value
        })
    }
    handleClose=(e)=>
    {
        e.preventDefault();
        window.location.replace('/cartshare/pool');
    }
    render() {


        let optionTemplate = this.state.PoolerNames.map(v => (
            <option value={v.id}>{v.screenName}</option>
        ));
        return (
            <div className="row" style={{ marginBottom: "15px", padding: "30px" }} className="signup-container">
                <div className="signup-content">
                    <h2 className="login-title"><b>Message</b></h2>
                    <label style={{ color: "red" }}>{this.state.displayMessageUI}</label>
                    <label style={{ color: "green" }}>{this.state.SuccessMessage}</label>
                    
                    <form onSubmit={this.sendMessage}>
                        <span>Pool Member</span>
                        <div className="form-item">
                            <select value={this.state.value} className="subjectButton" onChange={this.poolMemberChange}>
                                {optionTemplate}
                            </select>
                        </div><br />
                        <span>Subject</span>
                        <div className="form-item">
                            <input type="text" name="subject"
                                className="subjectButton" placeholder="subject"
                                value={this.state.Subject} onChange={this.handleSubject} required />
                        </div><br />
                        <span>Message</span>
                        <div className="form-item">
                            <textarea type="text" name="message"
                                className="MessageButton" placeholder="message"
                                value={this.state.Message} onChange={this.handleMessage} required />
                        </div><br />

                        <div className="form-item">
                            <button type="submit" className="btn btn-primary">Send</button>
                            <button onClick={this.handleClose} style={{margin:"20px"}} className="btn btn-primary">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Message;
