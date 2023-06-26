import React, { useEffect, useState } from 'react';
import { Layout, Menu, Modal, Form, Input, Button, Select, Table } from 'antd';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { usePersons } from '../../Providers/personRegistration';
import { useIngredient } from '../../Providers/Ingredients';
import { IPerson } from '../../Providers/personRegistration/AuthContext';
import CreateStudentAllergyModal from '../../components/StudentAlllergies';
import withAuth from '../login/hoc/withAuth';
import { useStudentAllergies } from '../../Providers/StudentAllergies';
import MyLayout from '../../components/Layout';

const { Header, Content, Footer, Sider } = Layout;
const { Item } = Menu;

const StudentDetails: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentsAllergies, setStudentsAllergies] = useState<any>(null);
  const [student,setStudent] = useState<IPerson>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addStudentAllergiesVisible, setAddStudentAllergiesVisible] = useState<boolean>(false);
  const router = useRouter();
  const{FetchStatePerson,getStudents,PersonFetched} = usePersons<any>();
  const{getIngredients,IngredientState} = useIngredient();
  const{getStudentAllergies,StudentAllergiesState,updateStudentAllergies,StudentAllergiesCreated}=useStudentAllergies();
  const {id} = router.query;
  const [createModalVisible, setCreateModalVisible] = useState(false);
  useEffect(() => {
    getStudents();
    getStudentAllergies();
    getIngredients();
    if (PersonFetched) {
      setStudent(PersonFetched);
    }
  }, []);

 const filteredStudent = FetchStatePerson?.find(a=>a.id.toString()==id?.toString());
 const filteredStudentAllergies = StudentAllergiesState?.filter(
  (allergy) => allergy.StudentId?.toString() === filteredStudent?.id.toString()
);
console.log('filteredStudentAllergies',filteredStudentAllergies);
console.log('StudentAllergiesState get all',StudentAllergiesState)
useEffect(() => {
  if (student && id) {
    setSelectedStudent(filteredStudent);
    console.log('filtered allergies', filteredStudentAllergies);
  }
  if(StudentAllergiesState)
  { 
    ste();
    console.log('yes',studentsAllergies);
  }
}, [student, id, filteredStudent,StudentAllergiesState,StudentAllergiesCreated]);
const ste = async()=>
{
  setStudentsAllergies( StudentAllergiesState?.filter(
    (allergy) => allergy.studentId?.toString() === id.toString()));
}
useEffect(()=>
{
  if(StudentAllergiesState)
  {
    var allergies = StudentAllergiesState.filter((allergy) => allergy.studentId?.toString() === id?.toString());
    console.log('allergies',allergies)
    setStudentsAllergies(allergies);
    console.log('AAAAAAA',allergies);
  }
},[])

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Surname', dataIndex: 'surname', key: 'surname' },
  { title: 'Grade', dataIndex: 'grade', key: 'grade' },
  {
    title: 'Actions',
    key: 'actions',
    render: (text: any, record: any) => (
      <Button type="diabled">
        View Details
      </Button>
    ),
  },
];

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
    console.log('Add Student Allergies:', values);
    setAddStudentAllergiesVisible(false);
  };

  const handleCreateModalSubmit = async (values: any) => {
    console.log('Form Values:', values);
    setCreateModalVisible(false);
  };
  
  const handleToggleIsCurrent = (allergy: any) => {
    console.log('......',allergy.ingredientId,allergy.studentId);
    updateStudentAllergies(allergy.studentId,allergy.ingredientId);
  };
console.log('foun',FetchStatePerson);

const columns2 = [
  {
    title: 'Ingredient Name',dataIndex: ['ingredients', 'name'],key: 'ingredientName',
  },
  { title: 'reaction', dataIndex: 'reaction', key: 'reaction' },
  {
    title: 'isCurrent',
    dataIndex: 'isCurrent',
    key: 'isCurrent',
    render: (isCurrent: boolean, record: any) => (
      <Button type="primary" onClick={() => handleToggleIsCurrent(record)}>
        {isCurrent ? 'On' : 'Off'}
      </Button>
    ),
  },
  { title: 'treatment', dataIndex: 'treatment', key: 'treatment' },
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

    <MyLayout>
      <Layout>
        <Header className={styles.header}>
        <CreateStudentAllergyModal
            visible={createModalVisible}
            onCancel={() => setCreateModalVisible(false)}
             onSubmit={handleCreateModalSubmit}
             studentId={id}
          />
          <div className={styles.logo} />
          <Button type="primary" onClick={() => setCreateModalVisible(true)}>
                Add Student Allergies
            </Button>
        </Header>
        <Content className={styles.content}>
        <Table columns={columns} dataSource={[filteredStudent]} rowKey="id" />
        <Table dataSource={studentsAllergies} columns={columns2} size='small' style ={{width:'2000'}}/>
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
        </Content>
        <Footer className={styles.footer}>Ant Design ©2023 Created by Ant UED</Footer>
        
      </Layout>
    </MyLayout>
  );
};

export default withAuth(StudentDetails);
