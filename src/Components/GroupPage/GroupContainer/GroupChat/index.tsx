import React, { useRef, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import RecievedMessage from "./RecievedMessage";
import SendMessage from "./SendMessage";
import { useUser } from "../../../../Contexts/userContext";
import { useSelector } from "react-redux";
import { Card, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { PaperPlaneIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  chatListEndState,
  chatListPageState,
  chatListState,
  groupInfoState,
} from "../../../../Recoil/atoms/chat";
import axios from "axios";
import { useParams } from "react-router-dom";
import { appendOldChatList } from "../../../../Recoil/selectors/chat";
import toast from "react-hot-toast";
import formatDateFromTimestamp from "../../../../Utils/Time";

interface IGroupChatProps {
  sendMessage: (message: string) => void;
}

interface IChatForm {
  message: string;
}

const GroupChat = ({ sendMessage }: IGroupChatProps) => {
  const { id } = useParams<{ id: string }>();
  const chatRef = useRef<HTMLDivElement>(null);
  const { user, token } = useUser();
  const chat = useRecoilValue<IChatMessage[]>(chatListState);
  const groupInfo = useRecoilValue<any>(groupInfoState);
  const [chatListEnd, setChatListEnd] = useRecoilState(chatListEndState);
  const appendOldChat = useSetRecoilState(appendOldChatList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Flag to scroll down on message send
  const [scrollDown, setScrollDown] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<IChatForm>();

  const onSubmit = (data: IChatForm) => {
    console.log(data);
    setScrollDown(true);
    sendMessage(data.message);
    reset();
  };

  const handleScroll = () => {
    const element = chatRef.current;
    if (!element) return;
    if (element.scrollTop === 0) {
      // User has scrolled to the top of the div
      fetchOldMessages();
    }
  };

  useEffect(() => {
    if (!chatRef.current) return;
    if (scrollDown) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      setScrollDown(false);
      return
    }
    if (chatListEnd) return;
    if (chat.length % 10 !== 0) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight / (chat.length / 10);
  }, [chat]);

  const fetchOldMessages = async () => {
    try {
      let skip = chat.length;
      if (chatListEnd) return;
      setIsLoading(true);

      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/group/chat/" + id,
        {
          params: {
            skip,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      appendOldChat(response.data.chat);
      if (response.data.chat.length % 10 !== 0) {
        // setChatListPage(chatListPage-1)
        toast("All messages loaded", { icon: "👏" });
        setChatListEnd(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group-chat">
      <div className="chat-messages" ref={chatRef} onScroll={handleScroll}>
        {isLoading && (
          <Flex justify="center" align="center" className="loading" gap="2">
            <UpdateIcon height={16} width={16} className="spinner" />
            Loading...
          </Flex>
        )}
        {chatListEnd && (
          <Flex justify="center" align="center" className="loading" gap="2">
            <Text size="1" weight="medium" color="gray" trim="end" as="div">
              Group Created at {formatDateFromTimestamp(groupInfo?.createdAt)}
            </Text>
          </Flex>
        )}
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
