import React, { useEffect, useState } from "react";
import GroupChat from "./GroupChat";
import GroupUsers from "./GroupUsers";
import io from "socket.io-client";
import { useUser } from "../../../Contexts/userContext";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addChat, addParticipants, removeParticipants } from "../../../Redux/group/chatSlice";

const GroupContainer = () => {
  const id = useParams().id;
  const { token } = useUser();

  const dispatch = useDispatch();

  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_SOCKET_URL as string));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit("setup", { token, groupId: id }, () => {
      console.log("connected");
    });
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("new message", (message: IChatMessage) => {
      dispatch(addChat(message));
    });
    socket.on("member joined", (participant: IChatParticipant) => {
      dispatch(addParticipants(participant));
    });
    socket.on("member left", (participant: IChatParticipant) => {
      dispatch(
        removeParticipants(participant)
      );
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = (message: string) => {
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

export default GroupContainer;