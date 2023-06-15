import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Layout, Menu, theme,Image, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useGet } from 'restful-react';
import styles from './styles.module.css';
// import Meta from 'antd/es/card/Meta';
import { useMenu } from '../../Providers/Menu';
import MenuDropdown from '../../components/IngredientsList/ingredient';
import {DeleteOutlined} from '@ant-design/icons';
import { IMenuIngredient, MenuIngredientActionContext } from '../../Providers/MenuIngredients/context';
import { useMenuIngredient } from '../../Providers/MenuIngredients/index[id]';
import BatchTable from '../../components/StockManagement/depletingStock/DepletingBatch';
import MyChartComponent from '../../components/StockManagement/batchTable';
import BarChart from '../../components/StockManagement/batchTable';
import BatchInformation from '../../components/StockManagement/batchTable';
import Piechart from '../../components/StockManagement/pieChart';

const { Header, Content, Footer } = Layout;
const { Item} = Menu;

interface Ingredient 
{
    id : number;
    name: string; 
    Group: string;

}
const StockManagement: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;
      
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //function calls
  const handleDeleteClick = (id) => {
    // Handle the click event for the delete icon
    console.log('id is',id)
    message.success('dummy Delete Clickedwith id: '+ id);
  };

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
    <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

      </Header>
      {/* {MenuIngredientState && .map(a=><h1>{a.ingredientId}</h1>)} */}
      <Content className={styles.ContentContainer}>
       
        <div className={styles.divLeft}>
        <h1>Depleting Batches</h1>
           <BatchTable />
        </div>

        <div className={styles.divRight}>
          <h1>Fresh Stock Levels</h1>
            {/* <BatchInformation /> */}
            <Piechart />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default StockManagement;