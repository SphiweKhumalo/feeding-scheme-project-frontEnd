import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './MyLayout.module.css';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = {
  key: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  path: string;
};

const items: MenuItem[] = [
  {
    key: "Menu",
    title: "Menu",
    icon: <HomeOutlined />,
    path: "/Menu",
  },
    {
    key: "DayMenu",
    title: "Day Menu",
    icon: <MessageOutlined />,
    path: "/DayMenu",
  },

  {
    key: "StockManagement",
    title: "StockManagement",
    icon: <MessageOutlined />,
    path: "/StockManagement",
  },
  {
    key: "Students",
    title: "Students",
    icon: <SettingOutlined />,
    path: "/StudentManagement",
  },
];

const MyLayout: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleDayMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline">
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleDayMenuClick(item.path)}
            >
              <Link href={item.path}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: 'gray' }} /> */}
        {/* <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: 'gray' }}>
            {children}
          </div>
        </Content> */}
        {children}
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
