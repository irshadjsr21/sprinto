"use client";

import React, { Suspense } from "react";
import { useQuery } from "@apollo/client";
import { Button, Card, Descriptions, Flex, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AddOrEditBook,
  DeleteBook,
  MainLayout,
  PageError,
  PageLoader,
  ReviewList,
} from "@/app/_components";
import { formatDate } from "@/app/_utils";
import { GET_BOOK_QUERY } from "@/app/_graphql";
import Link from "next/link";

const BookDetails: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { loading, error, data, refetch } = useQuery(GET_BOOK_QUERY, {
    variables: { id: params.get("id") ?? "" },
  });

  const onDelete = () => {
    router.push("/");
  };

  const onBack = () => {
    router.back();
  };

  if (loading) return <PageLoader />;

  if (error) return <PageError message="Error loading book details" />;

  const book = data?.books?.[0];
  if (!book) return <PageError message="Book not found" />;

  return (
    <>
      <Flex justify="start" style={{ marginBottom: "16px" }}>
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
        />
      </Flex>
      <Flex justify="center" style={{ marginBottom: "16px" }}>
        <Typography.Title level={2}>Book Details</Typography.Title>
      </Flex>
      <Card
        title={book.title}
        bordered={true}
        style={{ marginBottom: "16px" }}
        actions={[
          <AddOrEditBook key="edit" book={book} onComplete={refetch} />,
          <DeleteBook key="delete" id={book.id ?? ""} onComplete={onDelete} />,
        ]}
      >
        <Descriptions
          title="Book Details"
          style={{ marginBottom: "16px" }}
          items={[
            {
              key: "rating",
              label: "Rating",
              children: `${(book.rating ?? 0).toFixed(2)}/5`,
            },
            {
              key: "description",
              label: "Description",
              children: book.description,
            },
            {
              key: "publishedDate",
              label: "Published Date",
              children: formatDate(book.publishedDate),
            },
          ]}
        />
        {book.author && (
          <Descriptions
            title={
              <Typography.Title level={5}>
                <Link href={`/authors/single?id=${book.author?.id ?? ""}`}>
                  Author
                </Link>
              </Typography.Title>
            }
            items={[
              {
                key: "name",
                label: "Name",
                children: book.author?.name,
              },
              {
                key: "biography",
                label: "Biography",
                children: book.author?.biography,
              },
              {
                key: "bornDate",
                label: "Born Date",
                children: formatDate(book.author?.bornDate),
              },
            ]}
          />
        )}
      </Card>
      <ReviewList bookId={book.id ?? ""} />
    </>
  );
};

const BookDetailsPage: React.FC = () => (
  <MainLayout>
    <Suspense>
      <BookDetails />
    </Suspense>
  </MainLayout>
);

export default BookDetailsPage;
