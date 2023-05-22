import { Layout } from '@/layout/Layout';
import { Content } from '@/layout/Content';
import { Login } from '@/page/Login';
import { NotFound } from '@/page/404';
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
    element: <Navigate to="StudentManage" />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/StudentManage',
        element: (
          <Content>
            <StudentManage />
          </Content>
        ),
      },
      {
        path: '/404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <Navigate to="404" />,
      },
    ],
  },
];
const rootRoutes = [...staticRoutes, ...authRotes];
export function Router() {
  return useRoutes(rootRoutes);
}
