// src/components/layout/Header.tsx
import React from 'react';
import { RefreshCw, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

/**
 * Header del área de contenido
 * Muestra título, botón de refresh y notificaciones
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg
                bg-white border border-gray-300 text-gray-700
                hover:bg-gray-50 hover:border-gray-400
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all
              "
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span className="text-sm font-medium">Actualizar</span>
            </button>
          )}

          <button
            className="
              relative p-2 rounded-lg
              bg-white border border-gray-300 text-gray-700
              hover:bg-gray-50 hover:border-gray-400
              transition-all
            "
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
