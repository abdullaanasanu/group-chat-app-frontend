import React from "react";
import formatDateFromTimestamp from "../../../../Utils/Time";
import { Card, Flex, Text } from "@radix-ui/themes";

interface ISendMessageProps {
  message: IChatMessage;
}

const SendMessage = ({ message }: ISendMessageProps) => {
  return (
    <div className="chat-message send">
      <Flex justify="end" align="start" gap="3">
        <Card color="blue" className="send-card" variant="surface">
          <Text size="3" as="p" className="message-text">
            {message.message}
          </Text>
          <Text size="1" trim="end" weight="light" className="time">
            {formatDateFromTimestamp(message.createdAt)}
          </Text>
        </Card>
      </Flex>
    </div>
  );
};

export default SendMessage;
