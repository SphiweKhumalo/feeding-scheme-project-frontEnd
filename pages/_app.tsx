import React from "react";
import {RestfulProvider} from 'restful-react';
import { AppProps } from 'next/app';
import MenuProvider from "../Providers/Menu";
import MenuIngredient from "./MenuIngredient/[id]";
import MenuIngredientProvider from "../Providers/MenuIngredients";
import { PersonProvider } from "../Providers/personRegistration";
import MyLayout from "../components/Layout";
import IngredientProvider from "../Providers/Ingredients";
import StudentAllergiesProvider from "../Providers/StudentAllergies";
import BatchInformationProvider from "../Providers/BatchInformation";
import { ConfigProvider } from "antd";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>   
    <ConfigProvider
    theme={{ components:{Table:{colorBgContainer:'rgb(224, 112, 46);', colorPrimary:'#D6D6D6', fontSize:18,colorSuccess:"#27FF16" ,}} }}
  >
       <RestfulProvider base="https://localhost:44311/api/services/app/"> 
       <PersonProvider>
        <IngredientProvider>
          <StudentAllergiesProvider>
             <MenuProvider>
                <MenuIngredientProvider>
                  <BatchInformationProvider>
                     <Component {...pageProps} />
                  </BatchInformationProvider>
                </MenuIngredientProvider>
              </MenuProvider>
            </StudentAllergiesProvider>
         </IngredientProvider>
       </PersonProvider>
       </RestfulProvider>
       </ConfigProvider>
   </>
  )
 ;
}
export default MyApp; 