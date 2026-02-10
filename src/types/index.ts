// src/types/index.ts

/**
 * Estado de una ejecución ETL
 */
export type ETLStatus = 'success' | 'warning' | 'error' | 'running';

/**
 * Registro de ejecución ETL
 */
export interface ETLExecution {
  id: string;
  executionDate: string;
  status: ETLStatus;
  duration: number; // en segundos
  recordsProcessed: number;
  recordsSuccess: number;
  recordsError: number;
  startTime: string;
  endTime: string;
}

/**
 * KPIs principales del dashboard
 */
export interface DashboardKPIs {
  totalRecords: number;
  successRecords: number;
  errorRecords: number;
  lastExecution: string;
  averageDuration: number;
  successRate: number;
}

/**
 * Datos para gráfico de líneas (procesamiento en el tiempo)
 */
export interface TimeSeriesData {
  date: string;
  processed: number;
  success: number;
  error: number;
}

/**
 * Datos para gráfico circular (distribución de estados)
 */
export interface StatusDistribution {
  name: string;
  value: number;
  color: string;
}

/**
 * Respuesta de la API para el dashboard
 */
export interface DashboardData {
  kpis: DashboardKPIs;
  timeSeries: TimeSeriesData[];
  statusDistribution: StatusDistribution[];
  recentExecutions: ETLExecution[];
}

/**
 * Estado de carga de la API
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
