import React, { Component } from 'react';
import './MessageList.css';
import moment from 'moment';

class MessageList extends Component {

  render() {
    return (
        <div className="MessageList">
            <h2 className="MessageList-title">Messages</h2>
            <ul className="MessageList-list">
                {
                    this.props.messages.map(msg => <li className="MessageList-item" 
                            key={msg.jobId}> 
                            <span className="MessageList-phone">TO: {msg.phone}</span>
                            <span className="MessageList-message">{msg.message}</span>
                            <span className="MessageList-time">{moment(msg.when).format("MM/DD/YY h:mm a")}</span>
                            </li>
                    )
                } 
            </ul> 
        </div>
    );
  }
}

export default MessageList;
