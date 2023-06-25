import React, { useState, useEffect } from 'react';
import { Button, Drawer, Card, Row, Col } from 'antd';
import styles from './styles.module.css';
import { useMenu } from '../../Providers/Menu';
import { IMenu } from '../../Providers/Menu/context';
import { MenuActionEnum } from '../../Providers/Menu/action';
import router from 'next/router';
// import { getMenuData } from './api'; //use this to put api fetches in another folder

const MenuDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState<IMenu[]>();
  const [trigger, setTrigger] = useState<IMenu[]>();
   const{menusAction,MenuState}=useMenu();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    menusAction();
  }, []);
  
  useEffect(() => {
    if (MenuState.length > 0) {
      setMenuData(MenuState.filter(a => a.type == 1 ));
      console.log('mD', MenuState);
      setTrigger(MenuState);   
    }
  }, [MenuState]);

const handleMenuClick = (id:string) =>
{
  router.push(`/MenuIngredient/${id}`);
}
  console.log('alternate', menuData);
  
  
 console.log('menu state',MenuState);
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer className={styles.ContainerStyle} style={{backgroundColor:'rgb(224, 112, 46)'}}title="Alternative Menus" placement="right" onClose={onClose} visible={open}>
        <Row gutter={[16, 16]}>
          {menuData?.map((menu) => (
            <Col span={12} key={menu.id}>
              <Card style={{backgroundColor: 'rgb(36, 41, 70),',color: 'whitesmoke',fontWeight: 'bold' }} hoverable cover={<img alt="menu" src={menu.imageUrl} />} onClick={() => handleMenuClick(menu.id)}>
                <Card.Meta title={menu.name} description={`Serving Time: ${menu.servingTime}`} />
              </Card>
            </Col>
          ))}
        </Row>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
