import React, { FC, PropsWithChildren, useReducer, useContext, useEffect } from 'react';
import { INITIAL_STATE, IngredientContext, IngredientActionContext, IngredientStateContext } from './context';
import { IngredientReducer } from './reducer';
import { fetchIngredientRequestAction, createIngredientRequestAction, deleteIngredientRequestAction } from './action';
import { useGet, useMutate } from 'restful-react';
import { message } from 'antd';
import axios from 'axios';

const IngredientProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(IngredientReducer, INITIAL_STATE);
  const { mutate: createHttp } = useMutate({
    path: 'IngredientService/Create',
    verb: 'POST',
  });

  const { data: ingredientData, refetch: getIngredientsHttp } = useGet({
    path: `IngredientService/GetAll`,
  });

  const { mutate: deleteIngredientHttp } = useMutate({
    // path: 'IngredientService/Delete',
    path: `IngredientService/DeleteIngredient`,
    verb: 'DELETE',
  });





  const getIngredients = async (id: string) => {
    try {
      const response = await getIngredientsHttp();
      console.log('data', response);

      if (response.success) {
        dispatch(fetchIngredientRequestAction(response.result.items));
        console.log('result menu Ingredient', response.result);
      } else {
        message.error('Failed to get  ingredient');
      }
    } catch (error) {
      console.error(' ingredient retrieval error:', error);
      message.error('An error occurred while retrieving menu ingredient');
    }
  };


  const createIngredient = async (payload) => {
    try {
      const response = await createHttp(payload);
      if (response.success) {
        dispatch(createIngredientRequestAction(response.result));
        message.success("Ingredient added to  successfully");

      } else {
        message.error("Failed to add  ingredient");
      }
    } catch (error) {
      console.error(" creation error:", error);
      message.error("An error occurred during menu creation");
    }
  };

  // const deleteIngredient = async (menuId:string,ingredientId:string) =>
  // {
  //   console.log('menuId',menuId,ingredientId);
  //   try
  //   {
  //       const response = await deleteIngredientHttp({
  //         queryParams:{
  //           menuId:menuId,
  //           ingredientId:ingredientId
  //         }
  //       });
  //       console.log('params menuId',menuId,'ingredient',ingredientId)
  //       if (response.success) {
  //         dispatch(deleteIngredientRequestAction(response.result));
  //         message.success("Ingredient deleted to  successfully");

  //       } else {
  //         message.error("Failed to delete  ingredient");
  //       }
  //   }catch(error)
  //   {
  //     console.error(" Ingredient deletion error:", error);
  //   }
  // }
  const deleteIngredient = async (ingredientId) => {
    try {
      const response = await deleteIngredientHttp({
        queryParams: {
          ingredientId: ingredientId
        }
      });

      console.log('ingredient', ingredientId);

      if (response.success) {
        dispatch(deleteIngredientRequestAction(response.result));
        message.success("Ingredient deleted from  successfully");
      } else {
        message.error("Failed to delete  ingredient");
      }
    } catch (error) {
      console.error(" Ingredient deletion error:", error);
    }
  };

//   const deleteIngredient = async (menuId:string,ingredientId:string) =>{
//   await fetch(`https://localhost:44311/DeleteIngredient?menuId=${menuId}&ingredientId=${ingredientId}`, {
//         method: 'DELETE',
//         cache:'no-cache',
//         headers:{
//             "Content-Type": "application/json"
//         },
//     }).then( returnedResult =>{
//         returnedResult.json()
//       .then( finalData => {
//             console.log('-----print',finalData)
//             if(finalData.success){
//                 dispatch(deleteIngredientRequestAction(finalData));
//             }else if(finalData.error){
//               console.error(" Ingredient deletion error:", finalData.error);
//             }
//         })
//     })
// }









  // const deleteIngredient = async (payload) => {
  //   axios.delete(`https://localhost:44311/api/services/app/IngredientService/DeleteIngredient?menuId=${id}&ingredientId=${payload}`)
  //   .then(res =>
  //     {
  //       try
  //       {
  //         console.log('data res',res.data);
  //         if(res.data.success)
  //         {
  //           dispatch(deleteIngredientRequestAction(payload));
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
    <IngredientContext.Provider value={state}>
      <IngredientActionContext.Provider
        value={{ createIngredient, getIngredients ,deleteIngredient}}
      >
        {children}
      </IngredientActionContext.Provider>
    </IngredientContext.Provider>
  );
};

export default IngredientProvider;

function useIngredientState() {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error("useIngredientState must be used within a IngredientProvider");
  }
  return context;
}

function useIngredientAction() {
  const context = useContext(IngredientActionContext);
  if (!context) {
    throw new Error("useIngredientAction must be used within a IngredientProvider");
  }
  return context;
}

function useIngredient() {
  return {
    ...useIngredientState(),
    ...useIngredientAction(),
  };
}

export { IngredientProvider, useIngredient };