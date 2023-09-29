import { Card, Text } from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";

interface GroupItemProps {
  group: IGroupItem;
}

const GroupItem = ({ group }: GroupItemProps) => {
  return (
    <Link to={"/group/" + group?._id}>
      <Card className="group-card" variant="classic">
        <Text size="5" weight="bold" trim="end" as="div" className="title">
          {group?.name}
        </Text>
        {/* <h3>{group?.name}</h3> */}
        <Text size="3" trim="end" color="gray">
          {group?.totalParticipants} Online Users
        </Text>
        {/* <p>{group?.totalParticipants} Online Users</p> */}
      </Card>
    </Link>
  );
};

export default GroupItem;
