import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { useUser } from '../hooks/useUser';
import logo from '@/assets/img/logo.png';
import { useGlobalStore } from '../store/store';
export function Header() {
  const { onLogout } = useUser();
  const userName = useGlobalStore((state) => state.userName);
  return (
    <header className="flex h-16 place-content-between items-center bg-green-50 px-[10px] text-black">
      <div className=" flex items-center justify-center">
        <img src={logo} alt="logo" className="h-10" />
        <span>{userName}</span>
      </div>
      <Button type="primary" onClick={onLogout} icon={<PoweroffOutlined />}>
        退出
      </Button>
    </header>
  );
}
