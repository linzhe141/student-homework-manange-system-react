import { PoweroffOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import logo from '@/assets/img/logo.png';
import { useGlobalStore } from '../store/store';
import { UserType } from '@/enum';
import ImageView from '@/component/ImageView';
import defaultUserAvatarImg from '@/assets/img/default-user-avatar.png';
export function Header() {
  const { onLogout } = useAuth();
  const [userName, userInfo] = useGlobalStore((state) => [
    state.userName,
    state.userInfo,
  ]);
  function isStudent() {
    return userInfo.type === UserType.STUDENT;
  }

  return (
    <header className="flex h-16 items-center justify-between bg-green-50 px-[10px] text-black">
      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" className="h-10" />
      </div>
      <div className="flex items-center">
        <span className="mr-2">
          用户:
          {isStudent() ? userInfo.studentName : userName}
        </span>
        <div className="mr-2">
          <ImageView
            width="40px"
            src={userInfo.avatarImg}
            noData={
              <img
                width={40}
                className="rounded-[50%]"
                src={defaultUserAvatarImg}
                alt="avatar"
              />
            }
          />
        </div>
        <PoweroffOutlined onClick={onLogout} />
      </div>
    </header>
  );
}
