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
  HomeOutlined,
  LogoutOutlined
  
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




const MyLayout: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleDayMenuClick = (path: string) => {
    router.push(path);
  };
  const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = 'http://localhost:3000';
  };
  const items: MenuItem[] = [
    {
      key: "Menu",
      title: "Menu",
      icon: <HomeOutlined rev={undefined} />,
      path: "/Menu",
    },
    {
      key: "DayMenu",
      title: "Day Menu",
      icon: <MessageOutlined rev={undefined} />,
      path: "/DayMenu",
    },
    {
      key: "StockManagement",
      title: "Stock Management",
      icon: <MessageOutlined rev={undefined} />,
      path: "/StockManagement",
    },
    {
      key: "Students",
      title: "Students",
      icon: <SettingOutlined rev={undefined} />,
      path: "/StudentManagement",
    },
  ];

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
      <Layout style ={{height:'100%',backgroundColor:'rgb(38, 48, 68)'}}>
        {children}
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
