import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const PopupForm = ({ visible, onCancel, onSubmit }) => {
    const [form] = Form.useForm();
  
    const handleSubmit = (values) => {
      onSubmit(values);
      form.resetFields();
    };
  
    return (
      <Modal
        title="Submit Form Data"
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: 'Please enter the ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="group"
            label="Group"
            rules={[{ required: true, message: 'Please enter the group' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  