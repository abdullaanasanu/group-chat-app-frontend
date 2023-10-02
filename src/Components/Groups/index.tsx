import React, { useEffect, useState } from "react";
import GroupItem from "./GroupItem";
import axios from "axios";
import { useUser } from "../../Contexts/userContext";
import { useDispatch, useSelector } from "react-redux";
import { setGroupList } from "../../Redux/group/groupSlice";
import { Button, Flex, Grid } from "@radix-ui/themes";
import { useRecoilState } from "recoil";
import { groupListState, totalGroupState } from "../../Recoil/atoms/group";
import { set } from "react-hook-form";
import Pagination from "rc-pagination";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import GroupPagination from "./GroupPagination";

const listSize = 4;

const Groups = () => {
  // const groups = useSelector((state: any) => state.group.groupList);
  // const dispatch = useDispatch();
  const [groups, setGroups] = useRecoilState(groupListState);
  const [totalGroups, setTotalGroups] = useRecoilState(totalGroupState);
  const { token } = useUser();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchGroups();
  }, [page]);

  const fetchGroups = async () => {
    try {
      setGroups([]);
      const skip = (page - 1) * listSize;
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/group",
        {
          params: {
            skip,
            limit: listSize,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      // dispatch(setGroupList(response.data.groups));
      setGroups(response.data.groups);
      setTotalGroups(response.data.totalGroups);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    console.log(page);
    setPage(page);
  };

  return (
    <>
      <Grid
        columns={{
          initial: "1",
          xs: "2",
          sm: "3",
          md: "3",
          lg: "4",
        }}
        gap="3"
      >
        {groups.map((group: IGroupItem) => (
          <GroupItem key={group._id} group={group} />
        ))}
      </Grid>
      <GroupPagination
        page={page}
        totalGroups={totalGroups}
        listSize={listSize}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Groups;
