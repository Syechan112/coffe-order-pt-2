
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Menu,
  ShoppingCart,
  Coffee,
  LayoutDashboard,
  KanbanSquare,
  Monitor,
  TrendingUp,
  Settings,
  X,
  ChevronRight,
} from 'lucide-react';
import useBrewStore from '../store/useBrewStore';
import RoleSwitcher, { roleRouteMap } from '../components/RoleSwitcher';
import NotificationToast from '../components/NotificationToast';

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { activeRole, cart } = useBrewStore();

  const cartItems = cart.length;

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
    localStorage.setItem('brewflow_theme', 'light');
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, activeRole]);

  const navItems = [
    { name: 'Menu', icon: Menu, path: '/menu', roles: ['role-customer'] },
    { name: 'Track Order', icon: Coffee, path: '/tracker', roles: ['role-customer'] },
    {
      name: 'Cart',
      icon: ShoppingCart,
      path: '/cart',
      roles: ['role-customer'],
      badge: cartItems,
    },
    { name: 'Cashier', icon: LayoutDashboard, path: '/cashier', roles: ['role-cashier'] },
    { name: 'Barista', icon: KanbanSquare, path: '/barista', roles: ['role-barista'] },
    { name: 'Pickup Display', icon: Monitor, path: '/display', roles: ['role-display'] },
    { name: 'Owner', icon: TrendingUp, path: '/owner', roles: ['role-owner'] },
    { name: 'Demo', icon: Settings, path: '/demo', roles: ['role-demo'] },
  ];

  const visibleNavItems = navItems.filter((item) =>
    item.roles.includes(activeRole)
  );

  const roleRoute = roleRouteMap[activeRole];

  const isAllowedPath = navItems.some(
    (item) =>
      item.path === location.pathname &&
      item.roles.includes(activeRole)
  );

  const isRolePublic = [
    '/',
    '/menu',
    '/order',
    '/cart',
    '/tracker',
    '/display',
  ].includes(location.pathname);

  useEffect(() => {
    if (!isAllowedPath && !isRolePublic && roleRoute) {
      navigate(roleRoute.path, { replace: true });
    }
  }, [isAllowedPath, isRolePublic, roleRoute, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f6] text-stone-800">
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative z-50 flex h-14 items-center justify-between gap-2 rounded-xl border border-stone-200 bg-white px-3 sm:h-16 sm:px-5">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={mobileOpen}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-stone-600 transition-colors hover:bg-stone-100 lg:hidden"
              >
                {mobileOpen ? <X size={19} /> : <Menu size={19} />}
              </button>

              <Link to="/menu" className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-900 text-white sm:h-10 sm:w-10">
                  <Coffee size={19} strokeWidth={1.8} />
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-semibold tracking-tight text-stone-900 sm:text-base">
                    BrewFlow
                  </span>
                  <span className="hidden text-[10px] tracking-[0.12em] text-stone-500 sm:block">
                    YOUR DAILY BREW
                  </span>
                </span>
              </Link>
            </div>

            <nav className="hidden items-center gap-1 lg:flex">
              {visibleNavItems.map((item) => {
                const active = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex h-10 items-center gap-2 rounded-lg px-3 text-sm transition-colors xl:px-3.5 ${
                      active
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                    <span>{item.name}</span>

                    {item.badge > 0 && (
                      <span
                        className={`flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-[10px] font-medium ${
                          active
                            ? 'bg-white/15 text-white'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center">
              <RoleSwitcher />
            </div>
          </div>

          {mobileOpen && (
            <>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-40 bg-stone-900/15 lg:hidden"
              />

              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-stone-200 bg-white p-2 lg:hidden">
                <div className="px-3 pb-2 pt-2">
                  <span className="text-xs font-medium text-stone-500">
                    Navigation
                  </span>
                </div>

                <nav className="space-y-0.5">
                  {visibleNavItems.map((item) => {
                    const active = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex min-h-11 items-center gap-3 rounded-lg px-3 transition-colors ${
                          active
                            ? 'bg-stone-900 text-white'
                            : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                        }`}
                      >
                        <Icon size={18} strokeWidth={1.8} />

                        <span className="flex-1 text-sm font-medium">
                          {item.name}
                        </span>

                        {item.badge > 0 && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-stone-100 px-1.5 text-[10px] font-medium text-stone-700">
                            {item.badge}
                          </span>
                        )}

                        <ChevronRight size={15} className="opacity-50" />
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="min-w-0 flex-1 pb-24">
        {children}
      </main>

      <NotificationToast />
    </div>
  );
}