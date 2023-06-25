import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useMutate } from 'restful-react';
import { message } from 'antd';

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
  const [form] = useForm<FormData>();
  const { mutate: createBatchInformationHttp } = useMutate({
    path: 'BatchInformationService/CreateBatchInformation',
    verb: 'POST',
  });

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      createBatchInformationHttp(values)
        .then((response) => {
          if (response.success) {
            message.success('BatchInformation successfully created');
          } else {
            message.error('Failed to create BatchInformation');
          }
        })
        .catch((error) => {
          console.error('BatchInformation creation error:', error);
          message.error('An error occurred during BatchInformation creation');
        });
      form.resetFields();
      onClose();
    });
  };

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
          rules={[{ required: true, message: 'Please enter the ingredient ID' }]}
        >
          <Input />
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
