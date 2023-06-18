import { createContext } from 'react';




export interface IBatchInformation {
    ingredientId: string;
    prodDate: Date;
    expiryDate: Date;
    quantity: number;
    supplierId: string;
  }
  

export interface IBatchInformationStateContext {
    readonly BatchInformationState? : IBatchInformation[];
    readonly BatchInformationCreated?: IBatchInformation;
}
export const INITIAL_STATE : IBatchInformationStateContext = {BatchInformationState:[]};

export interface IBatchActionContext {
    getBatchInformationAction?: () => void;
    addBatch? : (payload:IBatchInformation) =>void;
}

const BatchInformationContext = createContext<IBatchInformationStateContext>(INITIAL_STATE);
const BatchInformationActionContext = createContext<IBatchActionContext>({});
export { BatchInformationContext,BatchInformationActionContext};
