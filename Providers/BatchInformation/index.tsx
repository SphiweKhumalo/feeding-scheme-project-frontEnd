import React, { FC, PropsWithChildren, useReducer, useContext, useState, Children } from 'react';
import { INITIAL_STATE, IBatchInformation, BatchInformationContext, BatchInformationActionContext} from './context';
import { BatchInformationReducer } from './reducer';
import { fetchBatchInformationRequestAction,createBatchInformationRequestAction, deleteBatchInformationRequestAction ,updateBatchInformationRequestAction} from './action';
import { useGet, useMutate } from 'restful-react';
import { useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';

const BatchInformationProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(BatchInformationReducer, INITIAL_STATE);

  const { data: BatchInformationData, refetch: getBatchInformationHttp } = useGet({
    path: 'BatchInformationService/GetBatchInformationByEachIngredientName',
    // path: 'BatchInformationService/GetAll',
  });

  const { mutate: createBatchInformationHttp } = useMutate({
    path: 'BatchInformationService/CreateBatchInformation',
    verb: 'POST',
  });

  useEffect(() => {
    BatchInformationData && dispatch(fetchBatchInformationRequestAction(BatchInformationData.result));
  }, [BatchInformationData, dispatch]);

  const getBatchInformation =  () => getBatchInformationHttp();
  console.log('batch DATA',BatchInformationData);
//   const getBatchInformation =  () => {
//  {
//     getBatchInformationHttp();
//     console.log('batch DATA',BatchInformationData);
//  }

  ///Api function calls
  const createBatchInformation = async (payload) => {
    console.log("create BatchInformation");
    try {
      console.log("CREATING  BatchInformation");
      const response = await createBatchInformationHttp(payload);
      console.log("response::", response);
      if (response.success) {
        message.success("BatchInformation successfully created");
        console.log('BatchInformation create response',response.result)
        dispatch(createBatchInformationRequestAction(response.result));
        // push('/login'); // Redirect to the login form
      } else {
        message.error("Failed to create BatchInformation");
      }
    } catch (error) {
      console.error("BatchInformation creation error:", error);
      message.error("An error occurred during BatchInformation creation");
    }
  };

  const deleteBatchInformation = async (batchId: string) => {
    try {
      const response = await axios.delete(`https://localhost:44311/api/services/app/BatchInformationService/Delete?Id=${batchId}`);
      if (response.data.success) {
        dispatch(deleteBatchInformationRequestAction(batchId));
  
        message.success('BatchInformation deleted successfully');
      } else {
        message.error('Failed to delete BatchInformation');
      }
    } catch (error) {
      console.error('Error deleting BatchInformation:', error);
      // Handle error scenario, e.g., display an error message or take appropriate action
      throw error;
    } 
  };

  const updateBatchInformation = async (batchInformation: IBatchInformation) => {
    console.log('sent batch update', batchInformation);
    const url = `https://localhost:44311/api/services/app/BatchInformationService/UpdateBatchInformation`;
  
    const payload = {
      id: batchInformation?.id,
      quantity: batchInformation?.quantity,
    };
  
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    console.log('resp', response);
  
    if (response.ok) {
      console.log('Batch information quantity updated');
      message.success('batchinformation update successuf')
      // Handle the success case
    } else {
      // Handle the error case
      console.error('Failed to update batch information quantity');
      message.error('batchinformation update successuf')
    }
  };
   
  
  
  return (
    <BatchInformationContext.Provider value={state}>
      <BatchInformationActionContext.Provider value={{ updateBatchInformation,createBatchInformation,getBatchInformation,deleteBatchInformation}}>
        {children}
      </BatchInformationActionContext.Provider>
    </BatchInformationContext.Provider>
  );
};

export default BatchInformationProvider;

function useBatchInformationState() {
  const context = useContext(BatchInformationContext);
  if (!context) {
    throw new Error("useBatchInformationState must be used within a BatchInformationProvider");
  }
  return context;
}

function useBatchInformationAction() {
  const context = useContext(BatchInformationActionContext);
  if (context === undefined) {
    throw new Error("useBatchInformationState must be used within a BatchInformationProvider");
  }
  return context;
}

function useBatchInformation() {
  return {
    ...useBatchInformationState(),
    ...useBatchInformationAction(),
  };
}

export { BatchInformationProvider, useBatchInformation };
