import React, { Component } from 'react';
import Datetime from 'react-datetime';
import logo from './logo.svg';
import './App.css';
import '../node_modules/react-datetime/css/react-datetime.css';
const electron = window.require('electron');
const uuid = require('uuid/v4');
const remote = electron.remote;
const ipc = electron.ipcRenderer;

class App extends Component {

    constructor(props) {
        console.log("Inside constructor");
        super(props);
        this.state = {date: new Date(), messages: []};
    }

    handleDateChange(momentDate){
        this.setState({date: momentDate.toDate()});
    }

    sendMessage(){
        var message = {
            jobId: uuid(),
            message: document.getElementById('messageToSend').value,
            phone: document.getElementById('phoneNumber').value,
            when: this.state.date
        };
        this.setState(prevState => ({
            messages: [...prevState.messages, message]
        }));
        ipc.send('button-push', message);
        console.log(this.state);
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Message Queue</h1>
        </header>
        <br/>
        <div className="MessageList">
            <h2>Messages</h2>
            <ul>
                {this.state.messages.map(msg => <li key={msg.jobId}> {msg.phone} {msg.message} {msg.when.toString()}</li>)} 
            </ul> 
        </div>
        <label>Send What</label>
        <br/>
        <input type="text" id="messageToSend" placeholder="Message"/>
        <br/>
        <label>To who</label>
        <br/>
        <input type="text" id="phoneNumber" placeholder="Number"/>
        <br/>
        <label>When</label>
        <br/>
        <Datetime onChange={this.handleDateChange.bind(this)}/>
        <button onClick={this.sendMessage.bind(this)} id="testCommBtn">Test</button>
      </div>
    );
  }
}

export default App;
