"use client";

import React, { Suspense } from "react";
import { useQuery } from "@apollo/client";
import { Card } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AddOrEditAuthor,
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

  if (loading) return <PageLoader />;

  if (error) return <PageError message="Error loading author details" />;

  const author = data?.authors?.[0];
  if (!author) return <PageError message="Author not found" />;

  return (
    <Card
      title={author.name}
      bordered={true}
      actions={[
        <AddOrEditAuthor key="edit" author={author} onComplete={refetch} />,
        <DeleteAuthor
          key="delete"
          id={author.id ?? ""}
          onComplete={onDelete}
        />,
      ]}
    >
      <p>
        <strong>Biography:</strong> {author?.biography}
      </p>
      <p>
        <strong>Born Date:</strong> {formatDate(author?.bornDate)}
      </p>
    </Card>
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
