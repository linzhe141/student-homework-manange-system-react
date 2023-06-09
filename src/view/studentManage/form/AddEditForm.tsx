import { Form, Input } from 'antd';
import type { FormInstance } from 'antd';
import { StudentFormValue } from '../../../types/index';
import { useEffect } from 'react';
import { DialogType } from '@/enum/index';

type Props = {
  type: DialogType;
  form: FormInstance;
  formValue: StudentFormValue;
};
export const getDefaultFormValue: () => StudentFormValue = () => ({
  studentNum: '',
  studentName: '',
});
export const AddEditForm: React.FC<Props> = ({ form, formValue, type }) => {
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(formValue);
  }, [form, formValue]);
  return (
    <Form
      autoComplete="off"
      form={form}
      initialValues={getDefaultFormValue()}
      preserve={false}
    >
      <Form.Item
        label="学号"
        hidden={type === DialogType.EDIT}
        name="studentNum"
        rules={[{ required: true, message: '请输入学号!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="姓名"
        name="studentName"
        rules={[{ required: true, message: '请输入姓名!' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
