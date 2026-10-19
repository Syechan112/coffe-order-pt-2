
import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Info,
  XCircle,
  AlertTriangle,
  X,
} from 'lucide-react';
import useBrewStore from '../store/useBrewStore';

const TOAST_DURATION = 4000;

const toastStyles = {
  success: {
    icon: CheckCircle2,
    color: 'text-emerald-600',
    progress: 'bg-emerald-500',
    title: 'Berhasil',
  },
  info: {
    icon: Info,
    color: 'text-blue-500',
    progress: 'bg-blue-500',
    title: 'Informasi',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-500',
    progress: 'bg-amber-500',
    title: 'Perhatian',
  },
  error: {
    icon: XCircle,
    color: 'text-rose-500',
    progress: 'bg-rose-500',
    title: 'Terjadi Kesalahan',
  },
};

export default function NotificationToast() {
  const notification = useBrewStore((s) => s.notification);
  const clearNotification = useBrewStore(
    (s) => s.clearNotification
  );

  const [progress, setProgress] = useState(100);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!notification) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setProgress(100);

    const startedAt = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setProgress(
        Math.max(0, 100 - (elapsed / TOAST_DURATION) * 100)
      );
    }, 40);

    const dismissTimer = setTimeout(() => {
      setVisible(false);
      clearNotification();
    }, TOAST_DURATION);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(dismissTimer);
    };
  }, [notification, clearNotification]);

  if (!notification) return null;

  const style =
    toastStyles[notification.type] || toastStyles.info;

  const Icon = style.icon;

  const dismiss = () => {
    setVisible(false);
    clearNotification();
  };

  return (
    <div
      className="
        pointer-events-none fixed inset-x-0 bottom-5 z-[100]
        flex justify-center px-4
        sm:inset-x-auto sm:right-6 sm:justify-end sm:px-0
      "
      aria-live="polite"
    >
      <div
        key={notification.id}
        role={notification.type === 'error' ? 'alert' : 'status'}
        className={`
          pointer-events-auto relative w-full max-w-[390px]
          overflow-hidden rounded-2xl
          border border-slate-200/80
          bg-white shadow-[0_12px_40px_-16px_rgba(15,23,42,0.22)]
          transition-all duration-300 ease-out
          dark:border-slate-700 dark:bg-slate-900
          ${
            visible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-3 opacity-0'
          }
        `}
      >
        <div className="flex items-center gap-3.5 px-4 py-4">
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-blue-50
              dark:bg-blue-500/10
            "
          >
            <Icon
              size={19}
              strokeWidth={2}
              className={style.color}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold tracking-tight text-slate-900 dark:text-white">
              {style.title}
            </p>

            <p className="mt-1 break-words text-[12px] leading-[1.6] text-slate-500 dark:text-slate-400">
              {notification.message}
            </p>
          </div>

          <button
            type="button"
            onClick={dismiss}
            aria-label="Tutup notifikasi"
            className="
              flex h-8 w-8 shrink-0 items-center justify-center
              rounded-full text-slate-400
              transition-colors duration-200
              hover:bg-slate-100 hover:text-slate-700
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-blue-500
              dark:hover:bg-slate-800 dark:hover:text-white
            "
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        <div className="h-[3px] bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full ${style.progress}`}
            style={{
              width: `${progress}%`,
              transition: 'width 40ms linear',
            }}
          />
        </div>
      </div>
    </div>
  );
}
