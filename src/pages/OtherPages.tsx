// src/pages/Statistics.tsx
import React from 'react';
import { BarChart3 } from 'lucide-react';

/**
 * Vista de Estadísticas (Placeholder)
 */
export const Statistics: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-primary-100 p-6 rounded-full mb-6">
        <BarChart3 className="w-16 h-16 text-primary-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Estadísticas Avanzadas</h2>
      <p className="text-gray-600 text-center max-w-md">
        Esta sección contendrá análisis estadísticos detallados, métricas avanzadas y
        comparativas de rendimiento del proceso ETL.
      </p>
    </div>
  );
};

// src/pages/Reports.tsx
import { FileText } from 'lucide-react';

/**
 * Vista de Reportes (Placeholder)
 */
export const Reports: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-green-100 p-6 rounded-full mb-6">
        <FileText className="w-16 h-16 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Generación de Reportes</h2>
      <p className="text-gray-600 text-center max-w-md">
        Aquí podrás generar y descargar reportes personalizados en diferentes formatos
        (PDF, Excel, CSV) con los datos del proceso ETL.
      </p>
    </div>
  );
};

// src/pages/Settings.tsx
import { Settings as SettingsIcon } from 'lucide-react';

/**
 * Vista de Configuración (Placeholder)
 */
export const Settings: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-gray-200 p-6 rounded-full mb-6">
        <SettingsIcon className="w-16 h-16 text-gray-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuración del Sistema</h2>
      <p className="text-gray-600 text-center max-w-md">
        Configuración de parámetros del proceso ETL, notificaciones, usuarios,
        conexiones a bases de datos y preferencias del dashboard.
      </p>
    </div>
  );
};
