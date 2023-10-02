import React, { useEffect, useState } from "react";
import GroupChat from "./GroupChat";
import GroupUsers from "./GroupUsers";
import io from "socket.io-client";
import { useUser } from "../../../Contexts/userContext";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { addParticipants, removeParticipants } from "../../../Redux/group/chatSlice";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { addChatMessage, addParticipant, removeParticipant } from "../../../Recoil/selectors/chat";
import { chatListState } from "../../../Recoil/atoms/chat";

const GroupContainer = () => {
  const id = useParams().id;
  const { token } = useUser();

  // const dispatch = useDispatch();
  const addChat = useSetRecoilState(addChatMessage);
  const addMember = useSetRecoilState(addParticipant);
  const removeMember = useSetRecoilState(removeParticipant);

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
      // dispatch(addChat(message));
      addChat(message);
    });
    socket.on("member joined", (participant: IChatParticipant) => {
      // dispatch(addParticipants(participant));
      console.log("pp",participant);
      
      addMember(participant);
    });
    socket.on("member left", (participant: IChatParticipant) => {
      removeMember(participant);
      // dispatch(
      //   removeParticipants(participant)
      // );
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