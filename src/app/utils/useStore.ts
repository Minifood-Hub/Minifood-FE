import { create } from 'zustand';

type testStore = {
  count: number;
  increase: () => void;
};

const useTestStore = create<testStore>((set) => ({
  count: 1,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));

export default useTestStore;
