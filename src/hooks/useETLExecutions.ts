// src/hooks/useETLExecutions.ts
import { useState, useEffect } from 'react';
import type { ETLExecution, LoadingState } from '@/types';
import { dashboardAPI } from '@/services/api';
import { mockETLExecutions, simulateNetworkDelay } from '@/services/mockData';

/**
 * Hook personalizado para manejar el listado de ejecuciones ETL
 */
export const useETLExecutions = (useMockData: boolean = true, limit?: number) => {
  const [executions, setExecutions] = useState<ETLExecution[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
  });

  /**
   * Función para cargar ejecuciones ETL
   */
  const fetchExecutions = async () => {
    try {
      setLoadingState({ isLoading: true, error: null });

      let executionsData: ETLExecution[];

      if (useMockData) {
        // Simula delay de red con datos mockeados
        await simulateNetworkDelay(500);
        executionsData = limit ? mockETLExecutions.slice(0, limit) : mockETLExecutions;
      } else {
        // Consume API real
        executionsData = await dashboardAPI.getETLExecutions(limit);
      }

      setExecutions(executionsData);
      setLoadingState({ isLoading: false, error: null });
    } catch (error) {
      console.error('Error fetching ETL executions:', error);
      setLoadingState({
        isLoading: false,
        error: 'Error al cargar las ejecuciones ETL. Por favor, intenta nuevamente.',
      });
    }
  };

  useEffect(() => {
    fetchExecutions();
  }, [limit]);

  return {
    executions,
    isLoading: loadingState.isLoading,
    error: loadingState.error,
    refetch: fetchExecutions,
  };
};
