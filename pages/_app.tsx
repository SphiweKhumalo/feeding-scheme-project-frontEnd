import React from "react";
import {RestfulProvider} from 'restful-react';
import { AppProps } from 'next/app';
import MenuProvider from "../Providers/Menu";
import MenuIngredient from "./MenuIngredient/[id]";
import MenuIngredientProvider from "../Providers/MenuIngredients";
import BatchInformation from "../components/StockManagement/batchTable";
import BatchInformationProvider from "../Providers/BatchInformation";
import { PersonProvider } from "../Providers/personRegistration";
import MyLayout from "../components/Layout";
import IngredientProvider from "../Providers/Ingredients";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>   
    <MyLayout>
       <RestfulProvider base="https://localhost:44311/api/services/app/"> 
       {/* <BatchInformationProvider> */}
       
       <PersonProvider>
        <IngredientProvider>
        <MenuProvider>
        <MenuIngredientProvider>
             <Component {...pageProps} />
        </MenuIngredientProvider>
       </MenuProvider>
       </IngredientProvider>
       </PersonProvider>
       {/* </BatchInformationProvider> */}
       </RestfulProvider>
       </MyLayout>
   </>
  )
 ;
}
export default MyApp; 