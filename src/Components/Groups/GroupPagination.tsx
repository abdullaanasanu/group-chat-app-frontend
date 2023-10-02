import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Pagination from "rc-pagination";
import React from "react";

interface IGroupPaginationProps {
  page: number;
  totalGroups: number;
  listSize: number;
  handlePageChange: (page: number) => void;
}

export default function GroupPagination({
  page,
  totalGroups,
  listSize,
  handlePageChange,
}: IGroupPaginationProps) {
  return (
    <>
      <Flex justify="center" align="center" className="loading" gap="2">
        <Pagination
          current={page}
          total={totalGroups}
          pageSize={listSize}
          itemRender={(page, type, originalElement) => {
            if (type === "page") {
              return <Button variant="surface">{page}</Button>;
            } else if (type === "prev") {
              return (
                <Button variant="surface">
                  <ArrowLeftIcon />
                </Button>
              );
            } else if (type === "next") {
              return (
                <Button variant="surface">
                  <ArrowRightIcon />
                </Button>
              );
            }
            return originalElement;
          }}
          onChange={handlePageChange}
        />
      </Flex>
    </>
  );
}
