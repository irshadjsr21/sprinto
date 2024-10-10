"use client";

import { List, Card, Tag, Typography, Flex, Button, Input } from "antd";
import {
  BookOutlined,
  UserOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { GET_BOOKS } from "../_graphql";
import { AddOrEditBook } from "./Modals";
import { PageError } from "./PageError";
import { PageLoader } from "./PageLoader";
import { formatDate } from "../_utils";
import debounce from "lodash/debounce";

interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface BookListProps {
  authorId?: string;
  noBack?: boolean;
}

export const BookList: React.FC<BookListProps> = ({ authorId, noBack }) => {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 1,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { loading, error, data, refetch } = useQuery(GET_BOOKS, {
    variables: authorId
      ? {
          authorId,
          ...pagination,
        }
      : pagination,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      refetch({ title: value, ...pagination, authorId });
    }, 500),
    [pagination, authorId]
  );

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };

  const onClick = (id?: string) => {
    if (!id) return;

    router.push(`/books/single?id=${id}`);
  };

  const onBack = () => {
    router.back();
  };

  if (loading) return <PageLoader />;

  if (error) return <PageError message="Error loading books" />;

  return (
    <Flex vertical>
      {!noBack && (
        <Flex justify="space-between" style={{ marginBottom: "16px" }}>
          <Button
            type="primary"
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
          />
          <AddOrEditBook onComplete={refetch} />
        </Flex>
      )}
      {noBack && (
        <Flex justify="end">
          <AddOrEditBook onComplete={refetch} />
        </Flex>
      )}
      <Flex justify="center">
        <Typography.Title level={2}>Books</Typography.Title>
      </Flex>
      <Flex justify="center" style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search books"
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
          <List.Item onClick={() => onClick(book.id ?? undefined)}>
            <Card
              hoverable
              title={
                <Typography.Title level={4}>
                  <BookOutlined style={{ marginRight: 8 }} />
                  {book.title}
                </Typography.Title>
              }
            >
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                {book.description}
              </Typography.Paragraph>
              <div style={{ marginBottom: 12 }}>
                <UserOutlined style={{ marginRight: 8 }} />
                <Typography.Text strong>{book.author?.name}</Typography.Text>
              </div>
              <div>
                <CalendarOutlined style={{ marginRight: 8 }} />
                <Tag color="blue">{formatDate(book.publishedDate)}</Tag>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Flex>
  );
};
