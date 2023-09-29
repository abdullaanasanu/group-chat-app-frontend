import React from "react";
import formatDateFromTimestamp from "../../../../Utils/Time";
import { Avatar, Card, Flex, Text } from "@radix-ui/themes";

interface IRecievedMessageProps {
  message: IChatMessage;
}

const RecievedMessage = ({ message }: IRecievedMessageProps) => {
  return (
    <Flex justify="start" align="start" gap={{
      initial: "1",
      sm: "3",
    }} className="chat-message">
      <Avatar
        fallback={message.user.name[0]}
        color="indigo"
        variant="solid"
        radius="full"
      />
      <Card className="chat-message-card">
        <Flex justify="between" align="center" gap={{
          initial: "1",
          sm: "3",
        }}>
          <Text size="1" weight="medium" color="gray" trim="end" as="div">
            {message.user.name}
          </Text>
          <Text size="1" trim="end" weight="light" color="gray">
            {formatDateFromTimestamp(message.createdAt)}
          </Text>
        </Flex>
        <Text size="3" as="p" className="message-text">
          {message.message}
        </Text>
      </Card>
    </Flex>
  );
};

export default RecievedMessage;
