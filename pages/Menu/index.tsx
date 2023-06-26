import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useGet } from 'restful-react';
import router, { useRouter } from 'next/router';
import { useMenu } from '../../Providers/Menu';
import {
  DesktopOutlined,
  FileOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  MessageOutlined,
  SettingOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Col, Divider, Row, Card, Button, Modal, Form, Input, Tabs, Radio } from 'antd';
import { IMenu } from '../../Providers/Menu/context';
import { Console } from 'console';
import StockManagement from '../StockManagement';
import Link from 'next/link';
import MenuDrawer from '../../components/menuDrawer/MenuDrawer';
import getDayOfWeek from '../../utils/getDayOfWeek';
import getMealTime from '../../utils/getMealTime';
import withAuth from '../login/hoc/withAuth';
import { useBatchInformation } from '../../Providers/BatchInformation';
import MyLayout from '../../components/Layout';
// import{getDayOfWeek} from '../../utils/getDayOfWeek';

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

type MenuOptions = {
  key: string;
  title: string;
  icon: JSX.Element;
  path: string;
};

const MenuInfomration: React.FC = () => {
  const { menusAction, MenuState,createMenu,deleteMenu} = useMenu();
  const[mainMenus,setMainMenus]= useState<IMenu[]>();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({});
  const router = useRouter();
 
  useEffect(() => {
    menusAction();
    console.log('menu stste',MenuState)
    if(MenuState){setMainMenus(MenuState.filter(a=>a.type==0))}
  }, []);
  useEffect(() => {
    if(MenuState){setMainMenus(MenuState.filter(a=>a.type==0))}
  },[MenuState])
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (menuId) : void=> {
    router.push(`/MenuIngredient/${menuId}`);
  };

  const handleDayMenuClick = (path:string) :void=> {
    router.push(path);
  };

  const handleButtonClick = () :void => {
    setModalVisible(true);
  };

  const handleModalCancel = () :void => {
    setModalVisible(false);
  };
  const handleDeleteClick = (payload) :void=>
  {
    deleteMenu(payload);
    // location.reload();
    
  }

  const handleFormSubmit = (values): void => {
    console.log(values);
    setModalVisible(false);
    console.log('Received values of form: ', values);
    if (createMenu) {
      createMenu(values);
    } else {
      console.log('menu not created');
    }
  };

  return (
    <MyLayout>
         <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ margin: '0 16px' }}>
          <div className={styles.cardDiv}>
            <>
              <Divider orientation="left"><h1 className={styles.MenuName} >Menu List</h1></Divider>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <span className={styles.spanStyling}>
                  <Button className ={styles.AddMenu}type="primary" onClick={handleButtonClick}>Add New Menu</Button>
                  <MenuDrawer />
                  </span>
                
                {mainMenus?.map((a, index) =>
                  <Card
                    hoverable
                    className={styles.MenuContainer}
                    cover={<img onClick={() => handleMenuClick(a.id)} alt="example" src={a?.imageUrl} />}
                    key={index}
                  >
                     <section className={styles.CardSectionStyling}>
                        <Meta description={<span style={{ color: 'rgb(224, 112, 46)' }}>Day: {getDayOfWeek(a.day)}</span>} />
                        <Meta title={<span style={{ color: 'whitesmoke',  'fontWeight': 'bold' }}>{a.name}</span>} description={<span style={{ color: 'whitesmoke' }}>{a?.day}</span>} />
                        <Meta title={<span style={{ color: 'whitesmoke','fontWeight': 'bold' }}>ServingTime</span>} description={<span style={{ color: 'whitesmoke' }}>{getMealTime(a?.servingTime)}</span>} />
                      </section>    
                    <span onClick={() => handleDeleteClick(a.id)}> 
                       <DeleteOutlined className= {styles.deleteStyling} rev={undefined} />
                    </span>
                  </Card>
                )}
              </Row>
            </>
          </div>
        </Content>
      <Modal
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleFormSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="servingTime" label="Serving Time" rules={[{ required: true }]}>
  <Radio.Group>
    <Radio value={0}>Breakfast</Radio>
    <Radio value={1}>Lunch</Radio>
  </Radio.Group>
</Form.Item>
<Form.Item name="day" label="Day" rules={[{ required: true }]}>
  <Radio.Group>
    <Radio value={1}>Monday</Radio>
    <Radio value={2}>Tuesday</Radio>
    <Radio value={3}>Wednesday</Radio>
    <Radio value={3}>Thursday</Radio>
    <Radio value={3}>Friday</Radio>
  </Radio.Group>
</Form.Item>
<Form.Item name="type" label="Type" rules={[{ required: true }]}>
  <Radio.Group>
    <Radio value={0}>Main</Radio>
    <Radio value={1}>Altertnative</Radio>
  </Radio.Group>
</Form.Item>
          <Form.Item name="quantity"  label="Quantity" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
        
      </Modal>
    </Layout>
    </MyLayout>
   
  );
};

export default withAuth(MenuInfomration);
