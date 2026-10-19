
export function Badge({
  children,
  variant = 'neutral',
  className = '',
}) {
  const styles = {
    neutral: 'bg-white text-stone-600 border-stone-200',
    primary: 'bg-stone-100 text-stone-800 border-stone-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    dark: 'bg-stone-900 text-white border-transparent',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[variant] || styles.neutral
      } ${className}`}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary:
      'bg-stone-900 text-white hover:bg-stone-800 active:bg-stone-950',
    secondary:
      'border border-stone-200 bg-white text-stone-800 hover:bg-stone-50 active:bg-stone-100',
    outline:
      'border border-stone-200 bg-transparent text-stone-800 hover:bg-stone-50 active:bg-stone-100',
    ghost:
      'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900',
    danger:
      'border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100',
    dark:
      'bg-stone-900 text-white hover:bg-stone-800 active:bg-stone-950',
  };

  const sizes = {
    sm: 'gap-1.5 rounded-lg px-3 py-1.5 text-xs',
    md: 'gap-2 rounded-xl px-4 py-2 text-sm',
    lg: 'gap-2.5 rounded-xl px-6 py-2.5 text-base',
    icon: 'rounded-lg p-2',
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/35 p-4 backdrop-blur-[2px] animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        onClick={(event) => event.stopPropagation()}
        className={`relative z-10 flex max-h-[90vh] w-full ${maxWidth} flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white text-stone-900 shadow-2xl`}
      >
        {title && (
          <div className="flex shrink-0 items-center justify-between border-b border-stone-100 px-5 py-4 sm:px-6">
            <h3 className="text-base font-semibold tracking-tight text-stone-900 sm:text-lg">
              {title}
            </h3>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="overflow-y-auto p-5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
