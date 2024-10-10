"use client";

import { Spin, List, Card, Tag, Typography, Flex } from "antd";
import {
  BookOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { AddBook, MainLayout } from "./_components";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_BOOKS } from "./_graphql";

interface PaginationParams {
  page: number;
  pageSize: number;
}

const HomePage: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 1,
  });

  const { loading, error, data, refetch } = useQuery(GET_BOOKS, {
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
        <AddBook onComplete={refetch} />
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
        dataSource={data?.books ?? []}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: data?.totalBooks ?? 0,
          onChange: handlePageChange,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} books`,
          pageSizeOptions: ["8", "16", "24", "32"],
          position: "bottom",
          align: "center",
        }}
        renderItem={(book) => (
          <List.Item>
            <Card
              hoverable
              title={
                <Typography.Title level={4}>
                  <BookOutlined style={{ marginRight: 8 }} />
                  {book?.title}
                </Typography.Title>
              }
            >
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                {book?.description}
              </Typography.Paragraph>
              <div style={{ marginBottom: 12 }}>
                <UserOutlined style={{ marginRight: 8 }} />
                <Typography.Text strong>{book?.author?.name}</Typography.Text>
              </div>
              <div>
                <CalendarOutlined style={{ marginRight: 8 }} />
                <Tag color="blue">{book?.publishedDate}</Tag>
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
