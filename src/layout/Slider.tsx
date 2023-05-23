import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState, useEffect } from 'react';
import { getMenuItems } from '../router/router';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Slider() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState('');
  const menuItems = getMenuItems();
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);
  return (
    <Menu
      className=" w-[200px]"
      onClick={onClick}
      selectedKeys={[current]}
      mode="inline"
      items={menuItems}
    />
  );
}
