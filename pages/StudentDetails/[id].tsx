import React, { useEffect, useState } from 'react';
import { Layout, Menu, Modal, Form, Input, Button, Select, Table } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './styles.module.css';
import { usePersons } from '../../Providers/personRegistration';
import { useIngredient } from '../../Providers/Ingredients';
import { Ingredient } from '../../Providers/Ingredients/context';
import { IPerson } from '../../Providers/personRegistration/AuthContext';

const { Header, Content, Footer, Sider } = Layout;
const { Item } = Menu;

const StudentDetails: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [student,setStudent] = useState<IPerson>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addStudentAllergiesVisible, setAddStudentAllergiesVisible] = useState<boolean>(false);
  const router = useRouter();
  const{FetchStatePerson,getStudents,getStudentById,PersonFetched} = usePersons<any>();
  const{getIngredients,IngredientState} = useIngredient()
  const {id} = router.query;

  useEffect(() => {
    // fetchStudents();
    getStudents();
    getStudentById(id?.toString());
    getIngredients();
    if (PersonFetched) {
      setStudent(PersonFetched);
    }
  }, []);
  console.log('person with id ',PersonFetched)

 // ...

 useEffect(() => {
  const filteredStudent = selectedStudent?.IndexOf(a => a.id.toString()=='4b83b783-a330-459e-4149-08db6b353b19');
  if (student && id) {
    const filteredStudent = selectedStudent?.IndexOf(a => a.id.toString()=='4b83b783-a330-459e-4149-08db6b353b19');
    setSelectedStudent(filteredStudent);
    console.log('filteres effed',filteredStudent);
  }
  console.log('filteres effed',filteredStudent);
}, [student, id]);


// ...

console.log('ingred',IngredientState)
console.log('fetvh',PersonFetched);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAddStudentAllergiesClick = () => {
    setAddStudentAllergiesVisible(true);
  };

  const handleAddStudentAllergiesCancel = () => {
    setAddStudentAllergiesVisible(false);
  };

  const handleAddStudentAllergies = (values: any) => {
    // Add logic to add student allergies based on the entered values
    console.log('Add Student Allergies:', values);
    setAddStudentAllergiesVisible(false);
  };

  //filter students
  // var student = FetchStatePerson?.find(a => id.toString() === a.userId.toString());
console.log('foun',FetchStatePerson)

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Surname', dataIndex: 'surname', key: 'surname' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <Button type="link">
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Sider width={200} theme="dark">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['students']}>
          <Item key="students">Students</Item>
          <Item key="addAllergies" onClick={handleAddStudentAllergiesClick}>
            Add Student Allergies
          </Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.logo} />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['students']}>
            <Item key="students">Students</Item>
            <Item key="addAllegries" onClick={handleAddStudentAllergiesClick}>
              Add Student Allergies
            </Item>
          </Menu>
        </Header>
        <Content className={styles.content}>
          <Table columns={columns} dataSource={selectedStudent} rowKey="id" />

          {/* Student Details Modal */}
          {selectedStudent && (
            <Modal
              title={`${selectedStudent.name} ${selectedStudent.surname} Details`}
              visible={modalVisible}
              onCancel={handleCloseModal}
              footer={null}
            >
              <p>
                <b>Student Number: </b>
                {selectedStudent.studNo}
              </p>
              <p>
                <b>Grade: </b>
                {selectedStudent.grade}
              </p>
              <p>
                <b>Is Feeding Scheme: </b>
                {selectedStudent.isFeedingScheme ? 'Yes' : 'No'}
              </p>
              <p>
                <b>Name: </b>
                {selectedStudent.name}
              </p>
              <p>
                <b>Surname: </b>
                {selectedStudent?.surname}
              </p>
              <p>
                <b>ID Number: </b>
                {selectedStudent.idNumber}
              </p>
              <p>
                <b>Gender: </b>
                {selectedStudent.gender}
              </p>
              <p>
                <b>Phone: </b>
                {selectedStudent.phone}
              </p>
              <p>
                <b>Email: </b>
                {selectedStudent.emailAddress}
              </p>
              <p>
                <b>Address: </b>
                {`${selectedStudent?.address?.streetName}`}
              </p>
            </Modal>
          )}

          {/* Add Student Allergies Modal */}
          <Modal
            title="Add Student Allergies"
            visible={addStudentAllergiesVisible}
            onCancel={handleAddStudentAllergiesCancel}
            footer={null}
          >
            <Form onFinish={handleAddStudentAllergies}>
              {/* Add form fields for student allergies */}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add Allergies
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        {/* <p>  {selectedStudent?.map(a => a.id.toString()=='4b83b783-a330-459e-4149-08db6b353b19')}</p> */}
        </Content>
        <Footer className={styles.footer}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default StudentDetails;
