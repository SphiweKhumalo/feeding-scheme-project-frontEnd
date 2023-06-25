import { createContext } from 'react';




export interface IMenu{
    id?:string;
    name : string;
    day :number;
    imageUrl?:string;
    servingTime : number;
    type : number;
    quantity: number;
  }

export interface IMenuStateContext {
    readonly MenuState? : IMenu[];
    readonly MenuCreated?: IMenu;
    readonly MenuDeleted?:string;
}
export const INITIAL_STATE : IMenuStateContext = {MenuState:[]};

export interface IMenuActionContext {
    menusAction?: () => void;
    createMenu?: (payload:IMenu) =>void;
    deleteMenu?:(payload:string) =>void;
}

const MenuContext = createContext<IMenuStateContext>(INITIAL_STATE);
const MenuActionContext = createContext<IMenuActionContext>({});
export { MenuContext,MenuActionContext};
