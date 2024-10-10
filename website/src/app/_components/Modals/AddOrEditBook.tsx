import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { FormBuilder, FormBuilderRef, FormField } from "../FormBuilder";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK, UPDATE_BOOK, GET_AUTHORS, GET_BOOKS } from "@/app/_graphql";
import dayjs from "dayjs";

export interface AddOrEditBookProps {
  onComplete: () => void;
  book?: {
    id?: string | null;
    title?: string | null;
    description?: string | null;
    publishedDate?: string | null;
    authorId?: string | null;
  };
}

export const AddOrEditBook: React.FC<AddOrEditBookProps> = ({
  onComplete,
  book,
}) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<FormBuilderRef>(null);

  const [mutateFunction, { data, loading, error }] = useMutation(
    book ? UPDATE_BOOK : ADD_BOOK,
    {
      refetchQueries: [GET_BOOKS],
    }
  );

  const { data: authorsData } = useQuery(GET_AUTHORS, {
    variables: {
      page: 1,
      pageSize: 10000,
    },
  });

  const formDetails: FormField[] = useMemo(
    () => [
      {
        type: "text",
        name: "title",
        label: "Title",
        placeholder: "Enter book title",
        rules: [{ required: true, message: "Title is required!" }],
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        placeholder: "Enter book description",
      },
      {
        type: "date",
        name: "publishedDate",
        label: "Published Date",
      },
      {
        type: "dropdown",
        name: "authorId",
        label: "Author",
        options: authorsData?.authors?.map((author) => ({
          label: author?.name ?? "",
          value: author?.id ?? "",
        })),
      },
    ],
    [authorsData]
  );

  const showModal = () => {
    formRef.current?.reset();
    setOpen(true);
  };

  const handleOk = (values: any) => {
    const variables = {
      ...values,
      publishedDate: values.publishedDate?.toISOString(),
    };

    if (book) {
      mutateFunction({ variables: { id: book.id, ...variables } });
    } else {
      mutateFunction({ variables });
    }
  };

  useEffect(() => {
    if (data) {
      onComplete();
      setOpen(false);
    }
  }, [data, onComplete]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {!book && (
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Book
        </Button>
      )}
      {book && (
        <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
          Edit
        </Button>
      )}
      <Modal
        title={book ? "Edit Book" : "Add Book"}
        open={open}
        onOk={() => formRef.current?.submit()}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <FormBuilder
          ref={formRef}
          formDetails={formDetails}
          onSubmit={handleOk}
          initialValues={
            book
              ? {
                  ...book,
                  publishedDate: book.publishedDate
                    ? dayjs(parseInt(book.publishedDate))
                    : undefined,
                }
              : {}
          }
        />
        {error && <p>{error.message}</p>}
      </Modal>
    </>
  );
};
