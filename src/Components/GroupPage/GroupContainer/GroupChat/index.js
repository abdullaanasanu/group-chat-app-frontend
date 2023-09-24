import React, { createRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import RecievedMessage from "./RecievedMessage";
import SendMessage from "./SendMessage";
import { useUser } from "../../../../Contexts/userContext";
import { useSelector } from "react-redux";

export default function GroupChat({ sendMessage, }) {
  const chatRef = createRef();
  const { user } = useUser();
  const { chatList: chat } = useSelector((state) => state.chat);
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    sendMessage(data.message);
    reset();
  };

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chat]);

  return (
    <div className="group-chat">
      <div className="chat-messages" ref={chatRef}>
        {chat.map((message) => (
          <>
            {message.user._id == user.id ? (
              <SendMessage message={message} key={message._id} />
            ) : (
              <RecievedMessage message={message} key={message._id} />
            )}
          </>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Type a message..."
          className="form-control"
          autoComplete="off"
          {...register("message", { required: true })}
        />
        <button className="btn btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
