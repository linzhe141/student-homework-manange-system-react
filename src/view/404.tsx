import NotFoundImg from '@/assets/img/404.png';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center justify-center">
      <img className=" w-1/3" src={NotFoundImg} alt="404" />
      <Button type="primary" onClick={() => navigate('/')}>
        返回首页
      </Button>
    </div>
  );
}
