import React, { FC, PropsWithChildren, useReducer, useContext, useState, Children } from 'react';
import { INITIAL_STATE, IMenu, MenuContext, MenuActionContext} from './context';
import { MenuReducer } from './reducer';
import { fetchMenuRequestAction,createMenuRequestAction } from './action';
import { useGet, useMutate } from 'restful-react';
import { useEffect } from 'react';
import { message } from 'antd';

const MenuProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(MenuReducer, INITIAL_STATE);

  const { data: menuData, refetch: getMenuHttp } = useGet({
    path: 'MenuService/GetAll',
  });

  const { mutate: createMenuHttp } = useMutate({
    path: 'MenuService/CreateMenu',
    verb: 'POST',
  });

  useEffect(() => {
    menuData && dispatch(fetchMenuRequestAction(menuData.result.items));
  }, [menuData, dispatch]);

  const menusAction = () => getMenuHttp();


  ///Api function calls
  const createMenu = async (payload) => {
    console.log("create menu");
    try {
      console.log("CREATING  Menu");
      const response = await createMenuHttp(payload);
      console.log("response::", response);
      if (response.success) {
        message.success("User successfully created");
        dispatch(createMenuRequestAction(response));
        // push('/login'); // Redirect to the login form
      } else {
        message.error("Failed to create Menu");
      }
    } catch (error) {
      console.error("Menu creation error:", error);
      message.error("An error occurred during menu creation");
    }
  };

  return (
    <MenuContext.Provider value={state}>
      <MenuActionContext.Provider value={{ createMenu,menusAction }}>
        {children} {/* Use the 'children' prop */}
      </MenuActionContext.Provider>
    </MenuContext.Provider>
  );
};

export default MenuProvider;

function useMenuState() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuState must be used within a MenuProvider");
  }
  return context;
}

function useMenuAction() {
  const context = useContext(MenuActionContext);
  if (context === undefined) {
    throw new Error("useMenuState must be used within a MenuProvider");
  }
  return context;
}

function useMenu() {
  return {
    ...useMenuState(),
    ...useMenuAction(),
  };
}

export { MenuProvider, useMenu };
