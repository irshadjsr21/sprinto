import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { DELETE_AUTHOR, GET_AUTHORS } from "@/app/_graphql";

export interface DeleteAuthorProps {
  id: string;
  onComplete: () => void;
}

export const DeleteAuthor: React.FC<DeleteAuthorProps> = ({
  onComplete,
  id,
}) => {
  const [open, setOpen] = useState(false);

  const [mutateFunction, { data, loading, error }] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [GET_AUTHORS],
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    mutateFunction({
      variables: {
        id,
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
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        onClick={showModal}
      >
        Delete
      </Button>
      <Modal
        title="Delete Author"
        open={open}
        onOk={handleOk}
        okButtonProps={{ danger: true }}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <Typography.Text>
          Are you sure you want to delete this author?
        </Typography.Text>
        {error && <p>{error.message}</p>}
      </Modal>
    </>
  );
};
