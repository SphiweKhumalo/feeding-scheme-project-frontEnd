import React, { useState } from 'react';
import styles from './styles.module.css';
import { useGet } from 'restful-react';
import { useRouter } from 'next/router';
import {
  DesktopOutlined,
  FileOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme,Col, Divider, Row, Card } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

interface menu{
  id :string;
  name : string;
  imagerUrl:string;
  servingTime : string;
  type : number;
}

const items: MenuItem[] = [
  getItem('Menu Management', '1', <ClockCircleOutlined />,
  [
    getItem('View Menus','sub1'),
    getItem('Day Menu', 'sub2'),
  ]),
  getItem('Stock Management 2', '2', <DesktopOutlined />),
  getItem('User', 'sub3', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub4', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const arr = [1,2,3];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: menuListResult ,loading} = useGet({
    path: 'MenuService/GetAll',
  });

  var menuList : menu[];
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if(loading)

  {
    return (<p>loading..</p>)
  }else{
    menuList = menuListResult.result?.items;
    console.log('data',menuListResult)
  }
  
  //event methods
  const handleMenuClick = (menuId) => {
    // Navigate to the MovieDetailsPage with the movieId
    router.push(`/MenuIngredient/${menuId}`);
  };
  const handleDayMenuClick = () => {
    router.push('/DayMenu'); // Adjust the path to the desired page
  };
  

  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
  <>
    <Divider orientation="left">Menu List</Divider>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {

      menuList.map((a,index) => 
      <Card  hoverable
             className={styles.MenuContainer}
             cover={<img alt="example" src= {a.imagerUrl} />}
             key={index}
             onClick={() => handleMenuClick(a.id)}
      >
        <Meta title= 'Menu Type' description={a.type.toString()}/>
        <Meta title=  'ServingTime'description={a.servingTime.toString()}/>
     </Card>
)}
      </Row>
    </>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;