import React from 'react';
import { WifiOff, Download, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfflineNoticeBanner: React.FC = () => {
  const { isOnline, isInstallable, promptInstall } = useApp();
  const [dismissInstall, setDismissInstall] = React.useState(false);

  return (
    <>
      {/* Offline Alert Strip */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs px-4 py-2 flex items-center justify-between shadow-xs sticky top-0 z-50 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 font-medium">
            <WifiOff className="w-4 h-4 animate-pulse shrink-0" />
            <span>
              <strong>Offline Mode Active:</strong> Running from local cached telemetry. AI predictions and tracking data remain available.
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-700/60 border border-amber-500/40">
            Offline
          </span>
        </div>
      )}

      {/* PWA Install Notification Bar */}
      {isInstallable && !dismissInstall && (
        <div className="bg-emerald-900 text-white text-xs px-4 py-2.5 flex items-center justify-between border-b border-emerald-800 shadow-sm relative z-40">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
              <Download className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="font-bold">Install Agrilogix App:</span>{' '}
              <span className="text-emerald-100 hidden sm:inline">
                Add to your home screen for full offline access, faster loading, and fullscreen mode.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => promptInstall()}
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-lg text-xs transition cursor-pointer shadow-xs"
            >
              Install App
            </button>
            <button
              onClick={() => setDismissInstall(true)}
              aria-label="Dismiss install notice"
              className="p-1 text-emerald-300 hover:text-white rounded-md hover:bg-emerald-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
