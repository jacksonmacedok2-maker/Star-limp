import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './global.css';

// Evita que um script EXTERNO (ex.: requests.js / iframe do preview) quebre o app
// ao tentar sobrescrever window.fetch (em alguns ambientes fetch é read-only).
if (typeof window !== 'undefined') {
  window.addEventListener(
    'error',
    (e) => {
      const msg = String((e as any)?.message ?? '');
      if (msg.includes('Cannot set property fetch') || msg.includes("Cannot set property 'fetch'")) {
        e.preventDefault();
        return;
      }
    },
    true,
  );

  window.addEventListener(
    'unhandledrejection',
    (e) => {
      const reason = String((e as any)?.reason ?? '');
      if (reason.includes('Cannot set property fetch') || reason.includes("Cannot set property 'fetch'")) {
        e.preventDefault();
        return;
      }
    },
    true,
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);