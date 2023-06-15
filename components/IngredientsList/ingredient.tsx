import { Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGet, useMutate } from 'restful-react';

const { Option } = Select;
  const MenuDropdown = ({recvievedMenuId} ) => {
  const [menuItems, setMenuItems] = useState([]);
  const { mutate: createMenuIngredientHttp } = useMutate({
    path: 'MenuIngredientService/CreateMenuIngredient',
    verb: 'POST',
  });
interface IMenuIngredient
{
  ingredientId:string;
   menuId:string;
   quantityPerServing:number;
} 

  ///Api function calls
  const addMenuIngredient = async (payload) => {
    console.log(payload);
   var ingredientMenu : IMenuIngredient = 
   {
     ingredientId: payload,
     menuId: recvievedMenuId,
     quantityPerServing:3 
   }
    console.log("create menuIngredients vzalues",ingredientMenu);
    try {
      console.log("CREATING  Menu");
      const response = await createMenuIngredientHttp(ingredientMenu);
      console.log("response::", response.error);
      if (response.success) {
        message.success("User successfully created");

        // push('/login'); // Redirect to the login form
      } else {
        message.error("Failed to create Menu");
      }
    } catch (error) {
      console.error("Menu creation error:", error);
      message.error("An error occurred during menu creation");
    }
  };

  const { data: menuData, refetch: getMenuHttp } = useGet({
    path: 'IngredientService/GetAll',
  });

  useEffect(() => {
    if (menuData && menuData.result && menuData.result.items) {
      setMenuItems(menuData.result.items);
    }
  }, [menuData]);

  const handleItemClick = (menuItem) => {
    // Handle the click event for a menu item
    console.log('Clicked:', menuItem);      
  };

  return (
    <div>
    <Select onChange={addMenuIngredient} placeholder="Select a menu item">
      {menuItems.map((menuItem) => (
        <Option key={menuItem.id} value={menuItem.id}>
          {menuItem.name}
        </Option>
      ))}
    </Select>
  </div>
  );
};

export default MenuDropdown;
