import { createContext } from "react";
 
export interface IPerson 
{
    id: string;
    userName: string;
    name: string;
    surname: string;
    password: string;
    gender: number;
    genderName: string;
    idNumber: string;
    phone: string;
    emailAddress: string;
    address: {
      id: string;
      streetName: string;
      city: string;
      postalCode: string;
      country: string;
    };
    userId: number;
    roleNames: string[];
    grade: string;
    isFeedingScheme: boolean;
} 

export interface IUser 
{
    userName: string;
    name : string;
    password : string;
    emailAddress: string
} 


export interface IPersonLogin 
{
    userName : string;
    password : string;
}  


export interface IPersonLogin2
{

    userNameOrEmailAddress: string;
    password : string;
}  


export interface IPersonStateContext 
{
    readonly PersonCreated?: IPerson;
    readonly PersonLoggedIn?: IPersonLogin;
    readonly FetchStatePerson?: IPerson[];
    readonly PersonFetched?:IPerson;
}

export const INITIAL_STATE: IPersonStateContext  = {}; //In this case, the initial state has an empty object as the default value for the IPersonStateContext

export interface IPersonActionContext     //this is where tje crud functions are going.
{
    createPerson? : (payload : IPerson) => void;   ///LIKE YOUR crud services.
     loginPerson? : (payload :IPersonLogin) => void;
     getStudents?:()=>void;
     getStudentById?: (payload:string )=> void;

}

const PersonContext = createContext<IPersonStateContext>(INITIAL_STATE);
const PersonActionContext = createContext<IPersonActionContext>({});

export {PersonContext,PersonActionContext};
