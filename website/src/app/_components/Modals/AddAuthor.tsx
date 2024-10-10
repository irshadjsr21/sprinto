import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormBuilder, FormBuilderRef, FormField } from "../FormBuilder";
import { useMutation } from "@apollo/client";
import { ADD_AUTHOR } from "@/app/_graphql";

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

export interface AddAuthorProps {
  onComplete: () => void;
}

export const AddAuthor: React.FC<AddAuthorProps> = ({ onComplete }) => {
  const [open, setOpen] = useState(false);
  const formRef = React.createRef<FormBuilderRef>();

  const [mutateFunction, { data, loading, error }] = useMutation(ADD_AUTHOR);

  const showModal = () => {
    formRef.current?.reset();
    setOpen(true);
  };

  const handleOk = (values: any) => {
    mutateFunction({
      variables: {
        ...values,
        bornDate: values.bornDate?.toISOString(),
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
        Add Author
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
