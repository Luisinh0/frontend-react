// src/components/ErrorMessage.tsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Componente para mostrar mensajes de error
 * Incluye opción de reintentar
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-800 mb-1">
            Error al cargar los datos
          </h3>
          <p className="text-sm text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="
                mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium
                rounded-lg hover:bg-red-700 transition-colors
              "
            >
              Reintentar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
