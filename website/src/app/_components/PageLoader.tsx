import { Flex, Spin } from "antd";

export const PageLoader = () => {
  return (
    <Flex justify="center" style={{ paddingTop: "80px" }}>
      <Spin size="large" />
    </Flex>
  );
};
