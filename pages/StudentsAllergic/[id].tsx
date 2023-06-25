import React, { useEffect, useState } from 'react';
import { Layout, Menu, Card, Modal } from 'antd';
import { useRouter } from 'next/router';
import { useGet } from 'restful-react';
import withAuth from '../login/hoc/withAuth';
import MyLayout from '../../components/Layout';

const { Header, Content, Footer } = Layout;
const { Item } = Menu;

const StudentsAllergic: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: allergicStudents, loading, error, refetch } = useGet(`MenuService/GetStudentsAllergicByMenu?id=${id}`);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    refetch();
  }, [id]);

  const handleStudentCardClick = (student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setModalVisible(false);
  };

  return (
    <MyLayout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Item key="1">nav 1</Item>
          <Item key="2"></Item>
        </Menu>
      </Header>
      <Content>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              {/* Content of the StudentsAllergic component */}
              <h1>Route ID: {id}</h1>
              <h2>Allergic Students:</h2>
              <Card title="Student Allergies">
                {allergicStudents?.result?.map((student) => (
                  <Card key={student.studentId} onClick={() => handleStudentCardClick(student)}>
                    <p>
                      <b>{student.name} {student.surname} Grade: {student.grade}</b>
                    </p>
                    <p>
                      <b>Ingredients:</b>{' '}
                      {student.ingredientName.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </p>
                    <p>
                      <b>Reactions:</b>{' '}
                      {student.reactions.map((reaction, index) => (
                        <li key={index}>{reaction}</li>
                      ))}
                    </p>
                  </Card>
                ))}
              </Card>
              {selectedStudent && (
                <Modal
                  title="Treatment and Ingredients"
                  visible={modalVisible}
                  onCancel={handleModalClose}
                  footer={null}
                >
                  <p>
                    <b>Treatment:</b> {selectedStudent.treatements[0]}
                  </p>
                  <p>
                    <b>Ingredients:</b>{' '}
                    {selectedStudent.ingredientName.map((ingAedient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </p>
                </Modal>
              )}
            </>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </MyLayout>
  );
};

export default withAuth(StudentsAllergic);
