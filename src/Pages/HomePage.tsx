import React, { useState } from "react";
import Groups from "../Components/Groups";
import CreateGroup from "../Components/Modal/CreateGroup";

const HomePage = () => {
  const [showCreateGroupModal, setShowCreateGroupModal] =
    useState<boolean>(false);

  return (
    <div className="home-page">
      <div className="home-page-header">
        <h1>Groups</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateGroupModal(true)}
          type="button"
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
};

export default HomePage;
