import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import RecievedMessage from "./RecievedMessage";
import SendMessage from "./SendMessage";
import { useUser } from "../../../../Contexts/userContext";
import { useSelector } from "react-redux";
import { Card, IconButton, TextField } from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

interface IGroupChatProps {
  sendMessage: (message: string) => void;
}

interface IChatForm {
  message: string;
}

const GroupChat = ({ sendMessage }: IGroupChatProps) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { chatList: chat } = useSelector((state: any) => state.chat);
  const { register, handleSubmit, reset } = useForm<IChatForm>();

  const onSubmit = (data: IChatForm) => {
    console.log(data);
    sendMessage(data.message);
    reset();
  };

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chat]);

  return (
    <div className="group-chat">
      <div className="chat-messages" ref={chatRef}>
        {chat.map((message: IChatMessage) => (
          <>
            {message.user._id === user.id ? (
              <SendMessage message={message} key={message._id} />
            ) : (
              <RecievedMessage message={message} key={message._id} />
            )}
          </>
        ))}
      </div>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField.Root radius="full">
            <TextField.Input
              placeholder="Type a message..."
              {...register("message", { required: true })}
            />
            <TextField.Slot>
              <IconButton size="1" variant="ghost">
                <PaperPlaneIcon height={16} width={16} />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
          {/* <input
          type="text"
          placeholder="Type a message..."
          className="form-control"
          autoComplete="off"
          {...register("message", { required: true })}
        />
        <button className="btn btn-primary" type="submit">
          Send
        </button> */}
        </form>
      </Card>
    </div>
  );
};

export default GroupChat;
