import { Flex, Typography } from "antd";

export interface PageErrorProps {
  message?: string;
}

export const PageError: React.FC<PageErrorProps> = ({ message }) => {
  return (
    <Flex justify="center" style={{ paddingTop: "80px" }}>
      <Typography.Text type="danger">
        {message ?? "Some internal error occurred"}
      </Typography.Text>
    </Flex>
  );
};
