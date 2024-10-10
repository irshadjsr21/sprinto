import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormBuilder, FormBuilderRef, FormField } from "../FormBuilder";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK, GET_AUTHORS } from "@/app/_graphql";

export interface AddBookProps {
  onComplete: () => void;
}

export const AddBook: React.FC<AddBookProps> = ({ onComplete }) => {
  const [open, setOpen] = useState(false);
  const formRef = React.createRef<FormBuilderRef>();

  const [mutateFunction, { data, loading, error }] = useMutation(ADD_BOOK);
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
    mutateFunction({
      variables: {
        ...values,
        publishedDate: values.publishedDate?.toISOString(),
      },
    });
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
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Book
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={() => formRef.current?.submit()}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <FormBuilder
          ref={formRef}
          formDetails={formDetails}
          onSubmit={handleOk}
        />
        {error && <p>{error.message}</p>}
      </Modal>
    </>
  );
};
