import { BatchInformationActionEnum } from "./action";
import { IBatchActionContext,IBatchInformationStateContext } from "./context";


export function BatchInformationReducer(incomingState: IBatchInformationStateContext,action: ReduxActions.Action<IBatchInformationStateContext>):IBatchInformationStateContext{
    const {type,payload} = action;
    
    switch(type)
    {
        case BatchInformationActionEnum.fetchBatchInformationRequest: 
        return {...incomingState,...payload}
            case BatchInformationActionEnum.createBatchInformationRequest: 
            // return {...incomingState,MenuState:[payload.MenuCreated,...incomingState?.MenuState]}
            return { ...incomingState, BatchInformationState:[payload.BatchInformationCreated,...incomingState?.BatchInformationState]};

        default:
            return incomingState;
    }
}   
        // return { ...incomingState, FetchStateMovies:[payload.CreatedStateMovie,...incomingState?.FetchStateMovies]};
