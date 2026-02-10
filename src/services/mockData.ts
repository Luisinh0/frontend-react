// src/services/mockData.ts
import type { DashboardData, ETLExecution } from '@/types';

/**
 * Datos mockeados para desarrollo sin backend
 * Simula la respuesta de la API
 */

// Historial de ejecuciones ETL
export const mockETLExecutions: ETLExecution[] = [
  {
    id: 'exec-001',
    executionDate: '2024-02-10T08:30:00Z',
    status: 'success',
    duration: 245,
    recordsProcessed: 15420,
    recordsSuccess: 15420,
    recordsError: 0,
    startTime: '2024-02-10T08:30:00Z',
    endTime: '2024-02-10T08:34:05Z',
  },
  {
    id: 'exec-002',
    executionDate: '2024-02-09T08:30:00Z',
    status: 'warning',
    duration: 312,
    recordsProcessed: 14890,
    recordsSuccess: 14750,
    recordsError: 140,
    startTime: '2024-02-09T08:30:00Z',
    endTime: '2024-02-09T08:35:12Z',
  },
  {
    id: 'exec-003',
    executionDate: '2024-02-08T08:30:00Z',
    status: 'success',
    duration: 198,
    recordsProcessed: 16234,
    recordsSuccess: 16234,
    recordsError: 0,
    startTime: '2024-02-08T08:30:00Z',
    endTime: '2024-02-08T08:33:18Z',
  },
  {
    id: 'exec-004',
    executionDate: '2024-02-07T08:30:00Z',
    status: 'error',
    duration: 87,
    recordsProcessed: 3456,
    recordsSuccess: 2980,
    recordsError: 476,
    startTime: '2024-02-07T08:30:00Z',
    endTime: '2024-02-07T08:31:27Z',
  },
  {
    id: 'exec-005',
    executionDate: '2024-02-06T08:30:00Z',
    status: 'success',
    duration: 267,
    recordsProcessed: 15678,
    recordsSuccess: 15678,
    recordsError: 0,
    startTime: '2024-02-06T08:30:00Z',
    endTime: '2024-02-06T08:34:27Z',
  },
  {
    id: 'exec-006',
    executionDate: '2024-02-05T08:30:00Z',
    status: 'success',
    duration: 221,
    recordsProcessed: 14923,
    recordsSuccess: 14923,
    recordsError: 0,
    startTime: '2024-02-05T08:30:00Z',
    endTime: '2024-02-05T08:33:41Z',
  },
];

// Datos completos del dashboard
export const mockDashboardData: DashboardData = {
  kpis: {
    totalRecords: 80601,
    successRecords: 79985,
    errorRecords: 616,
    lastExecution: '2024-02-10T08:34:05Z',
    averageDuration: 238,
    successRate: 99.24,
  },
  timeSeries: [
    { date: '2024-02-05', processed: 14923, success: 14923, error: 0 },
    { date: '2024-02-06', processed: 15678, success: 15678, error: 0 },
    { date: '2024-02-07', processed: 3456, success: 2980, error: 476 },
    { date: '2024-02-08', processed: 16234, success: 16234, error: 0 },
    { date: '2024-02-09', processed: 14890, success: 14750, error: 140 },
    { date: '2024-02-10', processed: 15420, success: 15420, error: 0 },
  ],
  statusDistribution: [
    { name: 'Exitosos', value: 79985, color: '#10b981' },
    { name: 'Con errores', value: 616, color: '#ef4444' },
  ],
  recentExecutions: mockETLExecutions.slice(0, 5),
};

/**
 * Simula delay de red para requests
 */
export const simulateNetworkDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
