import React from "react";
import Groups from "../Components/Groups";
import CreateGroup from "../Components/Modal/CreateGroup";

export default function HomePage() {
  const [showCreateGroupModal, setShowCreateGroupModal] = React.useState(false);

  return (
    <div className="home-page">
      <div className="home-page-header">
        <h1>Groups</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateGroupModal(true)}
        >
          Create
        </button>
      </div>
      <Groups />
      <CreateGroup
        show={showCreateGroupModal}
        setShow={setShowCreateGroupModal}
      />
    </div>
  );
}
