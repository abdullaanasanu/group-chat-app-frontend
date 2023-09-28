import React from "react";
import formatDateFromTimestamp from "../../../../Utils/Time";

interface ISendMessageProps {
  message: IChatMessage;
}

const SendMessage = ({ message }: ISendMessageProps) => {
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

export default SendMessage;