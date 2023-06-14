import React, { FC, PropsWithChildren, useReducer, useContext, useState, Children } from 'react';
import { INITIAL_STATE, IMenuIngredient, MenuIngredientContext, MenuIngredientActionContext} from './context';
import { MenuReducer } from './reducer';
import { fetchMenuIngredientRequestAction,createMenuIngredientRequestAction } from './action';
import { useGet, useMutate } from 'restful-react';
import { useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/router';

const MenuIngredientProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const { id } = router.query;
  const [state, dispatch] = useReducer(MenuReducer, INITIAL_STATE);
  const { mutate: createMenuHttp } = useMutate({
    path: 'MenuIngredientService/Create',
    verb: 'POST',
  });  

  const { data: menuIngredientData, refetch: getMenuIngredientsHttp } = useGet({
    path: `MenuService/GetMenuWithIngredientsById?menuId=${id}`
    // path: 'MenuIngredientService/GetAll',
  });
  // `MenuService/GetMenuWithIngredientsById?menuId=${}`    implement
  useEffect(() => {
     var res =  getMenuIngredientsHttp();
       console.log('data',res);
  },[]);

  const handleEvent = () => {
    getMenuIngredientsHttp(); // Call the API when the event occurs
   
  };

  // const menuIngredientAction = () => menuIngredientData;
  ///Api function calls
  const menuIngredientAction = async(payload) =>
  {
    getMenuIngredientsHttp();
     var response = await getMenuIngredientsHttp();
      if (response.success) {
        // id = getMenuIngredientsHttp();
      dispatch(fetchMenuIngredientRequestAction(response.result))
      console.log('resp',response.result)
      }else {
      message.error("Failed to get Menu ingrdient");
    }
  }

  const createMenuIngredient = async  (payload) => {
    console.log("add ingredient to menu");
    try {
      console.log("adding ingrdient");
      const response = await createMenuHttp(payload);
      console.log("response::", response);
      if (response.success) {
        message.success("ingredient Added to Menu successfully");
        dispatch(createMenuIngredientRequestAction(response));
        // push('/login'); // Redirect to the login form
      } else {
        message.error("Failed to add Menu ingrdient");
      }
    } catch (error) {
      console.error("Menu creation error:", error);
      message.error("An error occurred during menu creation");
    }
  };

  return (
    <MenuIngredientContext.Provider value={state}>
      <MenuIngredientActionContext.Provider value={{ createMenuIngredient,menuIngredientAction }}>
        {children} {/* Use the 'children' prop */}
      </MenuIngredientActionContext.Provider>
    </MenuIngredientContext.Provider>
  );
};

export default MenuIngredientProvider;

function useMenuIngredientState() {
  const context = useContext(MenuIngredientContext);
  if (!context) {
    throw new Error("useMenuState must be used within a MenuIngredientProvider");
  }
  return context;
}

function useMenuIngredientAction() {
  const context = useContext(MenuIngredientActionContext);
  if (context === undefined) {
    throw new Error("useMenuState must be used within a MenuIngredientProvider");
  }
  return context;
}

function useMenuIngredient() {
  return {
    ...useMenuIngredientState(),
    ...useMenuIngredientAction(),
  };
}

export { MenuIngredientProvider, useMenuIngredient };
