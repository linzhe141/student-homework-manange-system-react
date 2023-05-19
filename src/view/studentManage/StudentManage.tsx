import { useEffect, useState } from 'react';
import {
  getStudentList,
  createStudent,
  getStudent,
  updateStudent,
} from '../../api/index';
import { SearchForm } from './form/SearchForm';
import { Button, Form, Modal, message as $message } from 'antd';
import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { AddEditForm, getFormValue } from './form/AddEditForm';
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
  const [searchFormValue, setSearchFormValue] =
    useState<StudentSearchFormValue>({
      studentName: '',
      studentNum: '',
    });
  function onSubmit(value: StudentSearchFormValue) {
    setSearchFormValue(value);
    getList();
  }
  // 分页
  const [list, setList] = useState([] as StudentPageListItem[]);

  useEffect(() => {
    getList();
  }, []);
  async function getList() {
    const data = await getStudentList(searchFormValue);
    setList(data.data);
  }

  // 弹框
  // 用于编辑时的id
  const [currentId, setCurrentId] = useState(0);
  const [title, setTitle] = useState<DialogType>('新增');
  const [formValue, setFormValue] = useState(getFormValue());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addEditform] = Form.useForm();
  const onOpenDialog = async (type: 'add' | 'edit', id?: number) => {
    setIsModalOpen(true);
    if (type === 'add') {
      setTitle('新增');
      setFormValue(getFormValue());
    } else {
      //
      setTitle('编辑');
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
          getList();
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
        <List list={list} onOpenDialog={onOpenDialog} />
      </div>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={onOkHandle}
        destroyOnClose
        onCancel={() => setIsModalOpen(false)}
      >
        <AddEditForm form={addEditform} formValue={formValue} />
      </Modal>
    </>
  );
}
