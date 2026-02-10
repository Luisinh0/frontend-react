// src/components/layout/Sidebar.tsx
import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Activity,
  FileText,
  Settings,
  Database,
} from 'lucide-react';

export type NavigationItem = 'dashboard' | 'statistics' | 'etl-status' | 'reports' | 'settings';

interface SidebarProps {
  activeItem: NavigationItem;
  onNavigate: (item: NavigationItem) => void;
}

interface NavItem {
  id: NavigationItem;
  label: string;
  icon: React.ElementType;
}

const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'statistics', label: 'Estadísticas', icon: BarChart3 },
  { id: 'etl-status', label: 'ETL Status', icon: Activity },
  { id: 'reports', label: 'Reportes', icon: FileText },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

/**
 * Sidebar con navegación principal
 * Muestra logo, items de menú y maneja estado activo
 */
export const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate }) => {
  return (
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col fixed left-0 top-0">
      {/* Logo / Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Database className="w-8 h-8 text-primary-400" />
          <div>
            <h1 className="text-xl font-bold text-white">ETL Dashboard</h1>
            <p className="text-xs text-gray-400">Data Pipeline Monitor</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/50'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 text-center">
          <p>v1.0.0</p>
          <p className="mt-1">© 2024 ETL System</p>
        </div>
      </div>
    </aside>
  );
};
