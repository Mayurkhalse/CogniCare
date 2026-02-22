// src/components/charts/DomainChart.jsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const DomainChart = ({ data, color }) => {
  return (
    <div style={{ width: '100%', height: 60 }}>
        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
            contentStyle={{
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '12px',
                padding: '5px'
            }}
        />
        <Area type="monotone" dataKey="score" stroke={color} fill={color} fillOpacity={0.3} />
        </AreaChart>
    </div>
  );
};

export default DomainChart;
