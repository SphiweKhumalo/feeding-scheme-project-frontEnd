import { IngredientStateContext } from "./context";
import { IngredientActionEnum } from "./action";
import { IngredientContext,IngredientActionContext } from "./context";


export function IngredientReducer(incomingState: IngredientStateContext,action: ReduxActions.Action<IngredientStateContext>):IngredientStateContext{
    const {type,payload} = action;
    
    switch(type)
    {
        case IngredientActionEnum.fetchIngredientRequest:
            return {...incomingState,...payload}
            case IngredientActionEnum.createIngredientRequest:
                return { ...incomingState, IngredientState:[...incomingState?.IngredientState,payload.IngredientCreated,]};
            case IngredientActionEnum.deleteIngredient:
                const {IngredientDeleted}=payload;
                const filtered=[...incomingState?.IngredientState].filter(({id})=>id!=IngredientDeleted)
                return { ...incomingState, IngredientState:[...filtered]};
        default:
            return incomingState;
    }
}   

