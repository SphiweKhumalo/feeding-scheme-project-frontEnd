import React, { useEffect } from 'react';
import { Layout, Menu, Button, Card } from 'antd';
import { useRouter } from 'next/router';
import { useGet } from 'restful-react';

const { Header, Content, Footer } = Layout;
const { Item } = Menu;

const StudentsAllergic: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: allergicStudents, loading, error, refetch } = useGet(
    `MenuService/GetStudentsAllergicByMenu?id=${id}`
  );

  useEffect(() => {
    refetch();
  }, [id]);

  const handleButtonClick = () => {
    // Handle button click logic here
  };
  console.log(allergicStudents?.result)

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Item key="1">nav 1</Item>
          <Item key="2">
          </Item>
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
            {allergicStudents.result?.map((student) => (
               <Card key={student.studentId}>
                 <p>
                   <b>{student.name} {student.surname} Grade: {student.grade}</b>
                 </p>
                 <p><b>Ingredient</b> {student.ingredientName.map((a,index) =><li>{index} {a}</li> )} </p>
                 <p><b> Reaction</b>{student.reactions.map((a,index) =><li>{index} {a}</li> )}</p>
                </Card>
               ))}
          </Card>
            </>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default StudentsAllergic;
