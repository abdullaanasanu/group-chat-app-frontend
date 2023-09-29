import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { useSelector } from "react-redux";

const GroupInfo = () => {
  const { groupInfo: group, participantsList: participants } = useSelector(
    (state: any) => state.chat
  );

  return (
    <Flex justify="between" align="center" className="group-info">
      <Heading size="5" as="h3">
        {group?.name}
      </Heading>
      <Text size="3" >
        {participants.length} Online Users
      </Text>
    </Flex>
  );
};

export default GroupInfo;
