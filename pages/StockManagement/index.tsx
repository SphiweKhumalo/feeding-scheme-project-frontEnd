import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Layout, Menu, theme,Image, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useGet } from 'restful-react';
import styles from './styles.module.css';
import DepletingBatch from '../../components/StockManagement/DepletingBatchesByStock/DepletingBatchesByStock';
import Piechart from '../../components/StockManagement/pieChart';
import AddBatchPopup from '../../components/StockManagement/Add Batch/AddBatch';
import {  BatchInformationByIngredient } from '../../components/StockManagement/GetBatchInformationByIngredient/App';
import { StockExpiringSoon } from '../../components/StockManagement/BarGraphStockExpiringSoon/App';
import StackedGraph from '../../components/StockManagement/Stacked/stackedgraph';
import Meta from 'antd/es/card/Meta';
import { AddIngredientForm } from '../../components/AddIngredientDropDown/AddIngredient';
import withAuth from '../login/hoc/withAuth';
import { useIngredient } from '../../Providers/Ingredients';
import MyLayout from '../../components/Layout';

const { Header, Content, Footer } = Layout;
const { Item} = Menu;


interface Ingredient 
{
    id : number;
    name: string; 
    Group: string;

}
const StockManagement: React.FC = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [ingredientForm, setIngredientForm] = useState<Boolean>(false);
  // const{createIngredient,IngredientCreatedm,getIngredients} = useIngredient();
  const router = useRouter();
  const { id } = router.query;
  const{Meta} = Card;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //function calls
  const handleDeleteClick = (id) => {
    message.success('dummy Delete Clickedwith id: '+ id);
  };

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);``
  };

  const handleFormSubmit = (data: FormData) => {
    console.log(data);
  };
  const handleToggleIngredientForm =async =>
  {
    setIngredientForm(!ingredientForm);
  }
  return (
    <MyLayout>
      <Content className={styles.ContentContainer}>      
        <div className={styles.divLeft}>
        <h1>Low Batches(under:300)</h1>
        <Button  type='primary'onClick={handleOpenPopup}>Open Popup</Button>
        <Button  type='primary'onClick={handleToggleIngredientForm}>Add Ingredient</Button>

        <AddIngredientForm visible={ingredientForm} onCancel={handleToggleIngredientForm} onSubmit ={null} /> 
        <div className={styles.divRight}>
        <Card>
          <Meta title="Fresh Stock Levels" />
          <Piechart />
        </Card>
      </div>
        <Card style={{backgroundColor:'transparent'}}>
          <Meta title="Depleting Batch" />
          <section className={styles.BarSection}> 
            <DepletingBatch />
          </section>
        </Card>
        <Card style={{backgroundColor:'white'}}>
        <section className={styles.BarSection}>
          <h1 style = {{color:'red',fontStyle:'italic'}}>Stock Expiring In (5) Days</h1>
          <StockExpiringSoon />
        </section>
        <AddBatchPopup visible={popupVisible} onClose={handleClosePopup} onSubmit={handleFormSubmit} /> 
        </Card>
        </div>
        <BatchInformationByIngredient />
        <StackedGraph />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </MyLayout>
  );
};

export default withAuth(StockManagement);