import React, { useState, useEffect } from 'react';
import { Button, Drawer, Card, Row, Col } from 'antd';
import styles from './styles.module.css';
import { useMenu } from '../../Providers/Menu';
// import { getMenuData } from './api'; //use this to put api fetches in another folder

const MenuDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
   const{menusAction,MenuState}=useMenu();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchMenuData(); // Fetch 
    menusAction();
  }, []);
 console.log('menu state',MenuState);
  const fetchMenuData = async () => {
    try {
      const data = await getMenuData(); // Replace with your API function to fetch menu data
      setMenuData(data);
    } catch (error) {
      console.log('Error fetching menu data:', error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer className={styles.ContainerStyle} style={{backgroundColor:'rgb(224, 112, 46)'}}title="Basic Drawer" placement="right" onClose={onClose} visible={open}>
        <Row gutter={[16, 16]}>
          {MenuState.map((menu) => (
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
