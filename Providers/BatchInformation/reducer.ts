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
            case BatchInformationActionEnum.deleteBatchInformationRequest:
             const { BatchInformationDeleted } = payload;
             const filteredBatchInfo = [...incomingState?.BatchInformationState].filter(({ id }) => id !== BatchInformationDeleted);
             return { ...incomingState, BatchInformationState: [...filteredBatchInfo] };
             case BatchInformationActionEnum.updateBatchInformationRequest:
          const {BatchInformationUpdated}=payload;
          const filteredBatch=[...incomingState?.BatchInformationState].filter(({id})=>id!=BatchInformationUpdated?.id)
          return { ...incomingState, BatchInformationState:[...filteredBatch, BatchInformationUpdated]};
        default:
            return incomingState;
    }
}   
        // return { ...incomingState, FetchStateMovies:[payload.CreatedStateMovie,...incomingState?.FetchStateMovies]};
