import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormBuilder, FormBuilderRef, FormField } from "../FormBuilder";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW, GET_BOOK_QUERY, GET_REVIEWS } from "@/app/_graphql";

const formDetails: FormField[] = [
  {
    type: "text",
    name: "comment",
    label: "Comment",
    placeholder: "Enter comment",
    rules: [{ required: true, message: "Comment is required!" }],
  },
  {
    type: "dropdown",
    name: "rating",
    label: "Rating",
    placeholder: "Enter rating",
    options: new Array(5)
      .fill(0)
      .map((_, i) => ({ label: String(i + 1), value: i + 1 })),
    rules: [{ required: true, message: "Rating is required!" }],
  },
];

export interface AddReviewProps {
  onComplete: () => void;
  bookId: string;
}

export const AddReview: React.FC<AddReviewProps> = ({ onComplete, bookId }) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<FormBuilderRef>(null);

  const [mutateFunction, { data, loading, error }] = useMutation(ADD_REVIEW, {
    refetchQueries: [GET_REVIEWS, GET_BOOK_QUERY],
  });

  const showModal = () => {
    formRef.current?.reset();
    setOpen(true);
  };

  const handleOk = (values: any) => {
    mutateFunction({
      variables: {
        ...values,
        bookId,
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
        Add Review
      </Button>
      <Modal
        title={"Add Review"}
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
