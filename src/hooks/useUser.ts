import { login } from '../api/index';
import { message as $message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '@/store/store';
import { LoginFromValue } from '@/types';

export function useUser() {
  const navigate = useNavigate();
  const [setToken, setUserName, setUserInfo, reset] = useGlobalStore(
    (state) => [
      state.setToken,
      state.setUserName,
      state.setUserInfo,
      state.reset,
    ],
  );
  const onLogin = async (formValue: LoginFromValue) => {
    const {
      message,
      data: { accessToken, userInfo },
    } = await login({ ...formValue, type: 1 }); // 默认后台管理员登录
    $message.open({ type: 'success', content: message });
    setToken(`Bearer ${accessToken}`);
    setUserName(formValue.username);
    setUserInfo(userInfo);
    navigate('/');
  };
  const onLogout = () => {
    reset();
    navigate('/login');
    $message.success('已退出');
  };
  return {
    onLogin,
    onLogout,
  };
}
