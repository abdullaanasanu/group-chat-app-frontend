import React, { useEffect } from "react";
import GroupInfo from "../Components/GroupPage/GroupInfo";
import GroupContainer from "../Components/GroupPage/GroupContainer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUser } from "../Contexts/userContext";
import { useDispatch } from "react-redux";
import {
  setChatList,
  setGroupInfo,
  setParticipantsList,
} from "../Redux/group/chatSlice";
import { useRecoilState } from "recoil";
import {
  chatListEndState,
  chatListPageState,
  chatListState,
  groupInfoState,
  participantListState,
} from "../Recoil/atoms/chat";
import { set } from "react-hook-form";

const GroupPage = () => {
  const { id } = useParams<{ id: string }>();
  const [groupInfo, setGroupInfo] = useRecoilState(groupInfoState);
  const [chatList, setChatList] = useRecoilState(chatListState);
  const [participantsList, setParticipantsList] =
    useRecoilState(participantListState);
  const [chatListPage, setChatListPage] = useRecoilState(chatListPageState);
  const [chatListEnd, setChatListEnd] = useRecoilState(chatListEndState);
  // const dispatch = useDispatch();

  const { token } = useUser();

  useEffect(() => {
    fetchGroupInfo();
  }, [id]);

  const fetchGroupInfo = async () => {
    try {
      setGroupInfo(null);
      setChatList([]);
      setParticipantsList([]);
      setChatListPage(1);
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/group/" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      setGroupInfo(response.data.group);
      setChatList(response.data.group.chat);
      setParticipantsList(response.data.group.participants);
      setChatListPage(1);

      if (response.data.group.chat.length % 10 !== 0) {
        // setChatListPage(chatListPage-1)
        setChatListEnd(true);
      } else {
        setChatListEnd(false);
      }
      // dispatch(setGroupInfo(response.data.group));
      // dispatch(setChatList(response.data.group.chat));
      // dispatch(setParticipantsList(response.data.group.participants));
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="group-page">
      <GroupInfo />
      <GroupContainer />
    </div>
  );
};

export default GroupPage;
