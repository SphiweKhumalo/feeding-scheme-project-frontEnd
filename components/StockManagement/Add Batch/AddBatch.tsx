import { Button, DatePicker, Form, Input, Modal, Select, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useMutate } from 'restful-react';
import MenuDropdown from '../../IngredientsList/ingredient';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  ingredientId: string;
  prodDate: Date;
  expiryDate: Date;
  quantity: number;
  supplierId: string;
}

const AddBatchPopup: React.FC<PopupProps> = ({ visible, onClose, onSubmit }) => {
  const { mutate: createBatchInformationHttp } = useMutate({
    path: 'BatchInformationService/CreateBatchInformation',
    verb: 'POST',
  });

  const [form] = useForm<FormData>();
  const [menuItems, setMenuItems] = useState([]);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const { ingredientId, ...restValues } = values;
      const selectedIngredient = menuItems.find((item) => item.id === ingredientId);
      const formData = {
        ingredientId: selectedIngredient?.name || '',
        ...restValues,
      };
      createBatchInformationHttp(formData)
        .then((response) => {
          // Handle successful API response
          message.success('Batch information created successfully', response.data);
          onSubmit(formData);
          form.resetFields();
          onClose();
        })
        .catch((error) => {
          // Handle API error
          message.error('Failed to create batch information');
          console.error(error);
        });
    });
  };

  useEffect(() => {
    // Fetch the list of ingredients from the API
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('API_URL'); // Replace 'API_URL' with your actual API endpoint to fetch the menu items
        const data = await response.json();
        setMenuItems(data.menuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <Modal
      title="Add Item"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="ingredientId"
          label="Ingredient ID"
          // rules={[{ required: true, message: 'Please enter the ingredient ID' }]}
        >
          <Input />
          {/* <MenuDropdown menuItems={menuItems} /> */}
        </Form.Item>
        <Form.Item
          name="prodDate"
          label="Production Date"
          rules={[{ required: true, message: 'Please select the production date' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="expiryDate"
          label="Expiry Date"
          rules={[{ required: true, message: 'Please select the expiry date' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please enter the quantity' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="supplierId"
          label="Supplier ID"
          rules={[{ required: true, message: 'Please enter the supplier ID' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBatchPopup;
