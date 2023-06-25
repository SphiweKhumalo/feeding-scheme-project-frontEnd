import React, { useEffect, useState } from 'react';
import { Layout, Card, Menu, Modal, List, Button } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './styles.module.css';
import { useGet } from 'restful-react';
import { usePersons } from '../../Providers/personRegistration';
import { Result, Typography } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { getMeasuringUnit } from '../../utils/getrMeasuringUnit';
import { getServingTime } from '../../utils/getServingTime';
import withAuth from '../login/hoc/withAuth';
import { useMenu } from '../../Providers/Menu';
import { IMenu } from '../../Providers/Menu/context';
import { dateFormatterMap } from '@ant-design/pro-components';
import { useStudentAllergies } from '../../Providers/StudentAllergies';
import MyLayout from '../../components/Layout';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const { Item } = Menu;

const DayMenuInformation: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [specialFood, setSpecialFood] = useState<string[]>([]);
  const [allergicStudents, setAllergicStudents] = useState<any[]>([]);
  const [alternativeMenu, setAlternativeMenu] = useState<IMenu>();
  const [menuToDay, setMenuToDay] = useState<IMenu>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const { getStudents, PersonLoggedIn, FetchStatePerson } = usePersons();
  const [searchValue, setSearchValue] = useState('');
  const{menusAction,MenuState} = useMenu();
  const{getStudentAllergiesById,StudentAllergiesSelected}= useStudentAllergies();
  const { data: menuData, refetch: getDayMenu } = useGet<any[]>({
    path: 'MenuService/getMenuForTheDay',
  });
  const { data: allergicStudentsData, refetch: getAllergicStudent } = useGet<any[]>({
    path: `MenuService/GetStudentsAllergicByMenu?id=${menuData?.result?.id}`,
  });
  const { data: eatingResults, refetch: geteatingResults } = useGet<any[]>({
    path: `MenuService/GetStudentEatingAndNotEatingByMenu?id=${menuData?.result?.id}`,
  });
  const { data: quantityPerServing, refetch: getQuantityPerServing } = useGet<any[]>({
    path: `MenuService/GetQuantityPerServingByMenu?menuId=${menuData?.result?.id}`,
  });

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredStudents = allergicStudents.result?.filter((student) =>
    `${student.name} ${student.surname}`.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    getDayMenu();
    getallergicStudentsData();
    geteatingResults();
    getQuantityPerServing();
    getStudentAllergiesById(alternativeMenu?.id);
  }, []);
  // console.log('quanperperson',quantityPerServing?.result)
console.log('fetch',eatingResults?.result)
  useEffect(() => {
    if (allergicStudentsData) {
      setAllergicStudents(allergicStudentsData);
    }
    var d = new Date().getDay();
    if(menusAction)
    {
      setMenuToDay(MenuState.find(a => a.type == 0 && a.day == d));
    }
     setAlternativeMenu( MenuState.find(a => a.type == 1 && a.day ==d));
     setAlternativeMenu(alternativeMenu );
    // debugger
  }, [allergicStudentsData]);
  console.log('alt',alternativeMenu)
  useEffect(() => {
    fetchSpecialFood();
    fetchAlternativeFood();
  }, []);

  const getallergicStudentsData = async () => {
    try {
      await getAllergicStudent();
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };
console.log('allergic',allergicStudents)
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

  const  getAllergicToAlternative = async (menuId) =>
  {
      
  }

  return (
    <MyLayout>
      {/* <Content className={styles.ContentContainer}> */}
        <div className={styles.divLeft}>
          <h1 className={styles.HeadStyling}>
            Menu For The Day:   {menuData?.result?.name}
          </h1>
          <div className={styles.imageContainer}>
            <img className={styles.imgStyling} alt = 'menu' src= {menuData?.result?.imageUrl}/>
          </div>
          <h1 className={styles.HeadStyling}>Quantitities based on students number</h1>

          <List className={styles.MenuContainer} itemLayout="horizontal" dataSource={quantityPerServing?.result} renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<span style={{ color: 'white' }}>{item.ingredientName}</span>}
                description={
                  <span style={{ color: 'white' }}>
                    Quantity: <b>{item.sumQuantityPerServing}</b>
                    <sub>{getMeasuringUnit(item.measuringUnit)}</sub>
                  </span>
                }
                style={{ color: 'white' }}
              />
            </List.Item>
          )} />

          <h2 className={styles.HeadStyling}>Student Allergies</h2>

          <div className={styles.StudentAllergiesContainer}>
            <span className={styles.StudentsEatingStyling}>
              <Title style={{ color: 'white' }} level={1}>
                Students Allergic
              </Title>
              <Result
                icon={<FrownOutlined rev={undefined} />}
                title={<span style={{ color: 'white' }}>{eatingResults?.result?.notEating}</span>}
              />
            </span>
            <span className={styles.StudentsEatingStyling}>
              <Title style={{ color: 'white' }} level={1}>
                Plates to Prepare Allergic:
              </Title>
              <Result
                icon={<SmileOutlined rev={undefined} />}
                title={<span style={{ color: 'white' }}>{eatingResults?.result?.eating}</span>}
              />
            </span>
          </div>

          <Card title="Student Allergies" className={styles.StudentAllergies}>
            <input type="text" value={searchValue} onChange={handleSearch} placeholder="Search students..." />
            {filteredStudents?.map((student, index) => (
              <Card key={student.studentId} onClick={() => handleStudentClick(student)}>
                <p className={styles.ModalStyling}>
                  <b>{student.name} {student.surname} Grade: {student.grade}</b>
                </p>
              </Card>
            ))}
          </Card>

          <h2>Alternative Menu</h2>
          <Card
            title={alternativeMenu?.name}
            cover={<img src={alternativeMenu?.imageUrl} alt={alternativeMenu?.name} />}
           >
            <p>Day: {alternativeMenu?.day}</p>
            <p>Quantity: {alternativeMenu?.quantity}</p>
            <p>Serving Time: {alternativeMenu?.servingTime}</p>
            <p>Type: {alternativeMenu?.type}</p>
            <p>ID: {alternativeMenu?.id}</p>
            <Button type='primary' onClick={getAllergicToAlternative}>GetAllergic</Button>
          </Card>
          <h2>Special Food</h2>
          <Card title="Special Food">{/* Render special food here */}</Card>
        </div>
        <div className={styles.divRight}>{/* Add your right content here */}</div>
      {/* </Content> */}<p>ads</p>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>

      {/* Modal */}
      {selectedStudent && (
        <Modal
          title={`${selectedStudent.name} ${selectedStudent.surname}`}
          visible={modalVisible}
          onCancel={handleCloseModal}
          footer={null}
        >
          <p className={styles.ParagraphStyling}>
            <b>Ingredient: </b>
            {selectedStudent.ingredientName.map((ingredient, index) => (
              <li key={index}>{`${index} ${ingredient}`}</li>
            ))}
          </p>
          <p className={styles.ParagraphStyling}>
            <b>Reaction: </b>
            {selectedStudent.reactions.map((reaction, index) => (
              <li key={index}>{`${index} ${reaction}`}</li>
            ))}
          </p>
          <p className={styles.ParagraphStyling}>
            <b>Treatment: </b>
            {selectedStudent.treatements.map((treatment, index) => (
              <li key={index}>{`${index} ${treatment}`}</li>
            ))}
          </p>
        </Modal>
      )}
    </MyLayout>
  );
};

export default withAuth(DayMenuInformation);
