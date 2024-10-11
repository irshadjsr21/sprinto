import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { FormBuilder, FormBuilderRef, FormField } from "../FormBuilder";
import { useMutation } from "@apollo/client";
import { ADD_AUTHOR, GET_AUTHORS, UPDATE_AUTHOR } from "@/app/_graphql";
import dayjs from "dayjs";

const formDetails: FormField[] = [
  {
    type: "text",
    name: "name",
    label: "Name",
    placeholder: "Enter author name",
    rules: [{ required: true, message: "Name is required!" }],
  },
  {
    type: "textarea",
    name: "biography",
    label: "Biography",
    placeholder: "Enter author biography",
  },
  {
    type: "date",
    name: "bornDate",
    label: "Born Date",
  },
];

export interface AddOrEditAuthorProps {
  onComplete: () => void;
  author?: {
    id?: string | null;
    name?: string | null;
    biography?: string | null;
    bornDate?: string | null;
  };
}

export const AddOrEditAuthor: React.FC<AddOrEditAuthorProps> = ({
  onComplete,
  author,
}) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<FormBuilderRef>(null);

  const [mutateFunction, { data, loading, error }] = useMutation(
    author ? UPDATE_AUTHOR : ADD_AUTHOR,
    {
      refetchQueries: [GET_AUTHORS],
    }
  );

  const showModal = () => {
    formRef.current?.reset();
    setOpen(true);
  };

  const handleOk = (values: any) => {
    const variables = {
      ...values,
      bornDate: values.bornDate?.toISOString(),
    };

    if (author) {
      mutateFunction({ variables: { id: author.id, ...variables } });
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
      {!author && (
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Author
        </Button>
      )}
      {author && (
        <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
          Edit
        </Button>
      )}
      <Modal
        title={author ? "Edit Author" : "Add Author"}
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
            author
              ? {
                  ...author,
                  bornDate: author.bornDate ? dayjs(parseInt(author.bornDate)) : null,
                }
              : {}
          }
        />
        {error && <p>{error.message}</p>}
      </Modal>
    </>
  );
};
