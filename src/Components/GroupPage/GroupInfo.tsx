import React from "react";
import { useSelector } from "react-redux";

const GroupInfo = () => {

  const {
    groupInfo: group,
    participantsList: participants,
  } = useSelector((state: any) => state.chat);

  return (
    <div className="group-info">
      <h3>{group?.name}</h3>
      <p>{participants.length} Online Users</p>
    </div>
  );
}

export default GroupInfo;