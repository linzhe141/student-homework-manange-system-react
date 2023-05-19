import { Navigate, useLocation } from 'react-router-dom';
import { useGlobalStore } from '../store/store';

export function AuthRouter(props: { children: JSX.Element }) {
  const { pathname } = useLocation();
  const token = useGlobalStore((state) => state.token);
  // 如果跳转到login页面，则放行
  if (pathname === '/login') return props.children;
  if (!token) return <Navigate to="/login" replace />;
  return props.children;
}
