import React from "react";
import {RestfulProvider} from 'restful-react';
import { AppProps } from 'next/app';
import MenuProvider from "../Providers/Menu";
import MenuIngredient from "./MenuIngredient/[id]";
import MenuIngredientProvider from "../Providers/MenuIngredients/index[id]";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>   
       <RestfulProvider base="https://localhost:44311/api/services/app/"> 
       <MenuProvider>
        <MenuIngredientProvider>
             <Component {...pageProps} />
        </MenuIngredientProvider>
       </MenuProvider>
       </RestfulProvider>
   </>
  )
 ;
}
export default MyApp; 