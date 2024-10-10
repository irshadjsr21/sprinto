"use client";

import { List, Typography, Flex, Card, Tag, Button, Input } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { GET_AUTHORS } from "../_graphql";
import { AddOrEditAuthor, PageError, PageLoader } from "../_components";
import { formatDate } from "../_utils";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";

interface PaginationParams {
  page: number;
  pageSize: number;
}

export const AuthorList: React.FC = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 1,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { loading, error, data, refetch } = useQuery(GET_AUTHORS, {
    variables: pagination,
  });

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };

  const onClick = (id?: string | null) => {
    if (!id) return;
    router.push(`/authors/single?id=${id}`);
  };

  const onBack = () => {
    router.back();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      refetch({ name: value, ...pagination });
    }, 500),
    [pagination]
  );

  if (loading) return <PageLoader />;

  if (error) return <PageError message="Error loading authors" />;

  return (
    <Flex vertical>
      <Flex justify="space-between" style={{ marginBottom: "16px" }}>
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
        />
        <AddOrEditAuthor onComplete={refetch} />
      </Flex>
      <Flex justify="center" style={{ marginBottom: "16px" }}>
        <Typography.Title level={2}>Authors</Typography.Title>
      </Flex>
      <Flex justify="center" style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search authors"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </Flex>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={data?.authors ?? []}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: data?.totalAuthors ?? 0,
          onChange: handlePageChange,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} authors`,
          pageSizeOptions: ["8", "16", "24", "32"],
          position: "bottom",
          align: "center",
        }}
        renderItem={(author) => (
          <List.Item onClick={() => onClick(author?.id)}>
            <Card
              hoverable
              title={
                <Typography.Title level={4}>
                  <UserOutlined style={{ marginRight: 8 }} />
                  {author?.name}
                </Typography.Title>
              }
            >
              <div>
                <CalendarOutlined style={{ marginRight: 8 }} />
                <Tag color="blue">{formatDate(author?.bornDate)}</Tag>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Flex>
  );
};
