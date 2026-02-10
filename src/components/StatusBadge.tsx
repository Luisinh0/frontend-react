// src/components/StatusBadge.tsx
import React from 'react';
import { CheckCircle, AlertCircle, XCircle, Loader } from 'lucide-react';
import type { ETLStatus } from '@/types';

interface StatusBadgeProps {
  status: ETLStatus;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Componente para mostrar badge de estado con color e icono
 * Soporta estados: success, warning, error, running
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const configs = {
    success: {
      label: 'Exitoso',
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
    },
    warning: {
      label: 'Advertencia',
      icon: AlertCircle,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
    },
    error: {
      label: 'Error',
      icon: XCircle,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
    },
    running: {
      label: 'Ejecutando',
      icon: Loader,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border font-medium
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${sizeClasses[size]}
      `}
    >
      <Icon className={`${iconSizes[size]} ${status === 'running' ? 'animate-spin' : ''}`} />
      {config.label}
    </span>
  );
};
