// src/services/api.ts
import axios, { AxiosInstance } from 'axios';
import type { DashboardData, ETLExecution } from '@/types';

/**
 * Configuración base de la API
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Instancia de Axios configurada
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor para manejo de errores global
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Servicio API para el dashboard ETL
 */
export const dashboardAPI = {
  /**
   * Obtiene todos los datos del dashboard (KPIs, gráficos, ejecuciones recientes)
   */
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await apiClient.get<DashboardData>('/dashboard');
    return response.data;
  },

  /**
   * Obtiene el historial completo de ejecuciones ETL
   */
  getETLExecutions: async (limit?: number): Promise<ETLExecution[]> => {
    const response = await apiClient.get<ETLExecution[]>('/etl/executions', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Obtiene una ejecución ETL específica por ID
   */
  getETLExecutionById: async (id: string): Promise<ETLExecution> => {
    const response = await apiClient.get<ETLExecution>(`/etl/executions/${id}`);
    return response.data;
  },

  /**
   * Ejecuta manualmente un proceso ETL
   */
  triggerETLExecution: async (): Promise<{ message: string; executionId: string }> => {
    const response = await apiClient.post('/etl/trigger');
    return response.data;
  },
};

export default apiClient;
