import React, { createContext, useContext, useState, useCallback } from 'react';
import './ui.css';

export interface ToastMessage {
  id: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

interface ToastContextType {
  toast: (msg: Omit<ToastMessage, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [announcement, setAnnouncement] = useState<string>('');

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { ...msg, id };

    setToasts((prev) => [...prev.slice(-3), newToast]); // keep last 4 max
    setAnnouncement(msg.message);

    const dur = msg.duration || 4500;
    setTimeout(() => {
      dismiss(id);
    }, dur);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Aria-live polite region for screen readers */}
      <div id="live-region" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      <div className="toast-container" role="region" aria-label="Notifications">
        {toasts.map((t) => (
          <div key={t.id} className="toast" role="status">
            <span>{t.message}</span>
            {t.actionLabel && (
              <button
                type="button"
                className="toast-action"
                onClick={() => {
                  t.onAction?.();
                  dismiss(t.id);
                }}
              >
                {t.actionLabel}
              </button>
            )}
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              style={{ color: '#ffffff', opacity: 0.6, fontSize: '14px', marginLeft: '6px' }}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
