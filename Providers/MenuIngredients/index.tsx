import React, { FC, PropsWithChildren, useReducer, useContext, useEffect } from 'react';
import { INITIAL_STATE, MenuIngredientContext, MenuIngredientActionContext } from './context';
import { MenuReducer } from './reducer';
import { fetchMenuIngredientRequestAction, createMenuIngredientRequestAction, deleteMenuIngredientRequestAction } from './action';
import { useGet, useMutate } from 'restful-react';
import { message } from 'antd';
import axios from 'axios';

const MenuIngredientProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(MenuReducer, INITIAL_STATE);
  const { mutate: createMenuHttp } = useMutate({
    path: 'MenuIngredientService/CreateMenuIngredient',
    verb: 'POST',
  });

  const { data: menuIngredientData, refetch: getMenuIngredientsHttp } = useGet({
    path: `MenuService/GetMenuWithIngredientsById`,
  });

  const { mutate: deleteMenuIngredientHttp } = useMutate({
    // path: 'MenuIngredientService/Delete',
    path: `MenuIngredientService/DeleteMenuIngredient`,
    verb: 'DELETE',
  });





  const getMenuIngredient = async (id: string) => {
    try {
      const response = await getMenuIngredientsHttp({
        queryParams: { menuId: id },
      });

      console.log('data', response);

      if (response.success) {
        dispatch(fetchMenuIngredientRequestAction(response.result));
        console.log('result menu Ingredient', response.result);
      } else {
        message.error('Failed to get Menu ingredient');
      }
    } catch (error) {
      console.error('Menu ingredient retrieval error:', error);
      message.error('An error occurred while retrieving menu ingredient');
    }
  };


  const createMenuIngredient = async (payload) => {
    try {
      const response = await createMenuHttp(payload);
      if (response.success) {
        dispatch(createMenuIngredientRequestAction(response.result));
        message.success("Ingredient added to Menu successfully");

      } else {
        message.error("Failed to add Menu ingredient");
      }
    } catch (error) {
      console.error("Menu creation error:", error);
      message.error("An error occurred during menu creation");
    }
  };

  // const deleteMenuIngredient = async (menuId:string,ingredientId:string) =>
  // {
  //   console.log('menuId',menuId,ingredientId);
  //   try
  //   {
  //       const response = await deleteMenuIngredientHttp({
  //         queryParams:{
  //           menuId:menuId,
  //           ingredientId:ingredientId
  //         }
  //       });
  //       console.log('params menuId',menuId,'ingredient',ingredientId)
  //       if (response.success) {
  //         dispatch(deleteMenuIngredientRequestAction(response.result));
  //         message.success("Ingredient deleted to Menu successfully");

  //       } else {
  //         message.error("Failed to delete Menu ingredient");
  //       }
  //   }catch(error)
  //   {
  //     console.error("Menu Ingredient deletion error:", error);
  //   }
  // }
  // const deleteMenuIngredient = async (menuId, ingredientId) => {
  //   try {
  //     const response = await deleteMenuIngredientHttp({
  //       queryParams: {
  //         menuId: menuId,
  //         ingredientId: ingredientId
  //       }
  //     });

  //     console.log('params menuId', menuId, 'ingredient', ingredientId);

  //     if (response.success) {
  //       dispatch(deleteMenuIngredientRequestAction(response.result));
  //       message.success("Ingredient deleted from Menu successfully");
  //     } else {
  //       message.error("Failed to delete Menu ingredient");
  //     }
  //   } catch (error) {
  //     console.error("Menu Ingredient deletion error:", error);
  //   }
  // };

  const deleteMenuIngredient = async (menuId: string, ingredientId: string) => {
    try {
      const response = await fetch(`https://localhost:44311/api/services/app/MenuIngredientService/DeleteMenuIngredient?menuId=${menuId}&ingredientId=${ingredientId}`, {
        method: 'DELETE',
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json"
        },
      });
  
      const finalData = await response.json();
      console.log('-----print', finalData);
  
      if (finalData.success) {
        dispatch(deleteMenuIngredientRequestAction(finalData));
      } else if (finalData.error) {
        console.error("Menu Ingredient deletion error:", finalData.error);
      }
    } catch (error) {
      console.error("An error occurred while deleting the menu ingredient:", error);
    }
  };
  









  // const deleteMenuIngredient = async (payload) => {
  //   axios.delete(`https://localhost:44311/api/services/app/MenuIngredientService/DeleteMenuIngredient?menuId=${id}&ingredientId=${payload}`)
  //   .then(res =>
  //     {
  //       try
  //       {
  //         console.log('data res',res.data);
  //         if(res.data.success)
  //         {
  //           dispatch(deleteMenuIngredientRequestAction(payload));
  //           message.success('deleted successfully',res.data)
  //         }
  //       }catch(error)
  //       {
  //         console.log('error message',error);
  //         message.error('error message',error)
  //       }

  //     }).catch(err => console.log('catched  error',err))
  // };

  return (
    <MenuIngredientContext.Provider value={state}>
      <MenuIngredientActionContext.Provider
        value={{ createMenuIngredient, getMenuIngredient ,deleteMenuIngredient}}
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