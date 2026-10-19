import { useEffect, useState } from 'react';
import useBrewStore from '../store/useBrewStore';
import { ORDER_STATES } from '../services/orderTransitions';

export default function usePickupDisplay() {
  const { orders } = useBrewStore();
  const [clock, setClock] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const preparing = orders.filter((order) =>
    [ORDER_STATES.CONFIRMED, ORDER_STATES.PREPARING].includes(order.status)
  );
  const ready = orders.filter((order) => order.status === ORDER_STATES.READY);

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      // Fullscreen tidak tersedia atau ditolak browser.
    }
  };

  return { clock, isFullscreen, preparing, ready, toggleFullscreen };
}
