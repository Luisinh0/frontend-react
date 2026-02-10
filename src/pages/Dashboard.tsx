// src/pages/Dashboard.tsx
import React from 'react';
import {
  Database,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { KPICard } from '@/components/KPICard';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useDashboard } from '@/hooks/useDashboard';

/**
 * Vista principal del Dashboard
 * Muestra KPIs, gráficos y resumen de actividad ETL
 */
export const Dashboard: React.FC = () => {
  const { data, isLoading, error, refetch } = useDashboard(true);

  // Estado de carga
  if (isLoading) {
    return <LoadingSpinner message="Cargando dashboard..." />;
  }

  // Estado de error
  if (error || !data) {
    return <ErrorMessage message={error || 'No se pudieron cargar los datos'} onRetry={refetch} />;
  }

  const { kpis, timeSeries, statusDistribution } = data;

  /**
   * Formatea la fecha de última ejecución
   */
  const formatLastExecution = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) {
      return `Hace ${diffMins} minutos`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Registros Procesados"
          value={kpis.totalRecords.toLocaleString()}
          icon={Database}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          subtitle="Últimos 7 días"
        />

        <KPICard
          title="Registros Exitosos"
          value={kpis.successRecords.toLocaleString()}
          icon={CheckCircle}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          trend={{ value: kpis.successRate, isPositive: true }}
        />

        <KPICard
          title="Registros con Error"
          value={kpis.errorRecords.toLocaleString()}
          icon={XCircle}
          iconColor="text-red-600"
          iconBgColor="bg-red-100"
          trend={{ value: 100 - kpis.successRate, isPositive: false }}
        />

        <KPICard
          title="Última Ejecución"
          value={formatLastExecution(kpis.lastExecution)}
          icon={Clock}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          subtitle={`Duración: ${Math.floor(kpis.averageDuration / 60)}m ${kpis.averageDuration % 60}s`}
        />
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Tasa de Éxito</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Procesamiento exitoso</span>
                <span className="text-sm font-semibold text-gray-900">
                  {kpis.successRate.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${kpis.successRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Rendimiento</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Duración promedio</span>
              <span className="text-sm font-semibold text-gray-900">
                {Math.floor(kpis.averageDuration / 60)}m {kpis.averageDuration % 60}s
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Registros por ejecución</span>
              <span className="text-sm font-semibold text-gray-900">
                {Math.floor(kpis.totalRecords / timeSeries.length).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart data={timeSeries} title="Procesamiento en el Tiempo" />
        <BarChart data={timeSeries} title="Comparación: Éxitos vs Errores" />
      </div>

      {/* Gráfico circular */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart data={statusDistribution} title="Distribución de Estados" />
        
        {/* Resumen estadístico */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen Estadístico
          </h3>
          <div className="space-y-4">
            {statusDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {item.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {((item.value / kpis.totalRecords) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
