import React from "react";
import {RestfulProvider} from 'restful-react';
import { AppProps } from 'next/app';
import MenuProvider from "../Providers/Menu";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>   
       <RestfulProvider base="https://localhost:44311/api/services/app/"> 
       <MenuProvider>
       <Component {...pageProps} />
       </MenuProvider>
       </RestfulProvider>
   </>
  )
 ;
}
export default MyApp; 