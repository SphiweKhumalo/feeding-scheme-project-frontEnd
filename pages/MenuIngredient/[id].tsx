import React from 'react';
import { Breadcrumb, Card, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';
import { useGet } from 'restful-react';
import styles from './styles.module.css';
import Meta from 'antd/es/card/Meta';
const { Header, Content, Footer } = Layout;
const { Item} = Menu;

interface Ingredient 
{
    id : number;
    name: string;
    Group: string;

}
const MenuIngredient: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    // fetch
    const { data: menuIngredientResult ,loading} = useGet({
        path: `MenuService/GetMenuWithIngredientsById?menuId=${id}`,
      });
    
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  var menuIngredientList : Ingredient[];
  if(loading)
  {
    return (<p>loading..</p>)
  }else{
    menuIngredientList = menuIngredientResult.result;
    console.log('data',menuIngredientResult.result)
  }

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
    >
      <Item key="1">nav 1</Item>
    </Menu>

      </Header>
      
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <h1>mewnu name</h1>
        {menuIngredientList?.map((a,index) => 
      
      <Card  hoverable
       className={styles.MenuContainer}
       cover={<img alt="example" src= {null} />}
       key={index}
       onClick={() => (a.id)}
      >
       <Meta title={a.name} description={a.id}/>
       </Card>
        )}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default MenuIngredient;