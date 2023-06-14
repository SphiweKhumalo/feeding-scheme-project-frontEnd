import React, { FC, PropsWithChildren, useReducer, useContext, useState, Children } from 'react';
import { INITIAL_STATE, IMenuIngredient, MenuIngredientContext, MenuIngredientActionContext} from './context';
import { MenuReducer } from './reducer';
import { fetchMenuIngredientRequestAction,createMenuIngredientRequestAction } from './action';
import { useGet, useMutate } from 'restful-react';
import { useEffect } from 'react';
import { message } from 'antd';

const MenuIngredientProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(MenuReducer, INITIAL_STATE);
  const { mutate: createMenuHttp } = useMutate({
    path: 'MenuIngredientService/Create',
    verb: 'POST',
  });

  const { data: menuIngredientData, refetch: getMenuIngredientsHttp } = useGet({
    path: 'MenuService/GetMenuWithIngredientsById?menuId'
    // path: 'MenuIngredientService/GetAll',
  });
  // `MenuService/GetMenuWithIngredientsById?menuId=${}`    implement!!!!!!!!!!!!
  useEffect(() => {
    // menuIngredientData && dispatch(fetchMenuIngredientRequestAction(menuIngredientData.result.items));
    // getMenuIngredientsHttp();
    // console.log('ingredientData',menuIngredientData);
   
  },[]);
  const menuIngredientAction = () => menuIngredientData;

  
  ///Api function calls
  const createMenuIngredient = async (payload) => {
    console.log("create menu");
    try {
      console.log("CREATING  Menu");
      const response = await createMenuHttp(payload);
      console.log("response::", response);
      if (response.success) {
        message.success("ingredientAdded to Menu successfully");
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
