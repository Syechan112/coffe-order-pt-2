import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_FLAG = 'brewflow_table_selected';

/**
 * Locks browser back navigation when no table is selected yet.
 *
 * - If `?table=` is in the URL (QR scan) → table is locked, back allowed.
 * - If the user already picked a table (flag in sessionStorage) → back allowed.
 * - Otherwise the back button is intercepted and re-opens the table modal.
 */
export default function useTableLock({ tableParam, onReopenModal }) {
  const navigate = useNavigate();

  const tableSelected =
    Boolean(tableParam) || Boolean(window.sessionStorage.getItem(STORAGE_FLAG));

  useEffect(() => {
    if (tableSelected) return; // safe to leave menu

    // Push a marker entry so the first back pops to here instead of /cart
    window.history.pushState({ tableLock: true }, '', window.location.href);

    const handlePopState = (event) => {
      if (event.state?.tableLock) {
        // Consumed the marker entry — stay put and reopen modal
        window.history.pushState(null, '', window.location.href);
        onReopenModal();
        return;
      }

      // Block any attempt to leave /menu while modal is still needed
      event.preventDefault();
      event.returnValue = '';
      onReopenModal();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [tableSelected, navigate, onReopenModal]);
}

export function clearTableSelectedFlag() {
  window.sessionStorage.removeItem(STORAGE_FLAG);
}
