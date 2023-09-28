import React from "react";

interface IUserProps {
  participant: IChatParticipant | { user: any };
}

const User = ({ participant }: IUserProps) => {
  return (
    <>
      <div className="user-item">
        <h3 className="user-avatar">{participant?.user.name[0]}</h3>
        <h4 className="user-name">{participant?.user.name}</h4>
      </div>
    </>
  );
};

export default User;
