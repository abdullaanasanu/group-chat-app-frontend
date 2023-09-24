import React from "react";
import { Link } from "react-router-dom";

export default function GroupItem({ group }) {
  return (
    <Link to={"/group/" + group?._id}>
      <div className="group-item">
        <h3>{group?.name}</h3>
        <p>{group?.totalParticipants} Online Users</p>
      </div>
    </Link>
  );
}
