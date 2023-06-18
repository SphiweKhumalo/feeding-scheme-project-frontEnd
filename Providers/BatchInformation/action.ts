import { IBatchInformation,IBatchActionContext,IBatchInformationStateContext } from "./context";
import { createAction } from 'redux-actions'

export enum BatchInformationActionEnum
{
    fetchBatchInformationRequest = 'FETCH_BatchInformation',
    createBatchInformationRequest = 'CREATE_BatchInformation'
}

export const fetchBatchInformationRequestAction = createAction<IBatchInformationStateContext,Array<IBatchInformation>>(BatchInformationActionEnum.fetchBatchInformationRequest,(BatchInformationState)=>({BatchInformationState}));
export const createBatchInformationRequestAction = createAction<IBatchInformationStateContext,IBatchInformation>(BatchInformationActionEnum.createBatchInformationRequest,(BatchInformationCreated)=>({BatchInformationCreated}));
