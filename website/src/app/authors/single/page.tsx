"use client";

import React, { Suspense } from "react";
import { useQuery } from "@apollo/client";
import { Button, Card, Descriptions, Flex, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  AddOrEditAuthor,
  BookList,
  MainLayout,
  PageError,
  PageLoader,
} from "@/app/_components";
import { formatDate } from "@/app/_utils";
import { GET_AUTHOR_QUERY } from "@/app/_graphql";
import { DeleteAuthor } from "@/app/_components/Modals/DeleteAuthor";

const AuthorDetails: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { loading, error, data, refetch } = useQuery(GET_AUTHOR_QUERY, {
    variables: { id: params.get("id") ?? "" },
  });

  const onDelete = () => {
    router.push("/authors");
  };

  const onBack = () => {
    router.back();
  };

  if (loading) return <PageLoader />;

  if (error) return <PageError message="Error loading author details" />;

  const author = data?.authors?.[0];
  if (!author) return <PageError message="Author not found" />;

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
        <Typography.Title level={2}>Author Details</Typography.Title>
      </Flex>
      <Card
        title={author.name}
        bordered={true}
        style={{ marginBottom: "16px" }}
        actions={[
          <AddOrEditAuthor key="edit" author={author} onComplete={refetch} />,
          <DeleteAuthor
            key="delete"
            id={author.id ?? ""}
            onComplete={onDelete}
          />,
        ]}
      >
        <Descriptions
          title="Author Details"
          items={[
            {
              key: "name",
              label: "Name",
              children: author.name,
            },
            {
              key: "biography",
              label: "Biography",
              children: author.biography,
            },
            {
              key: "bornDate",
              label: "Born Date",
              children: formatDate(author.bornDate),
            },
          ]}
        />
      </Card>
      <BookList authorId={author.id ?? ""} noBack />
    </>
  );
};

const AuthorDetailsComponent: React.FC = () => (
  <MainLayout>
    <Suspense>
      <AuthorDetails />
    </Suspense>
  </MainLayout>
);

export default AuthorDetailsComponent;
