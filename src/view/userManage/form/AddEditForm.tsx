import { Form, Input } from 'antd';
import type { FormInstance } from 'antd';
import { UserFormValue } from '../../../types/index';
import { useEffect } from 'react';
import { DialogType } from '@/enum/index';

type Props = {
  type: DialogType;
  form: FormInstance;
  formValue: UserFormValue;
};
export const getDefaultFormValue: () => UserFormValue = () => ({
  username: '',
  password: '',
});
export const AddEditForm: React.FC<Props> = ({ form, formValue }) => {
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(formValue);
  }, [form, formValue]);
  return (
    <Form
      autoComplete="off"
      labelCol={{ span: 4 }}
      form={form}
      initialValues={getDefaultFormValue()}
      preserve={false}
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
        <Input />
      </Form.Item>
    </Form>
  );
};
