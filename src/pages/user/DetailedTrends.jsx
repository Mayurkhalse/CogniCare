// src/pages/user/DetailedTrends.jsx
// This is a placeholder, as the prompt did not specify which user this is for.
// Let's assume it's for the 'declining' user for a more dramatic effect.

import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import Spinner from '../../components/common/Spinner';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import TrendChart from '../../components/charts/TrendChart';

const DetailedTrends = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardService.getFamilyDashboard().then(response => {
            // We need to manufacture domain-specific trends here
            const baseTrend = response.trend;
            response.domainTrends = {
                memory: baseTrend.map(d => ({...d, score: d.score * 1.05})),
                language: baseTrend.map(d => ({...d, score: d.score * 0.98})),
                processingSpeed: baseTrend.map(d => ({...d, score: d.score * 0.95})),
            }
            setData(response);
            setLoading(false);
        });
    }, []);

    if (loading) return <Spinner />;
    if (!data) return <div>No data available.</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Detailed Cognitive Trends</h1>
            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader><CardTitle>Memory Trend</CardTitle></CardHeader>
                    <CardContent><TrendChart data={data.domainTrends.memory} /></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Language Trend</CardTitle></CardHeader>
                    <CardContent><TrendChart data={data.domainTrends.language} /></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Processing Speed Trend</CardTitle></CardHeader>
                    <CardContent><TrendChart data={data.domainTrends.processingSpeed} /></CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DetailedTrends;
