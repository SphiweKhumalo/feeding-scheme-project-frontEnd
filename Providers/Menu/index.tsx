import React, { FC, PropsWithChildren, useReducer, useContext, useState, Children } from 'react';
import { INITIAL_STATE, IMenu, MenuContext, MenuActionContext} from './context';
import { MenuReducer } from './reducer';
import { fetchMenuRequestAction,createMenuRequestAction, deleteMenuRequestAction } from './action';
import { useGet, useMutate } from 'restful-react';
import { useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';

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
        message.success("menu successfully created",1);
        console.log('menu create response',response.result)
        dispatch(createMenuRequestAction(response.result));
        // push('/login'); // Redirect to the login form
      } else {
        message.error("Failed to create Menu",1);
      }
    } catch (error) {
      console.error("Menu creation error:", error);
      message.error("An error occurred during menu creation",1);
    }
  };

  const deleteMenu = async (id: string) => {
    try {
    const response = await axios.delete(`https://localhost:44311/api/services/app/MenuService/Delete?Id=${id}`);
    if (response.data.success) {
      dispatch(deleteMenuRequestAction(id));
      message.success('Menu Deleted', response.data.result);
    }
    console.log('Menu deleted successfully');
    // Handle success scenario
  } catch (error) {
    console.error('Error deleting menu:', error);
    // Handle error scenario
  }
  };
  
  return (
    <MenuContext.Provider value={state}>
      <MenuActionContext.Provider value={{ createMenu,menusAction,deleteMenu}}>
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
