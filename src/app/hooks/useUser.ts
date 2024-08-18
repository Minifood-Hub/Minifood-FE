import { useState, useEffect } from 'react';
import { callGet } from '@/app/utils/callApi';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const data = await callGet('/api/order/users');
        setUser(data);
        setIsLoading(false);
      } catch (err) {
        console.error('클라이언트 에러', err);
        setError('유저 정보를 가져오는 데 실패했습니다.');
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, isLoading, error };
}
