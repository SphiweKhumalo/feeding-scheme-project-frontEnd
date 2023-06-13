import { createContext } from 'react';




export interface IMenu{
    id :string;
    name : string;
    Day :number;
    imagerUrl:string;
    servingTime : number;
    type : number;
  }
export interface IMenuStateContext {
    readonly MenuState? : IMenu[];
}
export const initialState : IMenuStateContext = {MenuState:[]};

export interface IMenuActionContext 
{
    menusAction? : () => void;
}

const MenuContext = createContext<IMenuStateContext>(initialState);
const MenuActionContext = createContext<IMenuActionContext>({});
export { MenuContext,MenuActionContext};
