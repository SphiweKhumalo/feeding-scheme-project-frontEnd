import React, { FC, PropsWithChildren, useReducer, useContext, useEffect } from 'react';
import { INITIAL_STATE, MenuIngredientContext, MenuIngredientActionContext } from './context';
import { MenuReducer } from './reducer';
import { fetchMenuIngredientRequestAction, createMenuIngredientRequestAction, deleteMenuIngredientRequestAction } from './action';
import { useGet, useMutate } from 'restful-react';
import { message } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import { withSuccess } from 'antd/es/modal/confirm';

const MenuIngredientProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const { id } = router.query;
  const [state, dispatch] = useReducer(MenuReducer, INITIAL_STATE);
  const { mutate: createMenuHttp } = useMutate({
    path: 'MenuIngredientService/Create',
    verb: 'POST',
  });

  const { data: menuIngredientData, refetch: getMenuIngredientsHttp } = useGet({
    path: `MenuService/GetMenuWithIngredientsById?menuId=${id}`,
  });

  const { mutate: deleteMenuIngredientHttp } = useMutate({
    // path: 'MenuIngredientService/Delete', 
    path: `DeleteMenuIngredient?menuId=${id}&ingredientId=`,
    verb: 'DELETE',
  });
  

  useEffect(() => {
    getMenuIngredientsHttp();
    console.log(menuIngredientData);
  }, []);

  const handleEvent = () => {
    getMenuIngredientsHttp(); // Call the API when the event occurs
  };

  const menuIngredientAction = async () => {
    try {
      const response = await getMenuIngredientsHttp();
      if (response.success) {
        dispatch(fetchMenuIngredientRequestAction(response.result));
        console.log('res',response.data.result);
      } else {
        message.error("Failed to get Menu ingredient");
      }
    } catch (error) {
      console.error("Menu ingredient retrieval error:", error);
      message.error("An error occurred while retrieving menu ingredient");
    }
  };

  const createMenuIngredient = async (payload) => {
    try {
      const response = await createMenuHttp(payload);
      if (response.success) {
        dispatch(createMenuIngredientRequestAction(response));
        message.success("Ingredient added to Menu successfully");
      
      } else {
        message.error("Failed to add Menu ingredient");
      }
    } catch (error) {
      console.error("Menu creation error:", error);
      message.error("An error occurred during menu creation");
    }
  };

  const deleteMenuIngredient = async (payload) => {
    axios.delete(`https://localhost:44311/api/services/app/MenuIngredientService/DeleteMenuIngredient?menuId=${id}&ingredientId=${payload}`)
    .then(res => 
      {
        try
        {
          console.log('data res',res.data);
          if(res.data.success)
          {
            dispatch(deleteMenuIngredientRequestAction(payload));
            message.success('deleted successfully',res.data)
          }
        }catch(error)
        {
          console.log('error message',error);
          message.error('error message',error)
        }
      
      }).catch(err => console.log('catched  error',err))
  };

  return (
    <MenuIngredientContext.Provider value={state}>
      <MenuIngredientActionContext.Provider
        value={{ createMenuIngredient, menuIngredientAction, deleteMenuIngredient }}
      >
        {children}
      </MenuIngredientActionContext.Provider>
    </MenuIngredientContext.Provider>
  );
};

export default MenuIngredientProvider;

function useMenuIngredientState() {
  const context = useContext(MenuIngredientContext);
  if (!context) {
    throw new Error("useMenuIngredientState must be used within a MenuIngredientProvider");
  }
  return context;
}

function useMenuIngredientAction() {
  const context = useContext(MenuIngredientActionContext);
  if (!context) {
    throw new Error("useMenuIngredientAction must be used within a MenuIngredientProvider");
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
