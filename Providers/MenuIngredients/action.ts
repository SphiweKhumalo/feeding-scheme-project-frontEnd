import { IMenuIngredient,IMenuIngredientActionContext,IMenuIngredientStateContext } from "./context";
import { createAction } from 'redux-actions'

export enum MenuIngredientActionEnum
{
    fetchMenuRequest = 'FETCH_MENU_INGREDIENT',
    createMenuRequest = 'CREATE_MENU_INGREDIENT',
    deleteMenuIngredient = 'DELETE_MENU_INGREDIENT',
}

export const fetchMenuIngredientRequestAction = createAction<IMenuIngredientStateContext,Array<IMenuIngredient>>(MenuIngredientActionEnum.fetchMenuRequest,(MenuIngredientState)=>({MenuIngredientState}));
export const createMenuIngredientRequestAction = createAction<IMenuIngredientStateContext,IMenuIngredient>(MenuIngredientActionEnum.createMenuRequest,(MenuIngredientCreated)=>({MenuIngredientCreated}));
export const deleteMenuIngredientRequestAction = createAction<IMenuIngredientStateContext,string>(MenuIngredientActionEnum.deleteMenuIngredient,(MenuIngredientDeleted)=>({MenuIngredientDeleted}));