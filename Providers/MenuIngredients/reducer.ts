import { IMenuStateContext } from "../Menu/context";
import { MenuIngredientActionEnum } from "./action";
import { IMenuIngredientActionContext,IMenuIngredientStateContext } from "./context";


export function MenuReducer(incomingState: IMenuIngredientStateContext,action: ReduxActions.Action<IMenuIngredientStateContext>):IMenuIngredientStateContext{
    const {type,payload} = action;
    
    switch(type)
    {
        case MenuIngredientActionEnum.fetchMenuRequest: 
        return {...incomingState,...payload}
            case MenuIngredientActionEnum.createMenuRequest: 
            return {...incomingState,MenuIngredientState:[payload.MenuIngredientCreated,...incomingState?.MenuIngredientState]};
        default:
            return incomingState;
    }
}   
        // return { ...incomingState, FetchStateMovies:[payload.CreatedStateMovie,...incomingState?.FetchStateMovies]};
