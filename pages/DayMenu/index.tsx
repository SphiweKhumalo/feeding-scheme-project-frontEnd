import React, { useEffect, useState } from 'react';
import { Layout, Card, Menu, Modal, List } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './styles.module.css';
import { useGet } from 'restful-react';
import { usePersons } from '../../Providers/personRegistration';
import { Result, Typography } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const { Item } = Menu;

const DayMenuInformation: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [specialFood, setSpecialFood] = useState<string[]>([]);
  const [allergicStudents, setAllergicStudents] = useState<any[]>([]);
  const [alternativeFood, setAlternativeFood] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const{getStudents,PersonLoggedIn,FetchStatePerson} = usePersons();
  const { data: menuData, refetch: getDayMenu } = useGet<any[]>({
    path: 'MenuService/getMenuForTheDay',
  });
  const { data: allergicStudentsData, refetch: getAllergicStudent } = useGet<any[]>({
    path: `MenuService/GetStudentsAllergicByMenu?id=${menuData?.result.id}`,
  });
  const { data: eatingResults, refetch: geteatingResults } = useGet<any[]>({
    path: 'MenuService/GetStudentEatingAndNotEatingByMenu?id=d592360f-f7e5-45c3-df00-08db6b3741f1',
  });    //remove
  // const { data: percentage, refetch: getPercentage } = useGet<any[]>({
  //   path: `MenuService/GetPercentageOfStudentsAllergicByMenu?id=${percentage.result}`,
  // });

  // const { data: quantityPerServing, refetch: getQuantityPerServing } = useGet<any[]>({
  //   path: `MenuService/GetQuantityPerServingByMenu?menuId=${menuData?.result.id}`,
  // }); 
  const { data: quantityPerServing, refetch: getQuantityPerServing } = useGet<any[]>({
    path: 'MenuService/GetQuantityPerServingByMenu?menuId=d592360f-f7e5-45c3-df00-08db6b3741f1',
  }); 
  useEffect(() => {
    getallergicStudentsData();
    getDayMenu();
    geteatingResults();
    getQuantityPerServing()

  }, []);
  // console.log('quanperperson',quantityPerServing?.result)
console.log('fetch',eatingResults?.result)
  useEffect(() => {
    if (allergicStudentsData) {
      setAllergicStudents(allergicStudentsData);
      // console.log('count', allergicStudentsData?.result?.length);
    }
  }, [allergicStudentsData]);

  useEffect(() => {
    fetchSpecialFood();
    fetchAlternativeFood();
  }, []);

  const getallergicStudentsData = async () => {
    try {
      await getAllergicStudent();
      // console.log('count',allergicStudentsData?.length); 
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

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
          <h1 style={{ fontSize: 50 }}>
            <b>Menu For The Day: </b>
            <u>{menuData?.result.name}</u>
          </h1>
          <img src={menuData?.result.imageUrl} />
          <h1>Quantitites based on students number</h1>

          <List
            itemLayout="horizontal"
            dataSource={quantityPerServing?.result}
           renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.ingredientName}
              description={`Quantity: ${item.sumQuantityPerServing}`}
            />
          </List.Item>

      )}
    />
          <h2>Student Allergies</h2>
        
          <div style ={{height:'10',display:'flex',padding:'100'}}>
            
           <span>
             <Title level={1}>Students Allergic:</Title>
               <Result
                icon={<FrownOutlined />}
                title={`Student Allergic: ${eatingResults?.result?.notEating}`}
               />  
           </span>
           <span>
              <Title level={1}>Plate to Prepare Allergic:</Title>
                 <Result
                  icon={<SmileOutlined />}
                  title={`Plate to Prepare: ${eatingResults?.result?.eating}`}
              />
           </span>

         
          </div>
          <Card title="Student Allergies">
            {allergicStudents.result?.map((student) => (
              <Card key={student.studentId} onClick={() => handleStudentClick(student)}>
                <p  className={styles.ModalStyling}>
                  <b>{student.name} {student.surname} Grade: {student.grade}</b>
                </p>
                {/* <p>
                  <b>Ingredient: </b>
                  {student.ingredientName[0]}
                </p>
                <p>
                  <b>Reaction: </b>
                  {student.reactions[0]}
                </p>
                <p>
                  <b>Treatment: </b>
                  {student.treatements[0]}
                </p>
                <p>length: {allergicStudents.length}</p> */}
              </Card>
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

      {/* Modal */}
      {selectedStudent && (
        <Modal
          title={`${selectedStudent.name} ${selectedStudent.surname}`}
          visible={modalVisible}
          onCancel={handleCloseModal}
          footer={null}
        >
          <p>
            <b>Ingredient: </b>
            {selectedStudent.ingredientName.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </p>
          <p>
            <b>Reaction: </b>
            {selectedStudent.reactions.map((reaction, index) => (
              <li key={index}>{reaction}</li>
            ))}
          </p>
          <p>
            <b>Treatment: </b>
            {selectedStudent.treatements.map((treatment, index) => (
              <li key={index}>{treatment}</li>
            ))}
          </p>
        </Modal>
      )}
    </Layout>
  );
};

export default DayMenuInformation;
