
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  User,
  Briefcase,
  Coffee,
  TrendingUp,
  Monitor,
  Settings,
  Check,
} from 'lucide-react';
import useBrewStore from '../store/useBrewStore';

export const roleRouteMap = {
  'role-customer': { path: '/menu', label: 'Customer' },
  'role-cashier': { path: '/cashier', label: 'Cashier' },
  'role-barista': { path: '/barista', label: 'Barista' },
  'role-display': { path: '/display', label: 'Pickup Display' },
  'role-owner': { path: '/owner', label: 'Owner' },
  'role-demo': { path: '/demo', label: 'Demo Control' },
};

const roles = [
  { id: 'role-customer', label: 'Customer', icon: User },
  { id: 'role-cashier', label: 'Cashier', icon: Briefcase },
  { id: 'role-barista', label: 'Barista', icon: Coffee },
  { id: 'role-display', label: 'Pickup Display', icon: Monitor },
  { id: 'role-owner', label: 'Owner', icon: TrendingUp },
  { id: 'role-demo', label: 'Demo Control', icon: Settings },
];

function useRoleSelection() {
  const { activeRole, setActiveRole } = useBrewStore();
  const navigate = useNavigate();

  const selectRole = (id) => {
    const route = roleRouteMap[id];

    if (!route) return;

    setActiveRole(id);
    navigate(route.path);
  };

  return { activeRole, selectRole };
}

export default function RoleSwitcher() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const { activeRole, selectRole } = useRoleSelection();

  const current =
    roles.find((role) => role.id === activeRole) || roles[0];

  const CurrentIcon = current.icon;

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex h-10 items-center gap-2 rounded-lg border px-3 transition-colors duration-150 ${
          open
            ? 'border-stone-300 bg-stone-100'
            : 'border-stone-200 bg-white hover:bg-stone-50'
        }`}
      >
        <CurrentIcon
          size={16}
          strokeWidth={1.8}
          className="shrink-0 text-stone-600"
        />

        <span className="hidden text-sm font-medium text-stone-800 sm:inline">
          {current.label}
        </span>

        <ChevronDown
          size={14}
          strokeWidth={1.8}
          className={`text-stone-400 transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-[70] w-52 overflow-hidden rounded-xl border border-stone-200 bg-white p-1 shadow-xl shadow-stone-900/[0.07]"
        >
          {roles.map((role) => {
            const Icon = role.icon;
            const selected = role.id === activeRole;

            return (
              <button
                key={role.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  selectRole(role.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 ${
                  selected
                    ? 'bg-stone-100 text-stone-900'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Icon
                  size={16}
                  strokeWidth={1.8}
                  className={
                    selected ? 'text-stone-800' : 'text-stone-400'
                  }
                />

                <span className="flex-1 text-sm font-medium">
                  {role.label}
                </span>

                {selected && (
                  <Check
                    size={15}
                    strokeWidth={2}
                    className="text-stone-700"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

RoleSwitcher.FloatingBar = function FloatingRoleBar() {
  const { activeRole, selectRole } = useRoleSelection();

  return (
    <div className="fixed inset-x-0 bottom-3 z-40 px-3 pb-[env(safe-area-inset-bottom)] sm:bottom-5 sm:px-5">
      <nav
        aria-label="Demo role navigation"
        className="mx-auto flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-xl border border-stone-200 bg-white p-1 shadow-lg shadow-stone-900/[0.07] sm:gap-1 sm:p-1.5"
      >
        {roles.map((role) => {
          const Icon = role.icon;
          const selected = role.id === activeRole;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => selectRole(role.id)}
              aria-label={role.label}
              aria-pressed={selected}
              title={role.label}
              className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-3 transition-colors duration-150 sm:px-3.5 ${
                selected
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <Icon size={16} strokeWidth={1.8} />

              <span className="hidden whitespace-nowrap text-xs font-medium sm:inline">
                {role.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
