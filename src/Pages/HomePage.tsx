import React, { useState } from "react";
import Groups from "../Components/Groups";
import CreateGroup from "../Components/Modal/CreateGroup";
import { Button, Dialog, Flex } from "@radix-ui/themes";

const HomePage = () => {
  const [showCreateGroupModal, setShowCreateGroupModal] =
    useState<boolean>(false);

  return (
    <div className="home-page">
      <Flex justify="between" align="center">
        <h1>Groups</h1>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button
              radius="full"
              size={"3"}
              color="blue"
              variant="solid"
              // className="btn"
              // onClick={() => setShowCreateGroupModal(true)}
            >
              Create
            </Button>
          </Dialog.Trigger>
          <CreateGroup />
        </Dialog.Root>
      </Flex>
      <Groups />
    </div>
  );
};

export default HomePage;
