import { IMenu,IMenuActionContext,IMenuStateContext } from "./context";
import { createAction } from 'redux-actions'

export enum MenuActionEnum
{
    fetchMenuRequest = 'FETCH_MENU',
    createMenuRequest = 'CREATE_MENU'
}

export const fetchMenuRequestAction = createAction<IMenuStateContext,Array<IMenu>>(MenuActionEnum.fetchMenuRequest,(MenuState)=>({MenuState}));
export const createMenuRequestAction = createAction<IMenuStateContext,IMenu>(MenuActionEnum.createMenuRequest,(MenuCreated)=>({MenuCreated}));
