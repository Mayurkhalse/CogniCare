// src/components/charts/ChartContainer.jsx
import React from 'react';
import { ResponsiveContainer } from 'recharts';

const ChartContainer = ({ children }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartContainer;
