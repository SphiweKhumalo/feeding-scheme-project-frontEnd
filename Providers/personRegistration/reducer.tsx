import { PersonActionEnum } from "./actions";
import { IPersonStateContext, PersonContext } from "./AuthContext";


export function PersonReducer (incomingState :IPersonStateContext, action :  ReduxActions.Action<IPersonStateContext>) : IPersonStateContext
{
    const { type, payload } = action;
        switch(type)
        {
            case PersonActionEnum.CreatePersonRequest : return {...incomingState, ...payload};
            case PersonActionEnum.loginPersonRequest : return {...incomingState, ...payload};
            case PersonActionEnum.getPersonsRequest :return{...incomingState,...payload};
            default : return incomingState
        }
}
