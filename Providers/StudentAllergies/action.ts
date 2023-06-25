import { IStudentAllergies,IStudentAllergiesActionContext,IStudentAllergiesStateContext } from "./context";
import { createAction } from 'redux-actions'

export enum StudentAllergiesActionEnum
{
    fetchStudentAllergiesRequest = 'FETCH_STUDENTALLERGIES',
    createStudentAllergiesRequest = 'CREATE_STUDENTALLERGIES',
    deleteStudentAllergiesRequest = 'DELETE_STUDENTALLERGIES',
    updateStudentAllergiesRequest = 'DELETE_STUDENTALLERGIES',
    getStudentAllergiesByIdRequest = 'DELETE_STUDENTALLERGIES'
}

export const fetchStudentAllergiesRequestAction = createAction<IStudentAllergiesStateContext,Array<IStudentAllergies>>(StudentAllergiesActionEnum.fetchStudentAllergiesRequest,(StudentAllergiesState)=>({StudentAllergiesState}));
export const createStudentAllergiesRequestAction = createAction<IStudentAllergiesStateContext,IStudentAllergies>(StudentAllergiesActionEnum.createStudentAllergiesRequest,(StudentAllergiesCreated)=>({StudentAllergiesCreated}));
export const deleteStudentAllergiesRequestAction = createAction<IStudentAllergiesStateContext,string>(StudentAllergiesActionEnum.deleteStudentAllergiesRequest,(StudentAllergiesDeleted)=>({StudentAllergiesDeleted}));
export const getStudentAllergiesByIdRequestAction = createAction<IStudentAllergiesStateContext,string>(StudentAllergiesActionEnum.getStudentAllergiesByIdRequest,(StudentAllergiesSelected)=>({StudentAllergiesSelected}));
export const updateStudentAllergiesRequestAction = createAction<IStudentAllergiesStateContext,IStudentAllergies>(StudentAllergiesActionEnum.updateStudentAllergiesRequest,(StudentAllergiesUpdated)=>({StudentAllergiesUpdated}));