import React, { FC, PropsWithChildren, useContext, useReducer } from 'react';
import { PersonReducer } from './reducer';
import { INITIAL_STATE, IPerson, IPersonLogin, IPersonLogin2,PersonActionContext, PersonContext } from './AuthContext';
import { createPersonRequestAction, getPersonsRequestAction, loginPersonRequestAction,getPersonsByIdRequestAction } from './actions';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useGet, useMutate } from 'restful-react';
import axios from 'axios';
const PersonProvider: FC<PropsWithChildren> = ({ children }) => {


  const obj = 
{
  userNameOrEmailAddress : "admin",
  password : "123qwe"
}

  const [state, dispatch] = useReducer(PersonReducer, INITIAL_STATE);
  const createPersonMutation = useMutate<any>({
    path: 'Student/Create',
    verb: 'POST',
  });

  const createPerson = async (payload: IPerson) => {
    try {
      const response = await createPersonMutation.mutate(payload);
        const data = response.data;
        console.log(data);
        // localStorage.setItem('token', data.result.accessToken);
        dispatch(createPersonRequestAction(data));    //dispatch result from backend rather(c).
        message.success('Successfully created');
    } catch (error) {
      console.log(error);
      message.error('Create student failed');
    }
  };
  
  const getStudentById = async(id:string)=>
  {
    axios.get(`https://localhost:44311/api/services/app/Student/GetAsnyc?id=${id}`)
    const getStudents = async () => {
      var res = await getStudentsHttp();
      if (res.ok) {
        console.log('res', res.result);
        dispatch(getPersonsByIdRequestAction(res.result));
      }
    };
  }
  const { data: students  ,refetch:getStudentsHttp} = useGet<any[]>({
    path: 'Student/GetAll',
  });
  
  
  const getStudents = async () => {
    var res = await getStudentsHttp();
    if (res.success) {
      console.log('res', res.result);
      dispatch(getPersonsRequestAction(res.result));
    }
  };


  const getAllPerson = async (payload : IPersonLogin) =>
  {
    const url = 'https://localhost:44311/api/services/app/PersonService/getAll';
    // const token = localStorage.getItem('token');
    
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload)   
    };

    try {
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        const data = await response.json();
        console.log("Are you in");
        // Set the user token or session
        console.log(data)
        localStorage.setItem('token', data.result.accessToken);
        dispatch(loginPersonRequestAction(data));
        message.error('Successfully Loggedin');
        window.location.href = '/Menu'
      } else {
        message.error('User cREATE Fail');
      }
    } catch (error) {
      console.log(error);   
      message.error('User cREATE Fail');
    }
  };


  const loginPerson = async (payload: IPersonLogin) => {
    const authUrl = 'https://localhost:44311/api/TokenAuth/Authenticate';
    try {
      const response = await fetch(
        authUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );
      
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.result.accessToken); 
        console.log(data);


      
        const userResponse = await fetch(
          `https://localhost:44311/api/services/app/User/Get?Id=${data.result.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.result.accessToken}`
            },
            
          }
        );
        if (userResponse.ok) {
          const user = await userResponse.json();
          console.log(user);
          dispatch(loginPersonRequestAction(user));
          window.location.href = '/Menu'
          message.error("Successfully Logged in");
          
        } else {
          message.error("Failed to fetch user data");
        }
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
      message.error("Login failed");
    }
  }
  
  
  
  

 
  return (
    <PersonContext.Provider value={state}>
      <PersonActionContext.Provider value={{ createPerson,loginPerson,getStudents, getStudentById}}>
        {children}
      </PersonActionContext.Provider>
    </PersonContext.Provider>
  );
}

function usePersonState()
{
  const context = useContext(PersonContext);
  if(!context)
  {
    throw new Error("user autyh action must be used with auth provider");
  }
  return context;
}

function usePersonActionState()
{
  const context = useContext(PersonActionContext);
  if(!context)
  {
    throw new Error("user autyh action must be used with auth provider");
  }
  return context;
}

function usePersons()
{
  return{
  ...usePersonState(),
  ...usePersonActionState()
  }
}

export { usePersons, PersonProvider}; 





  function useMutation<T>(arg0: { path: string; verb: string; }) {
    throw new Error('Function not implemented.');
  }
// const onFinish = (values: any) => {
//   console.log('Success:', values);
// };

// const onFinishFailed = (errorInfo: any) => {
//   console.log('Failed:', errorInfo);
// };

// const App: React.FC = () => (
//   <Form
//     name="basic"
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ remember: true }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="Username"
//       name="username"
//       rules={[{ required: true, message: 'Please input your username!' }]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[{ required: true, message: 'Please input your password!' }]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
//       <Checkbox>Remember me</Checkbox>
//     </Form.Item>

//     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );

// export default App;
