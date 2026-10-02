import React from 'react';
import {
  LayoutDashboard,
  Package,
  Navigation,
  Sparkles,
  Store,
  LifeBuoy,
  ShieldCheck,
  Bell,
  User,
  LogOut,
  Truck,
  Compass,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  Users,
  Settings,
  X,
  Sprout,
  BarChart3,
  PlusCircle,
  PanelLeftClose,
  PanelLeftOpen,
  WifiOff,
  Download,
  Smartphone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LeftSidebar: React.FC = () => {
  const {
    userRole,
    activeTab,
    setActiveTab,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isSidebarCollapsed,
    toggleSidebarCollapsed,
    isOnline,
    isInstallable,
    promptInstall,
    notifications,
    selectedShipment,
    openCreateShipmentModal,
    logout,
  } = useApp();

  const unreadAlerts = notifications.filter((n) => !n.read).length;
  const isRescueActive = selectedShipment.status === 'RESCUE_ACTIVE' || selectedShipment.status === 'AT_RISK';

  // Role-specific navigation menus strictly matching specification
  const getNavItems = () => {
    switch (userRole) {
      case 'FARMER':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'shipments', label: 'My Shipments', icon: Package, badge: '3' },
          { id: 'tracking', label: 'Live Truck Tracking', icon: Navigation, accent: true },
          { id: 'freshness', label: 'Freshness AI', icon: Sparkles },
          { id: 'markets', label: 'Smart Markets', icon: Store },
          { 
            id: 'rescue', 
            label: 'Crop Rescue', 
            icon: LifeBuoy, 
            badge: isRescueActive ? '1 ⚠️' : undefined,
            badgeColor: 'bg-red-500 text-white animate-pulse'
          },
          { id: 'verification', label: 'Verification', icon: ShieldCheck },
          { 
            id: 'alerts', 
            label: 'Alerts', 
            icon: Bell, 
            badge: unreadAlerts > 0 ? String(unreadAlerts) : undefined,
            badgeColor: 'bg-emerald-600 text-white'
          },
          { id: 'profile', label: 'Profile', icon: User },
        ];

      case 'DRIVER':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'trips', label: 'My Trips', icon: Package, badge: '1' },
          { id: 'navigation', label: 'Navigation', icon: Compass, accent: true },
          { id: 'freshroute', label: 'AI FreshRoute', icon: Sparkles },
          { 
            id: 'sensors', 
            label: 'Sensor Status', 
            icon: Activity,
            badge: selectedShipment.sensorHistory.slice(-1)[0]?.temperatureC > 28 ? '33°C ⚠️' : '26°C 🟢',
            badgeColor: selectedShipment.sensorHistory.slice(-1)[0]?.temperatureC > 28 ? 'bg-amber-500 text-slate-950' : 'bg-emerald-100 text-emerald-800'
          },
          { 
            id: 'alerts', 
            label: 'Alerts', 
            icon: Bell, 
            badge: unreadAlerts > 0 ? String(unreadAlerts) : undefined,
            badgeColor: 'bg-blue-600 text-white'
          },
          { id: 'delivery', label: 'Delivery', icon: CheckCircle2 },
          { id: 'profile', label: 'Profile', icon: User },
        ];

      case 'BUYER':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'incoming', label: 'Incoming Shipments', icon: Package, badge: '1' },
          { id: 'tracking', label: 'Live Truck Tracking', icon: Navigation, accent: true },
          { id: 'find-produce', label: 'Find Produce', icon: Search },
          { id: 'verification', label: 'Verification', icon: ShieldCheck },
          { id: 'receiving', label: 'Receiving', icon: CheckCircle2 },
          { id: 'disputes', label: 'Disputes', icon: FileText, badge: '1' },
          { id: 'profile', label: 'Profile', icon: User },
        ];

      case 'ADMIN':
      case 'EXECUTIVE':
      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'all-shipments', label: 'All Shipments', icon: Package },
          { id: 'fleet', label: 'Live Fleet', icon: Truck },
          { id: 'risk-monitor', label: 'Risk Monitor', icon: AlertTriangle, badge: '1 ⚠️', badgeColor: 'bg-red-500 text-white' },
          { id: 'markets', label: 'Markets', icon: Store },
          { id: 'disputes', label: 'Disputes', icon: FileText, badge: '1' },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'settings', label: 'Settings', icon: Settings },
          { id: 'profile', label: 'Profile', icon: User },
        ];
    }
  };

  const navItems = getNavItems();

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileSidebarOpen(false);
  };

  const getRoleMeta = () => {
    switch (userRole) {
      case 'FARMER':
        return {
          title: 'Farmer App',
          name: 'Ramesh Patel',
          sub: 'Sahyadri Agro Hub',
          badge: 'FARMER',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        };
      case 'DRIVER':
        return {
          title: 'Driver Navigator',
          name: 'Vikram Shinde',
          sub: 'MH-15-TC-4402',
          badge: 'DRIVER',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        };
      case 'BUYER':
        return {
          title: 'Buyer Portal',
          name: 'Sunil Rao',
          sub: 'FreshMart Terminal',
          badge: 'BUYER',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        };
      case 'ADMIN':
      default:
        return {
          title: 'Admin Console',
          name: 'Regional Dispatcher',
          sub: 'Network Operations',
          badge: 'ADMIN',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
        };
    }
  };

  const roleMeta = getRoleMeta();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-left-sidebar"
        className={`bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0
          ${/* Mobile: Slide-in Drawer */ ''}
          fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] shadow-2xl
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${/* Desktop: In-flow Flex Child with Collapse Support */ ''}
          lg:static lg:h-full lg:translate-x-0 lg:shadow-none
          ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        {/* Top Branding Strip */}
        <div className={`p-4 border-b border-slate-100 flex items-center ${isSidebarCollapsed ? 'lg:justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Sprout className="w-5 h-5 text-emerald-50" />
            </div>
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <div className="overflow-hidden">
                <div className="font-extrabold text-sm text-slate-900 leading-tight truncate">
                  Agrilogix
                </div>
                <div className="text-[11px] font-medium text-emerald-700 truncate">
                  {roleMeta.title}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={toggleSidebarCollapsed}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              aria-label="Close navigation drawer"
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Offline Mode Indicator Badge */}
        {!isOnline && (
          <div className={`mx-3 mt-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center ${isSidebarCollapsed ? 'lg:justify-center lg:p-2' : 'gap-2'}`}>
            <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate">Offline Mode</span>
            )}
          </div>
        )}

        {/* Quick Action Button for Farmer */}
        {userRole === 'FARMER' && (
          <div className="px-3 pt-3 pb-1">
            <button
              onClick={() => {
                openCreateShipmentModal();
                setIsMobileSidebarOpen(false);
              }}
              title="Create Shipment"
              className={`w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer ${
                isSidebarCollapsed ? 'lg:p-2.5' : 'px-3 py-2'
              }`}
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                <span>Create Shipment</span>
              )}
            </button>
          </div>
        )}

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {(!isSidebarCollapsed || isMobileSidebarOpen) && (
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
              Navigation
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                title={item.label}
                className={`w-full flex items-center rounded-xl text-xs font-semibold transition cursor-pointer group ${
                  isSidebarCollapsed
                    ? 'lg:justify-center lg:px-2 lg:py-2.5'
                    : 'justify-between px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className={`flex items-center ${isSidebarCollapsed ? 'lg:justify-center' : 'gap-3'}`}>
                  <Icon
                    className={`w-4 h-4 shrink-0 transition ${
                      isActive ? 'text-emerald-700' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>

                {(!isSidebarCollapsed || isMobileSidebarOpen) && item.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ${
                      item.badgeColor || (isActive ? 'bg-emerald-200/80 text-emerald-900' : 'bg-slate-100 text-slate-600')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Install PWA App Quick Button */}
        {isInstallable && (
          <div className="px-3 pb-2">
            <button
              onClick={() => promptInstall()}
              title="Install Agrilogix App"
              className={`w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition cursor-pointer ${
                isSidebarCollapsed ? 'lg:p-2.5' : 'px-3 py-2'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-700 shrink-0" />
              {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                <span>Install Mobile App</span>
              )}
            </button>
          </div>
        )}

        {/* Bottom User Card & Logout */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70">
          <div className={`flex items-center rounded-xl bg-white border border-slate-200/80 p-2 ${
            isSidebarCollapsed ? 'lg:justify-center lg:p-1.5' : 'justify-between gap-2'
          }`}>
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold shrink-0">
                {roleMeta.name[0]}
              </div>
              {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 truncate leading-tight">
                    {roleMeta.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {roleMeta.sub}
                  </div>
                </div>
              )}
            </div>

            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <button
                onClick={logout}
                title="Logout / Switch Role"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
