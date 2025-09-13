import { useCallback } from 'react';

export function useAuth() {
  // Verifica se existe um token salvo no localStorage
  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem('token');
    return !!token;
  }, []);

  return { isAuthenticated };
}
