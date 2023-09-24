import React from "react";
import formatDateFromTimestamp from "../../../../Utils/Time";

export default function RecievedMessage({ message }) {
  return (
    <div className="chat-message">
      <div className="user-avatar">{message.user.name[0]}</div>
      <div className="chat-message-container">
        <div className="message-header">
          <div className="user-name">{message.user.name}</div>
          <div className="message-time">
            {/* Set date as Today, Yestarday or date */}
            {formatDateFromTimestamp(message.createdAt)}
            
          </div>
        </div>
        <div className="chat-message-text">{message.message}</div>
      </div>
    </div>
  );
}
