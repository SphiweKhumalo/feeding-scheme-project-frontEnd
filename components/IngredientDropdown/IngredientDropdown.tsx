import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useGet } from 'restful-react';
import { useIngredient } from '../../Providers/Ingredients';

interface IngredientDropdownProps {
  onSelect: (value: string) => void;
}

const IngredientDropdown: React.FC<IngredientDropdownProps> = ({ onSelect }) => {
  const { data: ingredientData, refetch: getIngredientsHttp } = useGet({
    path: `IngredientService/GetAll`, // Replace 'API_URL' with your actual API endpoint for fetching ingredients
  });
  const{getIngredients,IngredientState}=useIngredient();
  const handleChange = (value: string) => {
    onSelect(value);
  };

  useEffect(()=>
  {
    getIngredients();
  },[])
  console.log('inger',IngredientState)

  return (
    <Select placeholder="Select an ingredient" onChange={handleChange}>
      {/* Map over the ingredientData to render the dropdown options */}
      {ingredientData?.result?.items.map((ingredient: any) => (
        <Select.Option key={ingredient.id} value={ingredient.id}>
          {ingredient.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default IngredientDropdown;
