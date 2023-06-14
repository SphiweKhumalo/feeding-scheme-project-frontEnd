import { createContext } from 'react';




export interface IMenu{
    id?:string;
    name : string;
    day :number;
    imagerUrl:string;
    servingTime : number;
    type : number;
    quantity: number;
  }

export interface IMenuStateContext {
    readonly MenuState? : IMenu[];
    readonly MenuCreated?: IMenu;
}
export const INITIAL_STATE : IMenuStateContext = {MenuState:[]};

export interface IMenuActionContext {
    menusAction?: () => void;
    createMenu? : (payload:IMenu) =>void;
}

const MenuContext = createContext<IMenuStateContext>(INITIAL_STATE);
const MenuActionContext = createContext<IMenuActionContext>({});
export { MenuContext,MenuActionContext};
