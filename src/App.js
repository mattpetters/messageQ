import React, { Component } from 'react';
import MessageList from './MessageList';
import ComposeMessageForm from './ComposeMessageForm';
import logo from './logo.svg';
import './App.css';
const electron = window.require('electron');
const uuid = require('uuid/v4');
const ipc = electron.ipcRenderer;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {messages: []};
        this.sendMessage = this.sendMessage.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        ipc.on('job-completed', (event, arg) => {
            console.log(arg, " completed!");
            // find message with id and remove/mark as completed
            var jobIndex = this.state.messages.findIndex( (el) => el.jobId === arg);
            if (jobIndex === -1){
                console.log("job not found");
            } else {
                this.setState((prevState, props) => {
                    var prevMessages = prevState.messages;
                    prevMessages[jobIndex].completed = true;
                    return {
                        messages: prevMessages
                    }
                }); 
            }
        });

    }

    handleDateChange(momentDate){
        this.setState({date: momentDate.toDate()});
    }

    sendMessage(msg, phoneNo, date){
        var message = {
            jobId: uuid(),
            message: msg,
            phone: phoneNo,
            when: date
        };
        this.setState(prevState => ({
            messages: [...prevState.messages, message]
        }));
        ipc.send('button-push', message);
    }

  render() {
    return (
      <div className="App" style={{WebkitAppRegion: 'drag'}}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MessageQ</h1>
        </header>
        <br/>
        <MessageList messages={this.state.messages} />
        <ComposeMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
