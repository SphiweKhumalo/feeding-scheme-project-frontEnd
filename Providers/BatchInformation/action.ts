import { IBatchInformation,IBatchActionContext,IBatchInformationStateContext } from "./context";
import { createAction } from 'redux-actions'

export enum BatchInformationActionEnum
{
    fetchBatchInformationRequest = 'FETCH_BatchInformation',
    createBatchInformationRequest = 'CREATE_BatchInformation',
    deleteBatchInformationRequest = 'DELETE_BatchInformation',
    updateBatchInformationRequest = 'UPDATE_BatchInformation'

}

export const fetchBatchInformationRequestAction = createAction<IBatchInformationStateContext,Array<IBatchInformation>>(BatchInformationActionEnum.fetchBatchInformationRequest,(BatchInformationState)=>({BatchInformationState}));
export const createBatchInformationRequestAction = createAction<IBatchInformationStateContext,IBatchInformation>(BatchInformationActionEnum.createBatchInformationRequest,(BatchInformationCreated)=>({BatchInformationCreated}));
export const deleteBatchInformationRequestAction = createAction<IBatchInformationStateContext,string>(BatchInformationActionEnum.deleteBatchInformationRequest,(BatchInformationDeleted)=>({BatchInformationDeleted}));
export const updateBatchInformationRequestAction = createAction<IBatchInformationStateContext,IBatchInformation>(BatchInformationActionEnum.updateBatchInformationRequest,(BatchInformationUpdated)=>({BatchInformationUpdated}));

