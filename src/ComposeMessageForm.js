import React, { Component } from 'react';
import './ComposeMessageForm.css';
import Datetime from 'react-datetime';
import '../node_modules/react-datetime/css/react-datetime.css';

class ComposeMessageForm extends Component {

    constructor(props) {
        super(props);
        this.state = { messageToSend: '', phoneNumber: '', date: new Date()};
    }

  render() {
    return (
        <div className="ComposeMessageForm">
        <label className="ComposeMessageForm-label">Send What</label>
        <br/>
        <textarea rows="3" className="ComposeMessageForm-inputtext" onChange={ (event) => { this.setState({messageToSend: event.target.value})} } type="text" id="messageToSend" placeholder="Message"/>
        <br/>
        <label className="ComposeMessageForm-label">To who</label>
        <br/>
        <input className="ComposeMessageForm-inputtext" onChange={ (event) => {this.setState({phoneNumber: event.target.value})} } type="text" id="phoneNumber" placeholder="Number"/>
        <br/>
        <label className="ComposeMessageForm-label">When</label>
        <br/>
        <Datetime onChange={ (momentDate) => { this.setState({date: momentDate.toDate()}) } }/>
        <button onClick={()=> { this.props.sendMessage(this.state.messageToSend, this.state.phoneNumber, this.state.date) }} id="testCommBtn">Schedule</button>
        </div>
    );
  }
}

export default ComposeMessageForm;
