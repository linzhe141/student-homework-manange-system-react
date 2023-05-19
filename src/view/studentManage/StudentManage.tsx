import { useEffect, useState } from 'react';
import {
  getStudentList,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} from '../../api/index';
import { SearchForm } from './form/SearchForm';
import { Button, Form, Modal, message as $message } from 'antd';
import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { AddEditForm, defaultFormValue } from './form/AddEditForm';
import {
  DialogType,
  StudentFormValue,
  StudentPageListItem,
  StudentSearchFormValue,
} from '@/types';
import { List } from './list/List';

export function StudentManage() {
  // 搜索表单
  const [searchform] = Form.useForm();
  const defaultSearchFormValue = {
    studentName: '',
    studentNum: '',
  };
  const [searchFormValue, setSearchFormValue] =
    useState<StudentSearchFormValue>(defaultSearchFormValue);
  function onSubmit(value: StudentSearchFormValue) {
    setSearchFormValue(value);
    getList(value);
  }
  // 分页
  const [list, setList] = useState([] as StudentPageListItem[]);

  useEffect(() => {
    getList(defaultSearchFormValue);
  }, []);
  async function getList(searchFormValue: any) {
    const data = await getStudentList(searchFormValue);
    setList(data.data);
  }

  // 弹框
  // 用于编辑时的id
  const [currentId, setCurrentId] = useState(0);
  const [title, setTitle] = useState<DialogType>('新增');
  const [type, setType] = useState<'add' | 'edit'>('add');
  const [formValue, setFormValue] = useState(defaultFormValue());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addEditform] = Form.useForm();
  async function onDelete(id: number) {
    const { message } = await deleteStudent(id);
    $message.success(message);
    getList(searchFormValue);
  }
  const onOpenDialog = async (type: 'add' | 'edit', id?: number) => {
    setIsModalOpen(true);
    if (type === 'add') {
      setTitle('新增');
      setType('add');
      setFormValue(defaultFormValue());
    } else {
      //
      setTitle('编辑');
      setType('edit');
      setCurrentId(id!);
      const { data } = await getStudent(id!);
      setFormValue({
        studentName: data.studentName,
        studentNum: data.studentNum,
      });
    }
  };

  const onOkHandle = async () => {
    addEditform
      .validateFields()
      .then(async (value: StudentFormValue) => {
        let message = '';
        let success = false;
        if (title === '新增') {
          const data = await createStudent(value);
          message = data.message;
          success = data.success;
        } else {
          const data = await updateStudent(currentId, value);
          message = data.message;
          success = data.success;
        }
        if (success) {
          getList(searchFormValue);
          setIsModalOpen(false);
          $message.open({ type: 'success', content: message });
        }
      })
      .catch(() => {
        console.log('err');
      });
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} searchform={searchform} />
      <div className=" mt-3 rounded bg-gray-200 p-3">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => onOpenDialog('add')}
        >
          新增
        </Button>
      </div>
      <div>
        <List list={list} onOpenDialog={onOpenDialog} onDelete={onDelete} />
      </div>
      <Modal
        title={title}
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
