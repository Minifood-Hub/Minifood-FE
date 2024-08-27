import { useUserStore } from '../store/useStore';

export function useUser() {
  const { user, isLoading, error } = useUserStore();
  return { user, isLoading, error };
}
