import React from "react";
import {RestfulProvider} from 'restful-react';
import { AppProps } from 'next/app';
import MenuProvider from "../Providers/Menu";
import MenuIngredient from "./MenuIngredient/[id]";
import MenuIngredientProvider from "../Providers/MenuIngredients";
import BatchInformation from "../components/StockManagement/batchTable";
import BatchInformationProvider from "../Providers/BatchInformation";
import { PersonProvider } from "../Providers/personRegistration";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>   
       <RestfulProvider base="https://localhost:44311/api/services/app/"> 
       {/* <BatchInformationProvider> */}
       <PersonProvider>
       <MenuProvider>
        <MenuIngredientProvider>
             <Component {...pageProps} />
        </MenuIngredientProvider>
       </MenuProvider>
       </PersonProvider>
      
       {/* </BatchInformationProvider> */}
       </RestfulProvider>
   </>
  )
 ;
}
export default MyApp; 