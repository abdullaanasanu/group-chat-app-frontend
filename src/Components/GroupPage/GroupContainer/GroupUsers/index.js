import React from "react";
import User from "./User";
import { useSelector } from "react-redux";
import { useUser } from "../../../../Contexts/userContext";

export default function GroupUsers() {
  const { participantsList: participants } = useSelector((state) => state.chat);
  const { user } = useUser();

  return (
    <div className="group-users">
      {participants.map((participant) => (
        <>
          {participant.user._id != user.id && (
            <User key={participant._id} participant={participant} />
          )}
        </>
      ))}
      <User key={user.id} participant={{user}} />
    </div>
  );
}
