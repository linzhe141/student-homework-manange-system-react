import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import Slider from './Slider';

export function Layout() {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="">
          <Slider />
        </div>
        <div className="flex-1 bg-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
