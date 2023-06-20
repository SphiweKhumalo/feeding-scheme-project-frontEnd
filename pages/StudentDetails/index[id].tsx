import React, { useEffect, useState } from 'react';
import { Layout, Menu, Modal, Form, Input, Button, Select, Table } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './styles.module.css';

const { Header, Content, Footer, Sider } = Layout;
const { Item } = Menu;

const StudentDetails: React.FC = () => {
  const router = useRouter();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addStudentAllergiesVisible, setAddStudentAllergiesVisible] = useState<boolean>(false);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get('https://api.example.com/students')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));
  };

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

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

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Surname', dataIndex: 'surname', key: 'surname' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <Button type="link" onClick={() => handleStudentClick(record)}>
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
          <Table columns={columns} dataSource={students} rowKey="id" />

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
                {selectedStudent.surname}
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
                {`${selectedStudent.address.streetName}, ${selectedStudent.address.city}, ${selectedStudent.address.postalCode}, ${selectedStudent.address.country}`}
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
        </Content>
        <Footer className={styles.footer}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default StudentDetails;
