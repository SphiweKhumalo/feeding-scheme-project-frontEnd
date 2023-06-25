import React, { FC, PropsWithChildren, useReducer, useContext, useState, Children } from 'react';
import { INITIAL_STATE, IStudentAllergies, StudentAllergiesContext, StudentAllergiesActionContext} from './context';
import { StudentAllergiesReducer } from './reducer';
import { fetchStudentAllergiesRequestAction,createStudentAllergiesRequestAction, deleteStudentAllergiesRequestAction, getStudentAllergiesByIdRequestAction } from './action';
import { useGet, useMutate } from 'restful-react';
import { useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';

const StudentAllergiesProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(StudentAllergiesReducer, INITIAL_STATE);

  const { data: StudentAllergiesData, refetch: getStudentAllergiesHttp } = useGet({
    path: 'StudentAllergiesService/GetStudentAllergies',
  });



  const { mutate: createStudentAllergiesHttp } = useMutate({
    path: 'StudentAllergiesService/CreateStudentAllergy',
    verb: 'POST',
  });

  useEffect(() => {
    StudentAllergiesData?.result && dispatch(fetchStudentAllergiesRequestAction(StudentAllergiesData?.result));
  }, [StudentAllergiesData, dispatch]);

  const getStudentAllergies = () => getStudentAllergiesHttp();
// console.log('SA',(StudentAllergiesData?.result))

  ///Api function calls
  const createStudentAllergies = async (payload) => {
    console.log("create StudentAllergies");
    try {
      console.log("CREATING  StudentAllergies");
      const response = await createStudentAllergiesHttp(payload);
      console.log("response::", response);
        message.success("StudentAllergies successfully created");
        console.log('StudentAllergies create response',response.result)
        dispatch(createStudentAllergiesRequestAction(response.result));
    } catch (error) {
      console.error("StudentAllergies creation error:", error);
      message.error("An error occurred during StudentAllergies creation");
    }
  };

  const deleteStudentAllergies = async (id: string) => {
    try {
    const response = await axios.delete(`https://localhost:44311/api/services/app/StudentAllergiesService/Delete?Id=${id}`);
    if (response.data.success) {
      dispatch(deleteStudentAllergiesRequestAction(id));
      message.success('StudentAllergies Deleted', response.data.result);
    }
    console.log('StudentAllergies deleted successfully');
    // Handle success scenario
  } catch (error) {
    console.error('Error deleting StudentAllergies:', error);
    // Handle error scenario
  }
  };

const updateStudentAllergies = async (studentId: string, ingredientId: string): Promise<void> => {
  try {
    const response = await axios.put(
      `https://localhost:44311/api/services/app/StudentAllergiesService/ChangeStudentAllergy?studentId=${studentId}&ingredientId=${ingredientId}`
    );
    // Handle the response if necessary
    console.log('Update successful',response.data);
  } catch (error) {
    // Handle errors
    console.error('Update failed', error);
  }
};
const getStudentAllergiesById = async (menuId: string) => {
  try {
    const response = await axios.get(`https://localhost:44311/api/services/app/MenuService/GetStudentsAllergicByMenu?id=${menuId}`);
    const data = response.data;
    debugger
      console.log('rsp',data);
      dispatch(getStudentAllergiesByIdRequestAction(data));
    console.log(data);
    // Do something with the data
  } catch (error) {
    console.error('Error:', error);
    // Handle the error
  }
};

// Usage example
// const studentId = '4b83b783-a330-459e-4149-08db6b353b19';
// const ingredientId = '4b83b783-a330-459e-4149-08db6b353b19';
// const isCurrent = true;

// updateIsCurrent(studentId, ingredientId, isCurrent);

  
  return (
    <StudentAllergiesContext.Provider value={state}>
      <StudentAllergiesActionContext.Provider value={{ createStudentAllergies,getStudentAllergies,deleteStudentAllergies,updateStudentAllergies,getStudentAllergiesById}}>
        {children} 
      </StudentAllergiesActionContext.Provider>
    </StudentAllergiesContext.Provider>
  );
};

export default StudentAllergiesProvider;

function useStudentAllergiesState() {
  const context = useContext(StudentAllergiesContext);
  if (!context) {
    throw new Error("useStudentAllergiesState must be used within a StudentAllergiesProvider");
  }
  return context;
}

function useStudentAllergiesAction() {
  const context = useContext(StudentAllergiesActionContext);
  if (context === undefined) {
    throw new Error("useStudentAllergiesState must be used within a StudentAllergiesProvider");
  }
  return context;
}

function useStudentAllergies() {
  return {
    ...useStudentAllergiesState(),
    ...useStudentAllergiesAction(),
  };
}

export { StudentAllergiesProvider, useStudentAllergies };
