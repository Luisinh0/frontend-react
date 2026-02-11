// src/pages/ETLStatus.tsx
import React from 'react';
import { Clock, Database, CheckCircle2, XCircle } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useETLExecutions } from '@/hooks/useETLExecutions';


/**
 * Vista de estado de ejecuciones ETL
 * Muestra tabla detallada con historial de ejecuciones 
 */
export const ETLStatus: React.FC = () => {
  const { executions, isLoading, error, refetch } = useETLExecutions(true);

 const stats = React.useMemo(() => {
    const total = executions.length;
    const successful = executions.filter((e) => e.status === 'success').length;
    const withErrors = executions.filter((e) => e.status === 'error' || e.status === 'warning').length;
    const totalRecords = executions.reduce((sum, e) => sum + e.recordsProcessed, 0);

     return { total, successful, withErrors, totalRecords };
  }, [executions]);
  // Estado de carga 
  if (isLoading) {
    return <LoadingSpinner message="Cargando historial de ejecuciones..." />;
  }

  // Estado de error
  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  /**
   * Formatea duración en segundos a formato legible
   */
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  /**
   * Formatea fecha y hora
   */
  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Calcula estadísticas del período
   */

   

  return (
    <div className="space-y-6">
      {/* Estadísticas del período */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Total Ejecuciones</p>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Exitosas</p>
              <p className="text-xl font-bold text-gray-900">{stats.successful}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Con Errores</p>
              <p className="text-xl font-bold text-gray-900">{stats.withErrors}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Registros Totales</p>
              <p className="text-xl font-bold text-gray-900">
                {stats.totalRecords.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de ejecuciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Historial de Ejecuciones</h3>
          <p className="text-sm text-gray-600 mt-1">
            Registro detallado de todas las ejecuciones ETL
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Ejecución
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Duración
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Registros Procesados
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Exitosos
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Errores
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {executions.map((execution) => (
                <tr key={execution.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDateTime(execution.executionDate)}
                    </div>
                    <div className="text-xs text-gray-500">ID: {execution.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={execution.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {formatDuration(execution.duration)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {execution.recordsProcessed.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-900">
                        {execution.recordsSuccess.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-900">
                        {execution.recordsError.toLocaleString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {executions.length === 0 && (
          <div className="py-12 text-center">
            <Database className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No hay ejecuciones registradas</p>
          </div>
        )}
      </div>
    </div>
  );
};
