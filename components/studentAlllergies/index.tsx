import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, Switch, Select } from 'antd';
import { useIngredient } from '../../Providers/Ingredients';
import { useGet, useMutate } from 'restful-react';
import { useStudentAllergies } from '../../Providers/StudentAllergies';


const CreateStudentAllergyModal = ({ studentId, visible, onCancel, onSubmit }) => {
  const{createStudentAllergies,StudentAllergiesCreated}  =useStudentAllergies();
  const { mutate: createStudentAllergiesHttp} = useMutate({
    path: 'StudentAllergiesService/Create',
    verb: 'POST',
  });


  const [form] = Form.useForm();
const{IngredientState,getIngredients}=useIngredient();


  const  handleSubmit = async (values) => {
    values.studentId = studentId;
    onSubmit(values);
    var res = await createStudentAllergies(values);
    console.log('response',res);
    
    // form.resetFields();
  };
  
  useEffect(()=>
  {
    getIngredients();
  },[])
console.log('ingre',IngredientState);
  return (
    <Modal
      title="Create Student Allergy"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
      <Form.Item>
          <Button type="primary" htmlType="submit">
            id
          </Button>
        </Form.Item>
        <Form.Item
          name="studentId"
          label="Student ID"
          // rules={[{ required: true, message: 'Please enter the student ID' }]}
        >
        </Form.Item>
        <Form.Item
          name="ingredientId"
          label="Ingredient ID"
          rules={[{ required: true, message: 'Please select the ingredient ID' }]}
        >
          <Select>
            {IngredientState.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>
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
        <Form.Item
          name="dateAdded"
          label="Date Added"
          rules={[{ required: true, message: 'Please select the date added' }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="isCurrent"
          label="Is Current"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please select whether it is current or not' }]}
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Allergy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateStudentAllergyModal;
