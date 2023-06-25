import { MenuActionEnum } from "./action";
import { IMenuActionContext,IMenuStateContext } from "./context";


export function MenuReducer(incomingState: IMenuStateContext,action: ReduxActions.Action<IMenuStateContext>):IMenuStateContext{
    const {type,payload} = action; 
    switch(type)
    {
        case MenuActionEnum.fetchMenuRequest: 
        return {...incomingState,...payload}
            case MenuActionEnum.createMenuRequest: 
            return { ...incomingState, MenuState:[payload.MenuCreated,...incomingState?.MenuState]}
            case MenuActionEnum.deleteMenuRequest:
            const {MenuDeleted}=payload;
            const filtered=[...incomingState?.MenuState].filter(({id})=>id!=MenuDeleted)
            return { ...incomingState, MenuState:[...filtered]};

        default:
            return incomingState;
    }
}   
