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
                return { ...incomingState, MenuIngredientState:[...incomingState?.MenuIngredientState,payload.MenuIngredientCreated,]};
            case MenuIngredientActionEnum.deleteMenuIngredient:
                const {MenuIngredientState}=payload;
                const filtered=[...incomingState?.MenuIngredientState].filter(({menuId})=>menuId!=MenuIngredientDeleted)
                return { ...incomingState, MenuIngredientState:[...filtered]};
        default:
            return incomingState;
    }
}   
        // return { ...incomingState, FetchStateMovies:[payload.CreatedStateMovie,...incomingState?.FetchStateMovies]};
