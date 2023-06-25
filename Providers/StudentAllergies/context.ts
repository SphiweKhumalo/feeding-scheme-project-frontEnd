import { createContext } from 'react';




export interface IStudentAllergies{
    StudentId: string;
    IngredientId: string;
    Reaction: string;
    Treatment: string;
    DateAdded?: Date;
    IsCurrent?: boolean;
  }
  

export interface IStudentAllergiesStateContext {
    readonly StudentAllergiesState? : IStudentAllergies[];
    readonly StudentAllergiesCreated?: IStudentAllergies;
    readonly StudentAllergiesDeleted?:string;
    readonly StudentAllergiesUpdated?:IStudentAllergies; 
    readonly StudentAllergiesSelected?:string;
}
export const INITIAL_STATE : IStudentAllergiesStateContext = {StudentAllergiesState:[]};

export interface IStudentAllergiesActionContext {
    getStudentAllergies?: () => void;
    getStudentAllergiesById?: (menuId:string) => void;
    createStudentAllergies? : (payload:IStudentAllergies) =>void;
    deleteStudentAllergies?:(payload:string) =>void;
    updateStudentAllergies?(studentId:string,ingredientId:string);
}

const StudentAllergiesContext = createContext<IStudentAllergiesStateContext>(INITIAL_STATE);
const StudentAllergiesActionContext = createContext<IStudentAllergiesActionContext>({});
export { StudentAllergiesContext,StudentAllergiesActionContext};
