import { StudentPageListItem } from '@/types';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';

type Props = {
  list: StudentPageListItem[];
  onOpenDialog: (type: 'add' | 'edit', id: number) => void;
};
export const List: React.FC<Props> = ({ list, onOpenDialog }) => {
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
            <DeleteOutlined className=" ml-2 cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
};
