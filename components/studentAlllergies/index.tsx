import { useState } from 'react';
import { Form, Input, Button } from 'antd';

interface CreateStudentAllergyFormProps {
  onSubmit: (values: any) => Promise<void>;
}

const CreateStudentAllergyForm: React.FC<CreateStudentAllergyFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    await onSubmit(values);
    setLoading(false);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="studentId"
        label="Student ID"
        rules={[{ required: true, message: 'Please enter the student ID' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ingredientId"
        label="Ingredient ID"
        rules={[{ required: true, message: 'Please enter the ingredient ID' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="reaction"
        label="Reaction"
        rules={[{ required: true, message: 'Please enter the reaction' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="treatment"
        label="Treatment"
        rules={[{ required: true, message: 'Please enter the treatment' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Allergy
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateStudentAllergyForm;
