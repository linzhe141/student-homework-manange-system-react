import { StudentPageListItem } from '@/types';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

type Props = {
  list: StudentPageListItem[];
  onOpenDialog: (type: 'add' | 'edit', id: number) => void;
  onDelete: (id: number) => void;
};
export const List: React.FC<Props> = ({ list, onOpenDialog, onDelete }) => {
  return (
    <div className=" pt-2">
      {list.map((item) => (
        <div
          key={item.id}
          className=" mb-2 flex  place-content-between items-center rounded bg-orange-200 p-2"
        >
          <div>
            <div>学号：{item.studentNum}</div>
            <div>姓名：{item.studentName}</div>
          </div>
          <div>
            <FormOutlined
              className=" cursor-pointer"
              onClick={() => onOpenDialog('edit', item.id)}
            />
            <Popconfirm
              title="删除学生"
              description="是否确定删除该学生，同时也会删去对应的账户?"
              onConfirm={() => onDelete(item.id)}
              okText="确定"
              cancelText="取消"
            >
              <DeleteOutlined className=" ml-2 cursor-pointer" />
            </Popconfirm>
          </div>
        </div>
      ))}
    </div>
  );
};
