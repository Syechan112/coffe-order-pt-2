import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === '/') window.location.href = '/menu';
  }, [pathname]);
  return null;
}
