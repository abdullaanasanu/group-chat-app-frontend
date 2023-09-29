import { Avatar, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface IUserProps {
  participant: IChatParticipant | { user: any };
}

const User = ({ participant }: IUserProps) => {
  return (
    <>
      <Card >
        <Flex justify="start" align="center" gap="3" className="user">
          <Avatar
            fallback={participant?.user.name[0]}
            color="indigo"
            variant="solid"
            radius="full"
          />
          {/* <h3 className="user-avatar">{participant?.user.name[0]}</h3> */}
          {/* <h4 className="user-name">{participant?.user.name}</h4> */}
          <Text size="4" weight="bold" trim="end" as="div">
            {participant?.user.name}
          </Text>
        </Flex>
      </Card>
    </>
  );
};

export default User;
