import { Layout } from '@/layout/Layout';
import { Content } from '@/layout/Content';
import { Login } from '@/page/Login';
import { NotFound } from '@/view/404';
import { StudentManage } from '@/view/studentManage/StudentManage';
import UserManage from '@/view/userManage/UserManage';
import { useRoutes, RouteObject, Navigate, Outlet } from 'react-router-dom';
type RouteMeta = {
  label: string;
  key: string;
};
const staticRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

export const menuRoutes: any = [
  {
    path: '/StudentManage',
    meta: {
      label: '学生管理',
      key: '/StudentManage',
    },
    element: (
      <Content>
        <StudentManage />
      </Content>
    ),
  },
  {
    path: '/UserManage',
    meta: {
      label: '用户管理',
      key: '/UserManage',
    },
    element: (
      <Content>
        <UserManage />
      </Content>
    ),
  },
  {
    path: '/test1',
    meta: {
      label: 'test1',
      key: '/test1',
    },
    element: (
      <Content>
        <div>test1</div>
      </Content>
    ),
  },
  {
    path: '/test2',
    meta: {
      label: 'test2',
      key: '/test2',
    },
    element: <Outlet />,
    children: [
      {
        path: '/test2/test3',
        meta: {
          label: 'test3',
          key: '/test2/test3',
        },
        element: (
          <Content>
            <div>test3</div>
          </Content>
        ),
      },
    ],
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
    children: menuRoutes,
  },
];
const errorRotues: RouteObject[] = [
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];
const rootRoutes = [...staticRoutes, ...authRotes, ...errorRotues];
export function Router() {
  return useRoutes(rootRoutes);
}
// export function getMenuItems(data = menuRoutes, result = [] as any) {
//   const meunItem = {
//     key: '',
//     label: '',
//     children: [],
//   };
//   data.forEach((item: any) => {
//     meunItem.key = item.meta.key;
//     meunItem.label = item.meta.label;
//     result.push(meunItem);
//     if (item.children?.length) {
//       meunItem.children = getMenuItems(item.children, result);
//     }
//   });
//   return result;
// }
export function getMenuItems() {
  const result: any = [];
  menuRoutes.forEach((menuRoute: any) => {
    result.push(getMenuItem(menuRoute));
  });
  function getMenuItem(data: any, pData: any = null) {
    const menuItem: any = {
      key: data.meta.key,
      label: data.meta.label,
      children: null,
    };
    if (pData) {
      pData.children.push(menuItem);
    }
    if (data.children?.length) {
      menuItem.children = [];
      data.children.forEach((el: any) => {
        getMenuItem(el, menuItem);
      });
    }
    return menuItem;
  }
  return result;
}
