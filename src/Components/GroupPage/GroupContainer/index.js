import React, { useEffect, useRef, useState } from "react";
import GroupChat from "./GroupChat";
import GroupUsers from "./GroupUsers";
import io from "socket.io-client";
import { useUser } from "../../../Contexts/userContext";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addChat, addParticipants, removeParticipants, setChatList, setParticipantsList } from "../../../Redux/group/chatSlice";

export default function GroupContainer() {
  const id = useParams().id;
  const { token } = useUser();

  const {
    chatList: chat,
    participantsList: participants,
  } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const [socketConnected, setSocketConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_SOCKET_URL));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit("setup", { token, groupId: id }, () => {
      console.log("connected");
    });
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("new message", (message) => {
      dispatch(addChat(message));
      // dispatch(setChatList([...chat, message]));
    });
    socket.on("member joined", (participant) => {
      console.log("member joined", participant);
      dispatch(addParticipants(participant));
    });
    socket.on("member left", (participant) => {
      console.log("member left", participant);
      console.log("participants", participants);
      // let remainingParticipants = participants.filter(
      //   (p) => p.user._id !== participant.user._id
      // );
      // console.log("remaining participants", remainingParticipants);
      dispatch(
        removeParticipants(participant)
      );
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = (message) => {
    if (socketConnected) {
      socket.emit(
        "new message",
        {
          group: id,
          token,
          message,
        },
        () => {
          console.log("message sent");
        }
      );
    } else {
      console.log("socket not connected");
    }
  };

  return (
    <div className="group-container">
      <GroupChat sendMessage={sendMessage} />
      <GroupUsers />
    </div>
  );
}
