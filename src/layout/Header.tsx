import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { useUser } from '../hooks/useUser';
import logo from '@/assets/img/logo.png';
import { useGlobalStore } from '../store/store';
import { UserType } from '@/enum';
export function Header() {
  const { onLogout } = useUser();
  const [userName, userInfo] = useGlobalStore((state) => [
    state.userName,
    state.userInfo,
  ]);
  function isStudent() {
    return userInfo.type === UserType.STUDENT;
  }

  return (
    <header className="flex h-16 place-content-between items-center bg-green-50 px-[10px] text-black">
      <div className=" flex items-center justify-center">
        <img src={logo} alt="logo" className="h-10" />
        <span>{isStudent() ? userInfo.studentName : userName}</span>
      </div>
      <Button type="primary" onClick={onLogout} icon={<PoweroffOutlined />}>
        退出
      </Button>
    </header>
  );
}
