import React, { useEffect, useState } from 'react';
import { Layout, Card, Menu, Modal } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './styles.module.css';
import { useGet } from 'restful-react';
import { usePersons } from '../../Providers/personRegistration';

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

  useEffect(() => {
    getallergicStudentsData();
    getDayMenu();
  }, []);
console.log('fetch',FetchStatePerson)
  useEffect(() => {
    if (allergicStudentsData) {
      setAllergicStudents(allergicStudentsData);
      console.log('count', allergicStudentsData.result.length);
    }
  }, [allergicStudentsData]);

  useEffect(() => {
    fetchSpecialFood();
    fetchAlternativeFood();
  }, []);

  const getallergicStudentsData = async () => {
    try {
      await getAllergicStudent();
      console.log('count',allergicStudentsData?.length); 
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
          <p>show the amount of plates to prepare and the ingredients quantities</p>
          <h2>Student Allergies</h2>
          {/* //you need to call api where you get number of student */}
          <p>No Of Students Allergic: {(allergicStudentsData?.result.length) / (allergicStudents?.length) * 100}%</p> 
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
