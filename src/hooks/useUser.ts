import { login } from '../api/index';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '@/store/store';
import { LoginFromValue } from '@/types';

export function useUser() {
  const navigate = useNavigate();
  const [setToken, setUserName, reset] = useGlobalStore((state) => [
    state.setToken,
    state.setUserName,
    state.reset,
  ]);
  const onLogin = async (formValue: LoginFromValue) => {
    const data = await login(formValue);
    message.open({ type: 'success', content: data.message });
    setToken(`Bearer ${data.data.accessToken}`);
    setUserName(formValue.username);
    navigate('/');
  };
  const onLogout = () => {
    reset();
    navigate('/login');
    message.success('已退出');
  };
  return {
    onLogin,
    onLogout,
  };
}
