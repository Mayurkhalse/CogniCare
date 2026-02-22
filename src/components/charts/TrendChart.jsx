// src/components/charts/TrendChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartContainer from './ChartContainer';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
        <p className="font-semibold">{`Date: ${label}`}</p>
        <p className="text-primary">{`Score: ${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

const TrendChart = ({ data, timeRange = '90d' }) => {
  const chartData = timeRange === '30d' ? data.slice(-30) : data;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <ChartContainer>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={[40, 100]} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563EB"
            strokeWidth={2}
            dot={false}
            name="Cognitive Score"
          />
        </LineChart>
      </ChartContainer>
    </motion.div>
  );
};

export default TrendChart;
