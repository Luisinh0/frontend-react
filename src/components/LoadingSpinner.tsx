// src/components/LoadingSpinner.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

/**
 * Componente para mostrar estado de carga
 * Puede ser fullscreen o inline
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando...',
  fullScreen = false,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {content}
      </div>
    );
  }

  return <div className="py-12">{content}</div>;
};
