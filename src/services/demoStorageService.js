import { getSeedState, SCHEMA_VERSION } from '../data/seedData';

const STORAGE_KEY = 'brewflow_state';

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getSeedState();
    const parsed = JSON.parse(raw);
    if (parsed?.schemaVersion !== SCHEMA_VERSION || !Array.isArray(parsed.orders)) {
      return getSeedState();
    }
    return parsed;
  } catch {
    return getSeedState();
  }
}

export function saveState(state) {
  const nextState = { ...state, schemaVersion: SCHEMA_VERSION, lastUpdated: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  return nextState;
}
export function resetState() {
  const seed = getSeedState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

export function subscribeToStorage(callback) {
  const handler = (event) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        const next = JSON.parse(event.newValue);
        if (next?.schemaVersion === SCHEMA_VERSION) callback(next);
      } catch {
        // Corrupt external value ignored; next reload falls back safely.
      }
    }
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

export { STORAGE_KEY };
