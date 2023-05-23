import { useEffect, useState } from 'react';
import {
  getUserList,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '@/api/index';
import { SearchForm } from './form/SearchForm';
import {
  Button,
  Form,
  Modal,
  message as $message,
  Pagination,
  Table,
  Popconfirm,
} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AddEditForm, getDefaultFormValue } from './form/AddEditForm';
import { UserFormValue, UserPageListItem, UserSearchFormValue } from '@/types';
import { DialogType, UserType } from '@/enum';
import { USER_TYPE } from '@/constant';

export default function UserManage() {
  // 搜索表单
  const [searchform] = Form.useForm();
  const defaultSearchFormValue = {
    username: '',
    type: '',
  };
  const [searchFormValue, setSearchFormValue] = useState<UserSearchFormValue>(
    defaultSearchFormValue,
  );
  function onSubmit(value: UserSearchFormValue) {
    setSearchFormValue(value);
    setCurrentPage(1);
    getList({ ...value, currentPage: currentPage, pageSize: 12 });
  }
  // 分页
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([] as UserPageListItem[]);
  function onPageChange(page: number) {
    setCurrentPage(page);
    getList({ ...searchFormValue, currentPage: page, pageSize: 12 });
  }

  useEffect(() => {
    getList({
      ...defaultSearchFormValue,
      currentPage: currentPage,
      pageSize: 12,
    });
  }, []);
  async function getList(searchFormValue: any) {
    const data = await getUserList(searchFormValue);
    setList(data.data.data);
    setTotal(data.data.total);
  }

  // 弹框
  // 用于编辑时的id
  const [currentId, setCurrentId] = useState(0);
  const [type, setType] = useState<DialogType>(DialogType.ADD);
  const [formValue, setFormValue] = useState(getDefaultFormValue());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addEditform] = Form.useForm();
  async function onDelete(id: number) {
    const { message } = await deleteUser(id);
    $message.success(message);
    getList(searchFormValue);
  }
  const onOpenDialog = async (type: DialogType, id?: number) => {
    setIsModalOpen(true);
    if (type === DialogType.ADD) {
      setType(DialogType.ADD);
      setFormValue(getDefaultFormValue());
    } else {
      setType(DialogType.EDIT);
      setCurrentId(id!);
      const { data } = await getUser(id!);
      // setFormValue({
      //   studentName: data.studentName,
      //   studentNum: data.studentNum,
      // });
    }
  };

  const onOkHandle = async () => {
    addEditform
      .validateFields()
      .then(async (value: UserFormValue) => {
        let message = '';
        if (type === DialogType.ADD) {
          // 只能新增管理员用户
          const data = await createUser({ ...value, type: UserType.ADMIN });
          message = data.message;
        } else {
          const data = await updateUser(currentId, value);
          message = data.message;
        }
        getList({ ...searchFormValue, currentPage: 1, pageSize: 12 });
        setIsModalOpen(false);
        $message.open({ type: 'success', content: message });
      })
      .catch(() => {
        console.log('err');
      });
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} searchform={searchform} />
      <div className=" mt-2 rounded bg-white p-2">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => onOpenDialog(DialogType.ADD)}
        >
          新增
        </Button>
      </div>
      <div className=" mt-2 rounded bg-white p-2">
        <Table
          rowKey="id"
          columns={[
            {
              title: '用户名',
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: '类型',
              dataIndex: 'type',
              key: 'type',
              render(type) {
                return (
                  <div>
                    {(USER_TYPE.find((item) => item.value === type) ?? {})
                      .label ?? '--'}
                  </div>
                );
              },
            },
            {
              title: '操作',
              dataIndex: 'operate',
              key: 'operate',
              render(_, record: any) {
                return (
                  <Popconfirm
                    title="删除用户"
                    description={
                      <div>
                        {record.type === UserType.STUDENT &&
                          '该用户绑定了学生，若删除同时也会删除对应学生，'}
                        <br />
                        是否确定删除该账户?
                      </div>
                    }
                    onConfirm={() => onDelete(record.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      danger
                      icon={<DeleteOutlined className=" ml-2 cursor-pointer" />}
                    >
                      删除
                    </Button>
                  </Popconfirm>
                );
              },
            },
          ]}
          dataSource={list}
          pagination={false}
        />
        <Pagination
          current={currentPage}
          pageSize={12}
          onChange={onPageChange}
          className=" mt-2"
          total={total}
        />
      </div>
      <Modal
        title={type}
        open={isModalOpen}
        onOk={onOkHandle}
        destroyOnClose
        onCancel={() => setIsModalOpen(false)}
      >
        <AddEditForm form={addEditform} formValue={formValue} type={type} />
      </Modal>
    </>
  );
}
