// src/components/alerts/AlertBanner.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { getRiskColor } from '../../utils/riskCalculator';

const AlertBanner = ({ alert }) => {
  if (!alert) return null;

  const { text, bg, border } = getRiskColor('HIGH');

  return (
    <Card className={`border-2 ${border} ${bg}`}>
      <CardHeader className="flex-row items-center space-x-4">
        <AlertTriangle className={`w-10 h-10 ${text}`} />
        <div>
          <CardTitle className={`${text}`}>{alert.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            <p className="font-semibold">Key Findings:</p>
            <p className="text-sm">{alert.finding}</p>
        </div>
        <div className="mt-4 space-y-2">
            <p className="font-semibold">Recommendation:</p>
            <p className="text-sm">{alert.recommendation}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertBanner;
