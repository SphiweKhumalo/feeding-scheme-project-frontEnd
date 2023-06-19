import React, { useEffect, useState } from 'react';
import { Layout, Card, Menu, Modal, Form, Input, Button, Select, Table } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './styles.module.css';
import { useGet } from 'restful-react';
import { usePersons } from '../../Providers/personRegistration';
import { IPerson } from '../../Providers/personRegistration/AuthContext';
import Sider from 'antd/es/layout/Sider';

const { Header, Content, Footer } = Layout;
const { Item } = Menu;

const Students: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [specialFood, setSpecialFood] = useState<string[]>([]);
  const [allergicStudents, setAllergicStudents] = useState<any[]>([]);
  const [alternativeFood, setAlternativeFood] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const{createPerson}=usePersons();
  const [addStudentVisible, setAddStudentVisible] = useState<boolean>(false);

  const { data: menuData, refetch: getDayMenu } = useGet<any[]>({
    path: 'MenuService/getMenuForTheDay',
  });
  const { data: allergicStudentsData, refetch: getAllergicStudent } = useGet<any[]>({
    path: `MenuService/GetStudentsAllergicByMenu?id=${menuData?.result.id}`,
  });
  const { data: students, loading } = useGet<any[]>({
    path: 'Student/GetAll',
  });
  useEffect(() => {
    getallergicStudentsData();
    getDayMenu();
  }, []);

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
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Surname', dataIndex: 'surname', key: 'surname' },
    { title: 'Username', dataIndex: 'userName', key: 'username' },
    { title: 'Grade', dataIndex: 'grade', key: 'Grade' },

  ];
  const getallergicStudentsData = async () => {
    try {
      await getAllergicStudent();
      console.log('count', allergicStudentsData?.length);
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

  const handleAddStudentClick = () => {
    setAddStudentVisible(true);
  };

  const handleAddStudentCancel = () => {
    setAddStudentVisible(false);
  };

  const handleAddStudent = (values: IPerson) => {
    // Add logic to add student based on the entered values
    console.log('Add Student:', values);
    createPerson(values);
    setAddStudentVisible(false);
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
            <Button type="primary" onClick={handleAddStudentClick}>
              Add Student
            </Button>
        </div>
        <div className={styles.divRight}>
          {/* Add your right content here */}
        </div>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["dashboard"]} mode="inline">
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleDayMenuClick(item.path)}
            >
              <Link href={item.path}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
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

      {/* Add Student Modal */}
      // Add Student Modal
<Modal
  title="Add Student"
  visible={addStudentVisible}
  onCancel={handleAddStudentCancel}
  footer={null}
>
<Form onFinish={handleAddStudent}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Surname" name="surname" rules={[{ required: true, message: 'Please enter the surname' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: 'Please enter the userName' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Grade" name="grade" rules={[{ required: true, message: 'Please enter the grade' }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Student Number"
            name="studNo"
            rules={[{ required: true, message: 'Please enter the student number' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter the password' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Role Name" name="roleNames" rules={[{ required: true, message: 'Please enter the role name' }]}>
            <Select mode="tags" placeholder="Select roles">
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="User">User</Select.Option>
              <Select.Option value="Guest">Guest</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select the gender' }]}>
            <Select>
              <Select.Option value={0}>Male</Select.Option>
              <Select.Option value={1}>Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="ID Number"
            name="idNumber"
            rules={[{ required: true, message: 'Please enter the ID number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="emailAddress"
            rules={[{ required: true, message: 'Please enter the email address' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Street Name"
            name={['address', 'streetName']}
            rules={[{ required: true, message: 'Please enter the street name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="City" name={['address', 'city']} rules={[{ required: true, message: 'Please enter the city' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Postal Code"
            name={['address', 'postalCode']}
            rules={[{ required: true, message: 'Please enter the postal code' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name={['address', 'country']}
            rules={[{ required: true, message: 'Please enter the country' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
</Modal>
<Table columns={columns} dataSource={students?.result} loading={loading} rowKey="id" />
    </Layout>
  );
};

export default Students;
