import React from "react";
import formatDateFromTimestamp from "../../../../Utils/Time";

export default function SendMessage({ message }) {
  return (
    <div className="chat-message send">
      <div className="chat-message-container">
        <div className="chat-message-text">{message.message}</div>
        <div className="message-time">
          {formatDateFromTimestamp(message.createdAt)}
        </div>
      </div>
    </div>
  );
}
