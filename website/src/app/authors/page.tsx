"use client";

import { Spin, List, Typography, Flex, Card, Tag } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_AUTHORS } from "../_graphql";
import { AddAuthor, MainLayout } from "../_components";

interface PaginationParams {
  page: number;
  pageSize: number;
}

const HomePage: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 1,
  });

  const { loading, error, data, refetch } = useQuery(GET_AUTHORS, {
    variables: pagination,
  });

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };

  if (loading)
    return (
      <Flex justify="center" style={{ paddingTop: "80px" }}>
        <Spin size="large" />
      </Flex>
    );

  if (error)
    return (
      <Flex justify="center" style={{ paddingTop: "80px" }}>
        <Typography.Text type="danger">Error loading books</Typography.Text>
      </Flex>
    );

  return (
    <Flex vertical>
      <Flex justify="end" style={{ marginBottom: "16px" }}>
        <AddAuthor onComplete={refetch} />
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
          <List.Item>
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
                <Tag color="blue">{author?.bornDate}</Tag>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Flex>
  );
};

const HomePageComponent: React.FC = () => (
  <MainLayout>
    <HomePage />
  </MainLayout>
);

export default HomePageComponent;
