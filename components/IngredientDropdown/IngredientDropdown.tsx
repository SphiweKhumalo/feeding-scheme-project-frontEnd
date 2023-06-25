import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useGet } from 'restful-react';
import { useIngredient } from '../../Providers/Ingredients';
import { Ingredient } from '../../Providers/Ingredients/context';

interface IngredientDropdownProps {
  onSelect: (value: string) => void;
}

const IngredientDropdown: React.FC<IngredientDropdownProps> = ({ onSelect }) => {
  const { getIngredients, IngredientState } = useIngredient();
  const [ingredient, setIngredients] = useState<Ingredient[]>();

  const handleChange = (value: string) => {
    onSelect(value);
  };

  useEffect(() => {
    getIngredients();
      console.log('ingre', IngredientState);
      setIngredients(IngredientState);
    
  },[]);

  console.log('inger', IngredientState);

  return (
    <Select placeholder="Select an ingredient" onChange={handleChange}>
      {/* Map over the ingredient state to render the dropdown options */}
      {IngredientState?.map((ingredient: Ingredient) => (
        <Select.Option key={ingredient.id} value={ingredient.id}>
          {ingredient.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default IngredientDropdown;
