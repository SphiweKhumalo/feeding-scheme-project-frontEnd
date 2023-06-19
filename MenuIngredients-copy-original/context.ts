import { createContext } from 'react';

export interface IMenuIngredient{
  menuId:string;
  ingredientId:string;
  quantityPerServing:number;
  }

export interface IMenuIngredientStateContext {
    readonly MenuIngredientState? : IMenuIngredient[];
    readonly MenuIngredientCreated?: IMenuIngredient;
}
export const INITIAL_STATE : IMenuIngredientStateContext = {MenuIngredientState:[]};

export interface IMenuIngredientActionContext {
    menuIngredientAction?: (payload:IMenuIngredient) => void;
    createMenuIngredient? : (payload:IMenuIngredient) =>void;
}

const MenuIngredientContext = createContext<IMenuIngredientStateContext>(INITIAL_STATE);
const MenuIngredientActionContext = createContext<IMenuIngredientActionContext>({});
export { MenuIngredientContext,MenuIngredientActionContext};
