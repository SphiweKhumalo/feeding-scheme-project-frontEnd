import { createAction } from 'redux-actions'; 
import { IPerson, IPersonLogin, IPersonStateContext } from './AuthContext';


export enum PersonActionEnum 
{
    CreatePersonRequest = 'CREATE',
    loginPersonRequest = 'LOGIN',
    getPersonsRequest = 'GETPERSON'

}

export const createPersonRequestAction = createAction<IPersonStateContext,IPerson>(PersonActionEnum.CreatePersonRequest,(PersonCreated) => ({PersonCreated}))
export const loginPersonRequestAction = createAction<IPersonStateContext,IPersonLogin>(PersonActionEnum.loginPersonRequest,(PersonLoggedIn)   => ({PersonLoggedIn}))
export const getPersonsRequestAction= createAction<IPersonStateContext,Array<IPerson>>(PersonActionEnum.loginPersonRequest,(FetchStatePerson)   => ({FetchStatePerson}))

