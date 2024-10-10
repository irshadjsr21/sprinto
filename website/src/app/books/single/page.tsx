"use client";

import React, {Suspense} from "react";
import { useQuery } from "@apollo/client";
import { Card } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AddOrEditBook,
  MainLayout,
  PageError,
  PageLoader,
} from "@/app/_components";
import { formatDate } from "@/app/_utils";
import { GET_BOOK_QUERY } from "@/app/_graphql";
import { DeleteBook } from "@/app/_components/Modals/DeleteBook";

const BookDetails: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { loading, error, data, refetch } = useQuery(GET_BOOK_QUERY, {
    variables: { id: params.get("id") ?? "" },
  });

  const onDelete = () => {
    router.push("/");
  };

  if (loading) return <PageLoader />;

  if (error) return <PageError message="Error loading book details" />;

  const book = data?.books?.[0];
  if (!book) return <PageError message="Book not found" />;

  return (
    <Card
      title={book.title}
      bordered={true}
      actions={[
        <AddOrEditBook key="edit" book={book} onComplete={refetch} />,
        <DeleteBook key="delete" id={book.id ?? ""} onComplete={onDelete} />,
      ]}
    >
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Published Date:</strong> {formatDate(book.publishedDate)}
      </p>
      <p>
        <strong>Author Name:</strong> {book.author?.name}
      </p>
      <p>
        <strong>Author Biography:</strong> {book.author?.biography}
      </p>
      <p>
        <strong>Author Born Date:</strong> {formatDate(book.author?.bornDate)}
      </p>
    </Card>
  );
};

const BookDetailsComponent: React.FC = () => (
  <MainLayout>
    <Suspense>
      <BookDetails />
    </Suspense>
  </MainLayout>
);

export default BookDetailsComponent;
