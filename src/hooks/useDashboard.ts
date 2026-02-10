// src/hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import type { DashboardData, LoadingState } from '@/types';
import { dashboardAPI } from '@/services/api';
import { mockDashboardData, simulateNetworkDelay } from '@/services/mockData';

/**
 * Hook personalizado para manejar datos del dashboard
 * Incluye manejo de loading, error y auto-refresh
 */
export const useDashboard = (useMockData: boolean = true, refreshInterval?: number) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
  });

  /**
   * Función para cargar datos del dashboard
   */
  const fetchDashboard = async () => {
    try {
      setLoadingState({ isLoading: true, error: null });

      let dashboardData: DashboardData;

      if (useMockData) {
        // Simula delay de red con datos mockeados
        await simulateNetworkDelay(600);
        dashboardData = mockDashboardData;
      } else {
        // Consume API real
        dashboardData = await dashboardAPI.getDashboardData();
      }

      setData(dashboardData);
      setLoadingState({ isLoading: false, error: null });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoadingState({
        isLoading: false,
        error: 'Error al cargar los datos del dashboard. Por favor, intenta nuevamente.',
      });
    }
  };

  /**
   * Efecto inicial para cargar datos
   */
  useEffect(() => {
    fetchDashboard();
  }, []);

  /**
   * Efecto para auto-refresh si se configura un intervalo
   */
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const intervalId = setInterval(() => {
        fetchDashboard();
      }, refreshInterval);

      return () => clearInterval(intervalId);
    }
  }, [refreshInterval]);

  return {
    data,
    isLoading: loadingState.isLoading,
    error: loadingState.error,
    refetch: fetchDashboard,
  };
};
