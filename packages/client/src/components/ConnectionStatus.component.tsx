import { useEffect, useState } from 'react';

export const ConnectionStatus = () => {
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // This hits the proxy we set up in vite.config
        const res = await fetch('/api/health');
        setStatus(res.ok ? 'online' : 'offline');
      } catch (err) {
        setStatus('offline');
        const message = err instanceof Error ? err.message : 'Connection error';
        console.warn(message);
      }
    };

    checkConnection();
    // Re-check every 30 seconds to keep it "live"
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const config = {
    loading: { color: 'badge-ghost', text: 'Checking...', ping: false },
    online: { color: 'badge-success', text: 'Backend Online', ping: true },
    offline: { color: 'badge-error', text: 'Backend Offline', ping: false },
  };

  const current = config[status];

  return (
    <div className="tooltip tooltip-top" data-tip="Checking http://localhost:5001/api/health">
      <div
        className={`badge ${current.color} badge-outline gap-2 px-4 py-3 font-mono text-[10px] tracking-widest uppercase`}
      >
        {current.ping && (
          <span className="relative flex h-2 w-2">
            <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
            <span className="bg-success relative inline-flex h-2 w-2 rounded-full"></span>
          </span>
        )}
        {current.text}
      </div>
    </div>
  );
};
