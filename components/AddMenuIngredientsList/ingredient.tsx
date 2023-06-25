import { Select, Button, message, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGet, useMutate } from 'restful-react';
import { useMenuIngredient } from '../../Providers/MenuIngredients';
import { IMenuIngredient } from '../../Providers/MenuIngredients/context';
import { useIngredient } from '../../Providers/Ingredients';


const { Option } = Select;

const MenuDropdown = ({ receivedMenuId }) => {
  const [ingredientItems, setIngredientItems] = useState([]);
  const{IngredientState,getIngredients}=useIngredient();
  const [quantityPerServing, setQuantityPerServing] = useState<number>(3); 
  const{menuIngredientAction,MenuIngredientState,createMenuIngredient}=useMenuIngredient();
  const [selectedValue, setSelectedValue] = useState(null); 
  const addMenuIngredient = async (payload) => {
    const ingredientMenu: IMenuIngredient = {
      ingredientId: payload,
      menuId: receivedMenuId,
      quantityPerServing: quantityPerServing,
    };
  
    try {
      console.log("Creating Menu Ingredient:", ingredientMenu);
      await createMenuIngredient(ingredientMenu); // Await the async function
      // location.reload();
    } catch (error) {
      console.error("Ingredient addition error:", error,1);
      message.error("Ingredient is already added to the menu",1);
    }
  };

  useEffect(()=>
  {
    getIngredients();
  },[])

  useEffect(() => {
    if (IngredientState) {
      setIngredientItems(IngredientState);
    }
  },[IngredientState]);

  const handleSubmit = () => {
    if (selectedValue) { // Check if a value is selected
      addMenuIngredient(selectedValue);
    } else {
      message.error('Please select an ingredient',1);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value); // Update selectedValue state
  };
  const handleQuantityChange = (e) => {
    setQuantityPerServing(e.target.value); // Update quantityPerServing state
  };

  return (
    <div>
      <Select id="menuSelect" placeholder="Select a menu item" onChange={handleSelectChange} value={selectedValue}>
        {ingredientItems.map((menuItem) => (
          <Option key={menuItem.id} value={menuItem.id}>
            {menuItem.name}
          </Option>
        ))}
      </Select>
      <Input type="number" placeholder="Quantity Per Serving" onChange={handleQuantityChange} value={quantityPerServing} />

      <Button type="primary" onClick={handleSubmit}>
        Add Ingredient
      </Button>
    </div>
  );
};

export default MenuDropdown;
