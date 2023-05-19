import { Button, Form, Input } from 'antd';
import React from 'react'; // Form的一部分输入值类型定义 或者 （名称/值
import { useUser } from '../hooks/useUser';

export const Login: React.FC = () => {
  const { onLogin } = useUser();
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form
        name="login"
        onFinish={onLogin}
        autoComplete="off"
        labelCol={{ span: 8 }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
