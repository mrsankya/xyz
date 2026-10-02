import React from 'react';
import {
  LayoutDashboard,
  Navigation,
  Sparkles,
  Package,
  Menu,
  LifeBuoy,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const {
    userRole,
    activeTab,
    setActiveTab,
    toggleMobileSidebar,
    selectedShipment,
    notifications,
  } = useApp();

  const unreadAlerts = notifications.filter((n) => !n.read).length;
  const isRescueActive = selectedShipment.status === 'RESCUE_ACTIVE' || selectedShipment.status === 'AT_RISK';

  // Define role-tailored top 4 actions for mobile thumb reach
  const getBottomNavItems = () => {
    switch (userRole) {
      case 'FARMER':
        return [
          { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
          { id: 'tracking', label: 'Tracking', icon: Navigation },
          { id: 'freshness', label: 'Freshness AI', icon: Sparkles },
          {
            id: isRescueActive ? 'rescue' : 'shipments',
            label: isRescueActive ? 'Rescue' : 'Shipments',
            icon: isRescueActive ? LifeBuoy : Package,
            badge: isRescueActive ? '!' : undefined,
            badgeColor: 'bg-red-500 text-white animate-pulse',
          },
        ];

      case 'DRIVER':
        return [
          { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
          { id: 'navigation', label: 'GPS Nav', icon: Navigation },
          { id: 'freshroute', label: 'FreshRoute', icon: Sparkles },
          { id: 'sensors', label: 'Sensors', icon: Activity },
        ];

      case 'BUYER':
        return [
          { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
          { id: 'incoming', label: 'Incoming', icon: Package },
          { id: 'tracking', label: 'Tracking', icon: Navigation },
          { id: 'receiving', label: 'Dock', icon: CheckCircle2 },
        ];

      case 'ADMIN':
      default:
        return [
          { id: 'dashboard', label: 'Control', icon: LayoutDashboard },
          { id: 'fleet', label: 'Fleet', icon: Navigation },
          { id: 'risk-monitor', label: 'Risk AI', icon: AlertTriangle, badge: '1', badgeColor: 'bg-red-500 text-white' },
          { id: 'all-shipments', label: 'Shipments', icon: Package },
        ];
    }
  };

  const navItems = getBottomNavItems();

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-lg px-2 pt-1.5 pb-safe pb-2"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors relative cursor-pointer ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-2 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center ${
                      item.badgeColor || 'bg-red-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight leading-none truncate max-w-[64px]">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />
              )}
            </button>
          );
        })}

        {/* More / Menu Button to open Drawer */}
        <button
          onClick={toggleMobileSidebar}
          aria-label="Open full menu"
          className="flex flex-col items-center justify-center flex-1 py-1 px-1 text-slate-500 hover:text-slate-800 transition-colors relative cursor-pointer"
        >
          <div className="relative">
            <Menu className="w-5 h-5" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadAlerts}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">Menu</span>
        </button>
      </div>
    </nav>
  );
};
