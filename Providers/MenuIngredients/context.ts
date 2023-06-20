import { createContext } from 'react';

export interface IMenuIngredient{
  menuId:string;
  ingredientId:string;
  quantityPerServing?:number;
  }

export interface IMenuIngredientStateContext {
    readonly MenuIngredientState? : IMenuIngredient[];
    readonly MenuIngredientCreated?: IMenuIngredient;
    readonly MenuIngredientDeleted? : string;
}
export const INITIAL_STATE : IMenuIngredientStateContext = {MenuIngredientState:[]};

export interface IMenuIngredientActionContext {
    getMenuIngredient?: (id:string) => void;
    createMenuIngredient? : (payload:IMenuIngredient) =>void;
    deleteMenuIngredient? : (menuId:string,ingredientId:string) =>void;
}

const MenuIngredientContext = createContext<IMenuIngredientStateContext>(INITIAL_STATE);
const MenuIngredientActionContext = createContext<IMenuIngredientActionContext>({});
export { MenuIngredientContext,MenuIngredientActionContext};
