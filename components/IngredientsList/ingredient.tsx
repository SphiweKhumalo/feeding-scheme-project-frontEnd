import { Select, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGet, useMutate } from 'restful-react';
import { useMenuIngredient } from '../../MenuIngredients-copy-original';

const { Option } = Select;

const MenuDropdown = ({ recvievedMenuId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const{MenuIngredientState}=useMenuIngredient();
  const [selectedValue, setSelectedValue] = useState(null); // Add selectedValue state
  const { mutate: createMenuIngredientHttp } = useMutate({
    path: 'MenuIngredientService/CreateMenuIngredient',
    verb: 'POST',
  });

  const addMenuIngredient = async (payload) => {
    var ingredientMenu = {
      ingredientId: payload,
      menuId: recvievedMenuId,
      quantityPerServing: 3,
    };
    try {
      console.log("Creating Menu Ingredient:", ingredientMenu);
      const response = await createMenuIngredientHttp(ingredientMenu);
      console.log("Response:", response);
      if (response.success) {
        message.success('Ingredient added successfully');
        // Do something after successfully adding the ingredient
      } else {
        message.error('Failed to add ingredient');
      }
    } catch (error) {
      console.error('Ingredient addition error:', error);
      message.error('Ingredient is already added to menu');
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

  const handleSubmit = () => {
    if (selectedValue) { // Check if a value is selected
      addMenuIngredient(selectedValue);
    } else {
      message.error('Please select an ingredient');
    }
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value); // Update selectedValue state
  };

  return (
    <div>
      <Select id="menuSelect" placeholder="Select a menu item" onChange={handleSelectChange} value={selectedValue}>
        {menuItems.map((menuItem) => (
          <Option key={menuItem.id} value={menuItem.id}>
            {menuItem.name}
          </Option>
        ))}
      </Select>
      <Button type="primary" onClick={handleSubmit}>
        Add Ingredient
      </Button>
    </div>
  );
};

export default MenuDropdown;
