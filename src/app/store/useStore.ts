import { create } from 'zustand';
import { callGet } from '@/app/utils/callApi';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const data = await callGet('/api/order/users');
      set({ user: data, isLoading: false, error: null });
    } catch (err) {
      console.error('클라이언트 에러', err);
      set({ error: '유저 정보를 가져오는 데 실패했습니다.', isLoading: false });
    }
  },
}));
