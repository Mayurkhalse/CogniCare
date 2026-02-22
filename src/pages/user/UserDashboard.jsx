// src/pages/user/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/dashboardService';
import Spinner from '../../components/common/Spinner';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import TrendChart from '../../components/charts/TrendChart';
import Badge from '../../components/common/Badge';
import { BarChart, Clock, Zap } from 'lucide-react';

const UserDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { scenario } = useAuth();

  useEffect(() => {
    setLoading(true);
    dashboardService.getUserDashboard(scenario).then(response => {
      setData(response);
      setLoading(false);
    });
  }, [scenario]);

  if (loading) return <Spinner />;
  if (!data) return <div>No data available.</div>;

  const { summary, trend } = data;

  if (summary.isBuildingBaseline) {
      return (
        <Card>
            <CardHeader>
                <CardTitle>Building Your Cognitive Baseline</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-4">Complete daily games for 14 days to establish a reliable cognitive baseline. This helps in accurately monitoring your cognitive health over time.</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div className="bg-primary h-4 rounded-full" style={{ width: `${(summary.baselineProgress / 14) * 100}%` }}></div>
                </div>
                <p className="text-right font-bold">{summary.baselineProgress} / 14 Days</p>
            </CardContent>
        </Card>
      )
  }

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle>Cognitive Fitness</CardTitle>
                    <BarChart className="w-5 h-5 text-gray-400"/>
                </CardHeader>
                <CardContent>
                    <Badge riskLevel={summary.riskLevel}>{summary.riskLevel === 'LOW' ? 'Stable' : summary.riskLevel}</Badge>
                    <p className="text-sm text-gray-500 mt-2">Your score is within your normal range.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle>Weekly Summary</CardTitle>
                    <Clock className="w-5 h-5 text-gray-400"/>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">+1.5%</p>
                     <p className="text-sm text-gray-500 mt-2">Improvement from last week.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle>Daily Streak</CardTitle>
                     <Zap className="w-5 h-5 text-gray-400"/>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{summary.dailyStreak} Days</p>
                    <p className="text-sm text-gray-500 mt-2">You're on a roll!</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>30-Day Trend</CardTitle>
            </CardHeader>
            <CardContent>
                <TrendChart data={trend} timeRange="30d" />
            </CardContent>
        </Card>
    </div>
  );
};

export default UserDashboard;
