import { MenuActionEnum } from "./action";
import { IMenuActionContext,IMenuStateContext } from "./context";


export function MenuReducer(incomingState: IMenuStateContext,action: ReduxActions.Action<IMenuStateContext>):IMenuStateContext{
    const {type,payload} = action;
    
    switch(type)
    {
        case MenuActionEnum.fetchMenuRequest: 
        return {...incomingState,...payload}
            case MenuActionEnum.createMenuRequest: 
            // return {...incomingState,MenuState:[payload.MenuCreated,...incomingState?.MenuState]}
            return { ...incomingState, MenuState:[payload.MenuCreated,...incomingState?.MenuState]};

        default:
            return incomingState;
    }
}   
        // return { ...incomingState, FetchStateMovies:[payload.CreatedStateMovie,...incomingState?.FetchStateMovies]};
