import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { IPersonLogin } from '../../Providers/personRegistration/AuthContext';
import { usePersons } from '../../Providers/personRegistration';
import styles from './styles.module.css';
import withAuth from './hoc/withAuth';
import Image from 'next/image';
import { Main } from 'next/document';

interface LoginFormValues {
  userNameOrEmailAddress: string;
  password: string;
}

const Login: React.FC = () => {
  const { loginPerson } = usePersons();

  const onFinish = (values: IPersonLogin) => {
    if (loginPerson) {
      loginPerson(values);
    }
  };
  
  return (
    <main className={styles.Main}>
      <h1 className={styles.heading}>Feeding Scheme</h1>
      <div className={`${styles.loginPage} ${styles.registerPage}`}>
        <Form name="normal_login" className={styles.loginForm} onFinish={onFinish}>
          <h1>Login Here</h1>
          <Form.Item name="userNameOrEmailAddress">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" rev={undefined} />}
              placeholder="Firstname"
            />
          </Form.Item>

          <Form.Item name="password">
            <Input
              prefix={<LockOutlined className="site-form-item-icon" rev={undefined} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles['login-form-button']} id="b">
              Login
            </Button>
            
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};

export default Login;
