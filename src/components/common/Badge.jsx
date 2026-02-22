// src/components/common/Badge.jsx
import React from 'react';
import { cn } from '../../utils/cn';
import { getRiskColor } from '../../utils/riskCalculator';

const Badge = ({ riskLevel, className, children }) => {
  const color = getRiskColor(riskLevel);
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        color.bg,
        color.text,
        className
      )}
    >
      {children || riskLevel}
    </span>
  );
};

export default Badge;
