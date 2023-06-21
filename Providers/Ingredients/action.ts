import { Ingredient,IngredientActionContext,IngredientStateContext } from "./context";
import { createAction } from 'redux-actions'

export enum IngredientActionEnum
{
    fetchIngredientRequest = 'FETCH_INGREDIENT',
    createIngredientRequest = 'CREATE_INGREDIENT',
    deleteIngredient = 'DELETE_INGREDIENT',
}

export const fetchIngredientRequestAction = createAction<IngredientStateContext,Array<Ingredient>>(IngredientActionEnum.fetchIngredientRequest,(IngredientState)=>({IngredientState}));
export const createIngredientRequestAction = createAction<IngredientStateContext,Ingredient>(IngredientActionEnum.createIngredientRequest,(IngredientCreated)=>({IngredientCreated}));
export const deleteIngredientRequestAction = createAction<IngredientStateContext,string>(IngredientActionEnum.deleteIngredient,(IngredientDeleted)=>({IngredientDeleted}));