"use client";

import { List, Card, Typography, Flex } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_REVIEWS } from "../_graphql";
import { PageLoader } from "./PageLoader";
import { PageError } from "./PageError";
import { AddReview } from "./Modals";

interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface ReviewsListProps {
  bookId: string;
}

export const ReviewList: React.FC<ReviewsListProps> = ({ bookId }) => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 1,
  });

  const { loading, error, data, refetch } = useQuery(GET_REVIEWS, {
    variables: { ...pagination, bookId },
  });

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };

  if (loading) return <PageLoader />;

  if (error) return <PageError message="Error loading books" />;

  return (
    <Flex vertical>
      <Flex justify="end" style={{ marginBottom: "16px" }}>
        <AddReview onComplete={refetch} bookId={bookId} />
      </Flex>
      <Flex justify="center" style={{ marginBottom: "16px" }}>
        <Typography.Title level={2}>Reviews</Typography.Title>
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
        dataSource={data?.reviews ?? []}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: data?.totalReviews ?? 0,
          onChange: handlePageChange,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} reviews`,
          pageSizeOptions: ["8", "16", "24", "32"],
          position: "bottom",
          align: "center",
        }}
        renderItem={(review) => (
          <List.Item>
            <Card
              hoverable
              title={
                <Typography.Title level={4}>
                  <Flex justify="space-between" align="center">
                    <div style={{ marginRight: 8 }}>
                      {new Array(review.rating ?? 0).fill(0).map((_, i) => (
                        <StarFilled key={`${review.id}-${i}`} />
                      ))}
                    </div>
                    {review.rating}/5
                  </Flex>
                </Typography.Title>
              }
            >
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                {review.comment}
              </Typography.Paragraph>
            </Card>
          </List.Item>
        )}
      />
    </Flex>
  );
};
