import React from "react";
import { useSelector } from "react-redux";

export default function GroupInfo() {

  const {
    groupInfo: group,
    participantsList: participants,
  } = useSelector((state) => state.chat);

  return (
    <div className="group-info">
      <h3>{group?.name}</h3>
      <p>{participants.length} Online Users</p>
    </div>
  );
}
