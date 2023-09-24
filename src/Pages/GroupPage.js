import React, { useEffect, useState } from "react";
import GroupInfo from "../Components/GroupPage/GroupInfo";
import GroupContainer from "../Components/GroupPage/GroupContainer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../Contexts/userContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatList,
  setGroupInfo,
  setParticipantsList,
} from "../Redux/group/chatSlice";

export default function GroupPage() {
  const id = useParams().id;
  const {
    groupInfo: group,
    chatList: chat,
    participantsList: participants,
  } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const { token } = useUser();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/group/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(setGroupInfo(response.data.group));
        dispatch(setChatList(response.data.group.chat));
        dispatch(setParticipantsList(response.data.group.participants));
      });
  }, [id]);

  return (
    <div className="group-page">
      <GroupInfo />
      <GroupContainer />
    </div>
  );
}
