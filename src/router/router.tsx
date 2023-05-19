import { Layout } from '@/layout/Layout';
import { Content } from '@/layout/Content';
import { Login } from '@/page/Login';
import { StudentManage } from '@/view/studentManage/StudentManage';
import { useRoutes, RouteObject, Navigate } from 'react-router-dom';

const staticRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

const authRotes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="test1" />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/test1',
        element: (
          <Content>
            <StudentManage />
          </Content>
        ),
      },
    ],
  },
];
const rootRoutes = [...staticRoutes, ...authRotes];
export function Router() {
  return useRoutes(rootRoutes);
}
