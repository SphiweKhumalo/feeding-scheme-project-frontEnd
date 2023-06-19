import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Layout, Menu, theme, Image, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useGet } from 'restful-react';
import styles from './styles.module.css';
import Meta from 'antd/es/card/Meta';
import { useMenu } from '../../Providers/Menu';
import MenuDropdown from '../../components/IngredientsList/ingredient';
import { DeleteOutlined } from '@ant-design/icons';
import { IMenuIngredient, MenuIngredientActionContext } from '../../Providers/MenuIngredients/context';
import { useMenuIngredient } from '../../Providers/MenuIngredients/index[id]';

const { Header, Content, Footer } = Layout;
const { Item } = Menu;

interface Ingredient {
  id: number;
  name: string;
  Group: string;
}

const MenuIngredient: React.FC = () => {
  const { menusAction, MenuState } = useMenu();
  const [filteredMenuIngredients, setFilteredMenuIngredients] = useState<Ingredient[]>([]);
  const { menuIngredientAction, MenuIngredientState, createMenuIngredient } = useMenuIngredient();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    menuIngredientAction('d592360f-f7e5-45c3-df00-08db6b3741f1');
  }, []);

  useEffect(() => {
    setFilteredMenuIngredients(MenuIngredientState);
    console.log('menu state', MenuState);
    console.log('filtered menu Ingredient state', filteredMenuIngredients);
  }, [MenuIngredientState]);

  var filteredMenu = MenuState.find((a) => a.id == id);

  const handleDeleteClick = (id) => {
    console.log('id is', id);
    message.success('dummy Delete Clicked with id: ' + id);
  };

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Item key="1">nav 1</Item>
          <Item key="2"><Button type = 'primary'onClick={()=>router.push(`/StudentsAllergic/${id}`)}>View Allergic Students</Button></Item>
        </Menu>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Content className={styles.ContentContainer}>
        <div className={styles.divLeft}>
          <h1 className={styles.h1}>{filteredMenu?.name}</h1>
          <Image className={styles.imageContainer} src={filteredMenu?.imageUrl} />
        </div>
        <div className={styles.divRight}>
          <MenuDropdown recvievedMenuId={id} />
          {filteredMenuIngredients?.map((a, index) => (
            <Card
              key={index}
              hoverable
              className={styles.MenuContainer}
              cover={<img alt="example" src={null} />}
            >
              <Meta title={a?.name} description={a?.Group} />
              <span onClick={() => handleDeleteClick(a.id)}>
                <DeleteOutlined />
              </span>
            </Card>
          ))}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default MenuIngredient;
