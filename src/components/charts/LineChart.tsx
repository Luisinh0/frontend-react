// src/components/charts/LineChart.tsx
import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TimeSeriesData } from '@/types';

interface LineChartProps {
  data: TimeSeriesData[];
  title?: string;
}

/**
 * Gráfico de líneas para mostrar procesamiento en el tiempo
 * Muestra registros procesados, exitosos y con error
 */
export const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px',
            }}
            labelFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="processed"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Procesados"
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="success"
            stroke="#10b981"
            strokeWidth={2}
            name="Exitosos"
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="error"
            stroke="#ef4444"
            strokeWidth={2}
            name="Con error"
            dot={{ fill: '#ef4444', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
