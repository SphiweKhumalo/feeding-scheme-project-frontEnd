import { createContext } from 'react';

export interface Ingredient {
  id: string;
  name: string;
  group: number;
}


export interface IngredientStateContext {
    readonly IngredientState? : Ingredient[];
    readonly IngredientCreated?: Ingredient;
    readonly IngredientDeleted? : string;
}
export const INITIAL_STATE : IngredientStateContext = {IngredientState:[]};

export interface IngredientActionContext {
    getIngredients?: () => void;
    createIngredient? : (payload:Ingredient) =>void;
    deleteIngredient? : (ingredientId:string) =>void;
}

const IngredientContext = createContext<IngredientStateContext>(INITIAL_STATE);
const IngredientActionContext = createContext<IngredientActionContext>({});
export { IngredientContext,IngredientActionContext};
