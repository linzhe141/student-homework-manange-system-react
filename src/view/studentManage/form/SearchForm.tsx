import { StudentSearchFormValue } from '@/types';
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd';

type Props<T> = {
  onSubmit: (value: T) => void;
  searchform: FormInstance;
};
export const SearchForm: React.FC<Props<StudentSearchFormValue>> = ({
  onSubmit,
  searchform,
}) => {
  return (
    <div className="rounded bg-gray-200 p-3">
      <Form form={searchform} className="flex gap-2" onFinish={onSubmit}>
        <Form.Item label="学号" name="studentNum">
          <Input />
        </Form.Item>

        <Form.Item label="姓名" name="studentName">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
