"use client";

import React, { FC, useEffect, useState } from "react";
import { Menu, Layout, Button, Drawer, Flex } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useRouter, usePathname } from "next/navigation";

const { Header, Content } = Layout;

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "/api/graphql"
      : process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
});

export interface MainLayoutProps {
  children: React.ReactNode;
}

const pathToMenuKeyMap: Record<string, string | undefined> = {
  "/": "home",
  "/authors": "authors",
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const path = usePathname();

  const [selectedItem, setSelectedItem] = useState(pathToMenuKeyMap[path]);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSelectedItem(pathToMenuKeyMap[path]);
  }, [path]);

  const isMobile = windowWidth < 768;

  const menuItems: MenuProps["items"] = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => {
        router.push("/");
        setSelectedItem("home");
      },
    },
    {
      key: "authors",
      icon: <UserOutlined />,
      label: "Authors",
      onClick: () => {
        router.push("/authors");
        setSelectedItem("authors");
      },
    },
  ];

  const showMobileMenu = () => {
    setMobileMenuVisible(true);
  };

  const onCloseMobileMenu = () => {
    setMobileMenuVisible(false);
  };

  const onBack = () => {
    router.back();
  };

  return (
    <ApolloProvider client={client}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isMobile ? "0 16px" : "0 50px",
          }}
        >
          <div
            className="logo"
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Books
          </div>

          {isMobile ? (
            <>
              <Button
                type="primary"
                icon={<MenuOutlined />}
                onClick={showMobileMenu}
                style={{ backgroundColor: "transparent", border: "none" }}
              />
              <Drawer
                title="Menu"
                placement="right"
                onClose={onCloseMobileMenu}
                open={mobileMenuVisible}
              >
                <Menu
                  theme="light"
                  mode="vertical"
                  items={menuItems}
                  selectedKeys={selectedItem ? [selectedItem] : []}
                  style={{ borderRight: "none" }}
                />
              </Drawer>
            </>
          ) : (
            <>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <Menu
                  theme="dark"
                  mode="horizontal"
                  items={menuItems}
                  selectedKeys={selectedItem ? [selectedItem] : []}
                  style={{ flex: 1, justifyContent: "center" }}
                />
              </div>
            </>
          )}
        </Header>
        <Content style={{ padding: "12px 48px", height: "100%" }}>
          {selectedItem !== "home" && (
            <Flex style={{ marginBottom: "16px" }}>
              <Button
                type="primary"
                shape="circle"
                icon={<ArrowLeftOutlined />}
                onClick={onBack}
              />
            </Flex>
          )}
          {children}
        </Content>
      </Layout>
    </ApolloProvider>
  );
};
