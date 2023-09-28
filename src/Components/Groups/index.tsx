import React, { useEffect } from "react";
import GroupItem from "./GroupItem";
import axios from "axios";
import { useUser } from "../../Contexts/userContext";
import { useDispatch, useSelector } from "react-redux";
import { setGroupList } from "../../Redux/group/groupSlice";

const Groups = () => {
  const groups = useSelector((state: any) => state.group.groupList);
  const dispatch = useDispatch();
  const { token } = useUser();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/group",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      dispatch(setGroupList(response.data.groups));
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="groups-list">
      {groups.map((group: IGroupItem) => (
        <GroupItem key={group._id} group={group} />
      ))}
    </div>
  );
}

export default Groups;