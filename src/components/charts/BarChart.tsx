// src/components/charts/BarChart.tsx
import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TimeSeriesData } from '@/types';

interface BarChartProps {
  data: TimeSeriesData[];
  title?: string;
}

/**
 * Gráfico de barras para comparar errores vs éxitos
 */
export const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              });
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
            iconType="rect"
          />
          <Bar
            dataKey="success"
            fill="#10b981"
            name="Exitosos"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="error"
            fill="#ef4444"
            name="Con error"
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
