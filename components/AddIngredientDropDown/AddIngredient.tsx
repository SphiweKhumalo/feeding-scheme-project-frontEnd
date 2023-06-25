import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useIngredient } from '../../Providers/Ingredients';
import IngredientDropdown from '../IngredientDropdown/IngredientDropdown';
import { Ingredient } from '../../Providers/Ingredients/context';

const { Option } = Select;

export const AddIngredientForm = ({ visible, onCancel, onSubmit }) => {
  const{IngredientState,getIngredients,createIngredient} = useIngredient();
  const [form] = Form.useForm();
 
  const handleSubmit = (ingredient:Ingredient) => {
    console.log("vall",ingredient);

    createIngredient(ingredient)
    onSubmit(values);
    form.resetFields();
  };
  const handleSelectedIngredient = (selectedIngredient:string) => {
    form.setFieldsValue({ id: selectedIngredient.id });
  };
  

  return (
    <Modal title="Add ingredient" visible={visible} onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {/* <Form.Item name="id" label="ID" rules={[{ required: true, message: 'Please enter the ID' }]}> */}
          {/* <Input /> */}
          <IngredientDropdown onSelect={handleSelectedIngredient} />
        {/* </Form.Item> */}
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="group" label="Group" rules={[{ required: true, message: 'Please select the group' }]}>
          <Select>
            <Option value="Grains">Grains</Option>
            <Option value="Vegetables">Vegetables</Option>
            <Option value="Fruits">Fruits</Option>
            <Option value="DairyProducts">Dairy Products</Option>
            <Option value="Protein">Protein</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="measuringUnit"
          label="Measurement Unit"
          rules={[{ required: true, message: 'Please select the measuring unit' }]}
        >
          <Select>
            <Option value="Grams">Grams</Option>
            <Option value="Kilograms">Kilograms</Option>
            <Option value="Milliliters">Milliliters</Option>
            <Option value="Liters">Liters</Option>
            <Option value="Number">Number</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
