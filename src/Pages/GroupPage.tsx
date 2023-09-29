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

const GroupPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { token } = useUser();

  useEffect(() => {
    fetchGroupInfo();
  }, [id]);

  const fetchGroupInfo = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/group/" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      dispatch(setGroupInfo(response.data.group));
      dispatch(setChatList(response.data.group.chat));
      dispatch(setParticipantsList(response.data.group.participants));
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
