import { createContext } from 'react';




export interface IBatchInformation {
    id?:string;
    ingredientId?: string;
    prodDate?: Date;
    expiryDate?: Date;
    quantity?: number;
    supplierId?: string;
  }
  

export interface IBatchInformationStateContext {
    readonly BatchInformationState? : IBatchInformation[];
    readonly BatchInformationCreated?: IBatchInformation;
    readonly BatchInformationUpdated?: IBatchInformation;
    readonly BatchInformationDeleted?:string;
}
export const INITIAL_STATE : IBatchInformationStateContext = {BatchInformationState:[]};

export interface IBatchActionContext {
    getBatchInformation?: () => void;
    updateBatchInformation?:(batchInformation:IBatchInformation) =>void;
    createBatchInformation?:(payload:IBatchInformation) =>void;
    deleteBatchInformation?:(payload:string) =>void;
}

const BatchInformationContext = createContext<IBatchInformationStateContext>(INITIAL_STATE);
const BatchInformationActionContext = createContext<IBatchActionContext>({});
export { BatchInformationContext,BatchInformationActionContext};
