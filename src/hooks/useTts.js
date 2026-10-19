import { useEffect, useRef } from 'react';
import useBrewStore from '../store/useBrewStore';
import { ORDER_STATES } from '../services/orderTransitions';

/**
 * Text-to-speech for the pickup display.
 *
 * When an order transitions to READY, announce its number aloud.
 * Skips an order once announced to avoid duplicate calls.
 */
const ANNOUNCED_KEY = 'brewflow_tts_announced_ready';

export default function useTts() {
  const { orders } = useBrewStore();
  const spokenRef = useRef(new Set());

  // Hydrate announced set from localStorage so reloads don't re-speak.
  if (spokenRef.current.size === 0) {
    try {
      const saved = JSON.parse(localStorage.getItem(ANNOUNCED_KEY) || '[]');
      if (Array.isArray(saved)) saved.forEach((id) => spokenRef.current.add(id));
    } catch {
      /* ignore parse errors */
    }
  }

  const announce = (message, onEnd) => {
    if (!('speechSynthesis' in window)) return;

    // Cancel any pending speech so announcements don't queue.
    window.speechSynthesis.cancel();

    const utterance = new window.SpeechSynthesisUtterance(message);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    if (onEnd) utterance.addEventListener('end', onEnd);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const readyOrders = orders.filter((o) => o.status === ORDER_STATES.READY);

    readyOrders.forEach((order) => {
      if (spokenRef.current.has(order.id)) return;

      spokenRef.current.add(order.id);
      try {
        const saved = JSON.parse(localStorage.getItem(ANNOUNCED_KEY) || '[]');
        if (Array.isArray(saved)) {
          localStorage.setItem(
            ANNOUNCED_KEY,
            JSON.stringify([...new Set([...saved, order.id])])
          );
        }
      } catch {
        /* ignore write errors */
      }

      const number = String(order.orderNumber).padStart(2, '0');
      const table = order.table ? `, meja ${order.table}` : '';
      const msg = `Pesanan nomor ${number}${table} telah siap diambil.`;
      announce(msg);
    });
  }, [orders]);

  return { announce };
}
