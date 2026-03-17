import './App.css';

import React from 'react';

import viteLogo from '/vite.svg';

import reactLogo from './assets/react.svg';

interface HealthResponse {
  status: string;
  proxy: string;
  uptime: number;
  message: string;
}

function App() {
  const [data, setData] = React.useState<HealthResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Note: No 'http://localhost:5001' needed because of the Vite proxy
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: HealthResponse) => setData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div
          style={{
            padding: '40px',
            fontFamily: 'sans-serif',
          }}
        >
          <h1>Proxy Check</h1>

          <div
            style={{
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${error ? '#ffa39e' : '#b7eb8f'}`,
            }}
          >
            {error ? (
              <p style={{ color: '#cf1322' }}>
                ❌ <strong>Error:</strong> {error}
              </p>
            ) : data ? (
              <>
                <p>
                  ✅ <strong>Proxy Status:</strong> {data.proxy}
                </p>
                <p>
                  🚀 <strong>Message:</strong> {data.message}
                </p>
                <p>
                  ⏱️ <strong>Uptime:</strong> {Math.floor(data.uptime)} seconds
                </p>
              </>
            ) : (
              <p>⏳ Loading health check...</p>
            )}
          </div>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
