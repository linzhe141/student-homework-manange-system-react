import { ALL, USER_TYPE } from '@/constant';
import { UserSearchFormValue } from '@/types';
import { Button, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd';

type Props<T> = {
  onSubmit: (value: T) => void;
  searchform: FormInstance;
};
export const SearchForm: React.FC<Props<UserSearchFormValue>> = ({
  onSubmit,
  searchform,
}) => {
  return (
    <div className="rounded bg-white p-3">
      <Form
        form={searchform}
        initialValues={{ username: '', type: '' }}
        className="flex gap-2"
        autoComplete="off"
        onFinish={onSubmit}
      >
        <Form.Item label="用户名" name="username" className="basis-[250px]">
          <Input />
        </Form.Item>
        <Form.Item label="类型" name="type" className="basis-[250px]">
          <Select placeholder="" allowClear>
            {[...ALL, ...USER_TYPE].map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
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
