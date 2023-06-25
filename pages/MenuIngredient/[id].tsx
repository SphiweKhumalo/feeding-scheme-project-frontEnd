import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Image, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useGet } from 'restful-react';
import styles from './styles.module.css';
// import Meta from 'antd/es/card/Meta';
import { useMenu } from '../../Providers/Menu';
import MenuDropdown from '../../components/AddMenuIngredientsList/ingredient';
import { DeleteOutlined } from '@ant-design/icons';
import { IMenuIngredient, MenuIngredientActionContext } from '../../Providers/MenuIngredients/context';
import { useMenuIngredient } from '../../Providers/MenuIngredients';
import { Card } from 'antd';
import { useIngredient } from '../../Providers/Ingredients';
import MyLayout from '../../components/Layout';
const { Header, Content, Footer } = Layout;
const { Item } = Menu;
const { Meta } = Card;

interface Ingredient {
  id: number;
  name: string;
  Group: string;
}

const MenuIngredient: React.FC = () => {
  const { menusAction, MenuState } = useMenu();
  const [filteredMenuIngredients, setFilteredMenuIngredients] = useState<IMenuIngredient[]>([]);
  const { getMenuIngredient, MenuIngredientState, createMenuIngredient,deleteMenuIngredient,MenuIngredientDeleted } = useMenuIngredient();
   const {IngredientState,getIngredients}=useIngredient();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      getMenuIngredient(id.toString());
    }
    setFilteredMenuIngredients(MenuIngredientState);
  }, []);

  useEffect(() => {
    if (MenuIngredientState) {
      setFilteredMenuIngredients(MenuIngredientState);
    }
  }, [MenuIngredientState,MenuIngredientDeleted]);
  
  var filteredMenu = MenuState.find((a) => a.id == id);

  const handleDeleteClick = (payload) => {
    var mi :IMenuIngredient = 
    {
      ingredientId:  payload.menuIngredients?.ingredient?.id, 
      menuId:id.toString()
    }
    deleteMenuIngredient(mi?.menuId,mi?.ingredientId)
  };

  return (
    <MyLayout>
      <Content className={styles.ContentContainer}>
        <div className={styles.divLeft}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Item key="1">nav 1</Item>
          <Item key="2"><Button type = 'primary'onClick={()=>router.push(`/StudentsAllergic/${id}`)}>View Allergic Students</Button></Item>
        </Menu>
          <h1 className={styles.h1}>{filteredMenu?.name}</h1>
          <Image className={styles.imageContainer} src={filteredMenu?.imageUrl} />
        </div>
        <div className={styles.divRight}>
          <MenuDropdown receivedMenuId={id} />
          {filteredMenuIngredients?.map((a:IMenuIngredient, index) => (
            <Card
              key={index}
              hoverable
              className={styles.MenuContainer}
              cover={<img alt="example" src={null} />}
            >
              <Meta title={a?.name} description={a?.Group} />
              Quantity Per Serving: <Meta title={a?.menuIngredients?.quantityPerServing} description={a?.quantityPerServing} />
              <Meta title={a?.quantityPerServing} description={a?.quantityPerServing} />
              <span onClick={() => handleDeleteClick(a)}>
                <DeleteOutlined rev={undefined} />
              </span>
            </Card>
          ))}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </MyLayout>
  );
};

export default MenuIngredient;