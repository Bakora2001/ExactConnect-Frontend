import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ProxyUsageChart = ({ data }) => {
  // Default sample data if none provided
  const chartData = data || [
    { name: 'US', value: 40 },
    { name: 'UK', value: 30 },
    { name: 'DE', value: 20 },
    { name: 'JP', value: 10 },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid #e2d1c3',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value) => [`${value}%`, 'Usage']}
        />
        <Bar 
          dataKey="value" 
          fill="#9b87f5" 
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProxyUsageChart;