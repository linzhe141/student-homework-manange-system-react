import { GLOBAL_STORAGE_KEY } from '@/config';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  token: string;
  userName: string;
};

type Actions = {
  setToken: (token: string) => void;
  setUserName: (userName: string) => void;
  reset: () => void;
};
const initState: State = {
  token: '',
  userName: '',
};
// state immuatable
// ts写法多一对括号，柯里化
export const useGlobalStore = create<State & Actions>()(
  // storeage中间件
  persist(
    (set) => ({
      ...initState,
      setToken: (token) => set({ token }),
      setUserName: (userName) => set({ userName }),
      reset: () => {
        set(initState);
      },
    }),
    {
      name: GLOBAL_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const getJSONStorage = () => {
  return JSON.parse(
    localStorage.getItem(GLOBAL_STORAGE_KEY) ??
      JSON.stringify({ state: initState }),
  ) as { state: State };
};
