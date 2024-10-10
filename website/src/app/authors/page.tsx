"use client";

import { List, Typography, Flex, Card, Tag } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_AUTHORS } from "../_graphql";
import { AddOrEditAuthor, MainLayout, PageError, PageLoader } from "../_components";
import { formatDate } from "../_utils";
import { useRouter } from "next/navigation";

interface PaginationParams {
  page: number;
  pageSize: number;
}

const AuthorsPage: React.FC = () => {
  const router = useRouter();
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

  const onClick = (id?: string | null) => {
    if (!id) return;
    router.push(`/authors/single?id=${id}`);
  };

  if (loading) return <PageLoader />;

  if (error) return <PageError message="Error loading authors" />;

  return (
    <Flex vertical>
      <Flex justify="end" style={{ marginBottom: "16px" }}>
        <AddOrEditAuthor onComplete={refetch} />
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

const AuthorsPageComponent: React.FC = () => (
  <MainLayout>
    <AuthorsPage />
  </MainLayout>
);

export default AuthorsPageComponent;
