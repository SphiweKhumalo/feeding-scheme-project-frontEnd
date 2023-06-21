import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useGet, useMutate } from 'restful-react';
import MenuDropdown from '../../IngredientsList/ingredient';
import SupplierDropdown from '../../Suppliers/SupplierDropdown';
import IngredientDropdown from '../../IngredientDropdown/IngredientDropdown';


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
  const { data: supplierData, refetch: getSupplierssHttp } = useGet({
    path: `Supplier/GetAll`,
  });
  const [form] = useForm<FormData>();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const { supplierId, ...restValues } = values;
      const selectedIngredient = menuItems?.result?.items?.find((item) => item.id === values.ingredientId);
      const formData = {
        ingredientId: selectedIngredient?.id || '',
        supplierId: selectedSupplier,
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
    if (supplierData) {
      const suppliers = supplierData.result;
      setMenuItems(suppliers);
    }
  }, [supplierData]);

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
          name="supplierId"
          label="Supplier"
          // rules={[{ required: true, message: 'Please select a supplier' }]}
        >
          <SupplierDropdown onSelect={setSelectedSupplier} />
        </Form.Item>
        <Form.Item
          name="ingredientId"
          label="Ingredient ID"
          // rules={[{ required: true, message: 'Please enter the ingredient ID' }]}
        >
                   <IngredientDropdown onSelect={(value) => form.setFieldsValue({ ingredientId: value })} />

          {/* <Input /> */}
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
        {/* <Form.Item
          name="ingredientId"
          label="Ingredient ID" */}
           {/* // rules={[{ required: true, message: 'Please enter the ingredient ID' }]}
          > */}
         {/* <IngredientDropdown onSelect={(value) => form.setFieldsValue({ ingredientId: value })} /> */}
        {/* </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default AddBatchPopup;
