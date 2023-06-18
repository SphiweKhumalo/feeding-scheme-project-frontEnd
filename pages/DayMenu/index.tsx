import React, { useEffect, useState } from 'react';
import { Layout, Card, Menu } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './styles.module.css';
import { useGet } from 'restful-react';

const { Header, Content, Footer } = Layout;
const { Item } = Menu;

const DayMenuInformation: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [specialFood, setSpecialFood] = useState<string[]>([]);
  const [allergicStudents, setAllergicStudents] = useState<any[]>([]);
  const [alternativeFood, setAlternativeFood] = useState<string[]>([]);
  const { data: allergicStudentsData, refetch: getAllergicStudent } = useGet<any[]>({
    path: `MenuService/GetStudentsAllergicByMenu?id=${'d592360f-f7e5-45c3-df00-08db6b3741f1'}`,
  });
  const { data: menuData, refetch: getDayMenu} = useGet<any[]>({
    path: 'MenuService/getMenuForTheDay',
  });
  useEffect(() => {
    getallergicStudentsData();
     getDayMenu();
  }, []);
console.log('day menu',menuData)
  useEffect(() => {
    if (allergicStudentsData) {
      setAllergicStudents(allergicStudentsData);
    }
  }, [allergicStudentsData]);
console.log(allergicStudents.result)
  useEffect(() => {
    fetchSpecialFood();
    fetchAlternativeFood();
  }, []);

  const getallergicStudentsData = async () => {
    try {
      await getAllergicStudent();
      console.log()
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const fetchSpecialFood = () => {
    axios
      .get('https://api.example.com/specialfood')
      .then((response) => setSpecialFood(response.data))
      .catch((error) => console.error('Error fetching special food:', error));
  };

  const fetchAlternativeFood = () => {
    axios
      .get('https://api.example.com/alternativefood')
      .then((response) => setAlternativeFood(response.data))
      .catch((error) => console.error('Error fetching alternative food:', error));
  };

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Item key="1">Day Section</Item>
        </Menu>
      </Header>
      <Content className={styles.ContentContainer}>
        <div className={styles.divLeft}>
          <h2>Student Allergies</h2>
          <Card title="Student Allergies">
            {allergicStudents.result?.map((student) => (
              <p key={student.studentId}>{student.name} {student.surname} Grade: {student.grade} Ingredient: {student.ingredientName} Reaction: {student.reaction}</p>
              
            ))}
          </Card>


          <h2>Alternative Food</h2>
          <Card title="Alternative Food">
            {alternativeFood.map((food, index) => (
              <p key={index}>{food}</p>
            ))}
          </Card>

          <h2>Special Food</h2>
          <Card title="Special Food">
            {/* {menuData?.result.map((food, index) => (
              <p key={index}>{food}</p>
            ))} */}
          </Card>
        </div>
        <div className={styles.divRight}>
          {/* Add your right content here */}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default DayMenuInformation;
