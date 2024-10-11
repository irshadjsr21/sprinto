import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { DELETE_BOOK, GET_BOOK_QUERY, GET_BOOKS } from "@/app/_graphql";

export interface DeleteBookProps {
  id: string;
  onComplete: () => void;
}

export const DeleteBook: React.FC<DeleteBookProps> = ({ onComplete, id }) => {
  const [open, setOpen] = useState(false);

  const [mutateFunction, { data, loading, error }] = useMutation(DELETE_BOOK, {
    refetchQueries: [GET_BOOKS, GET_BOOK_QUERY],
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
        title="Delete Book"
        open={open}
        onOk={handleOk}
        okButtonProps={{ danger: true }}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <Typography.Text>
          Are you sure you want to delete this book?
        </Typography.Text>
        {error && <p>{error.message}</p>}
      </Modal>
    </>
  );
};
