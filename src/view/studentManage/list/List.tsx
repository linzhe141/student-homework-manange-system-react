import NoData from '@/component/NoData';
import { StudentPageListItem } from '@/types';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { DialogType } from '@/enum/index';

type Props = {
  list: StudentPageListItem[];
  onOpenDialog: (type: DialogType, id: number) => void;
  onDelete: (id: number) => void;
};
export const List: React.FC<Props> = ({ list, onOpenDialog, onDelete }) => {
  return (
    <>
      {list.length > 0 ? (
        <>
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {list.map((item) => (
              <div
                key={item.id}
                className=" flex place-content-between items-center rounded bg-vuejs-200 p-2 text-white hover:bg-vuejs-300"
              >
                <div>
                  <div>学号：{item.studentNum}</div>
                  <div>姓名：{item.studentName}</div>
                </div>
                <div>
                  <FormOutlined
                    className=" cursor-pointer"
                    onClick={() => onOpenDialog(DialogType.EDIT, item.id)}
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
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};
