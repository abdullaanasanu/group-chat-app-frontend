import React, { useEffect } from "react";
import GroupItem from "./GroupItem";
import axios from "axios";
import { useUser } from "../../Contexts/userContext";
import { useDispatch, useSelector } from "react-redux";
import { setGroupList } from "../../Redux/group/groupSlice";

export default function Groups({}) {
  const groups = useSelector((state) => state.group.groupList);
  const dispatch = useDispatch();
  const { token } = useUser();

  useEffect(() => {
    // called redux action
    axios.get(process.env.REACT_APP_API_URL + "/group", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      dispatch(setGroupList(response.data.groups));
    });
  }, []);

  return (
    <div className="groups-list">
      {groups.map((group) => (
        <GroupItem key={group._id} group={group} />
      ))}
    </div>
  );
}
