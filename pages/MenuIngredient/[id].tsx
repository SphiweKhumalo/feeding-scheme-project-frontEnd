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
import { useMenuIngredient } from '../../Providers/MenuIngredients';

const { Header, Content, Footer } = Layout;
const { Item } = Menu;

interface Ingredient {
  id: number;
  name: string;
  Group: string;
}

const MenuIngredient: React.FC = () => {
  const { menusAction, MenuState } = useMenu();
  const [filteredMenuIngredients, setFilteredMenuIngredients] = useState<IMenuIngredient[]>([]);
  const { getMenuIngredient, MenuIngredientState, createMenuIngredient,deleteMenuIngredient,MenuIngredientDeleted } = useMenuIngredient();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getMenuIngredient(id.toString())
    console.log(filteredMenuIngredients);
    setFilteredMenuIngredients(MenuIngredientState);
  }, []);

  useEffect(() => {
   
    console.log('menu state', MenuState);
    console.log('filtered menu Ingredient state', MenuIngredientState);
  }, [MenuIngredientState]);
  useEffect(() => {
    if (MenuIngredientState) {
      setFilteredMenuIngredients(MenuIngredientState);
    }
  }, [MenuIngredientState]);
  
  console.log('filtered menu Ingredient state', MenuIngredientState);
  var filteredMenu = MenuState.find((a) => a.id == id);

  const handleDeleteClick = (payload) => {
    var mi :IMenuIngredient = 
    {
      ingredientId:  payload.id, 
      menuId:id.toString()
    }
    console.log('mi On delete', mi);
    deleteMenuIngredient(id.toString(),payload.id)
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
              <span onClick={() => handleDeleteClick(a)}>
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