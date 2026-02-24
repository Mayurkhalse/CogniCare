// src/pages/family/FamilyDashboard.jsx
import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import Spinner from '../../components/common/Spinner';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/common/Card';
import TrendChart from '../../components/charts/TrendChart';
import AlertBanner from '../../components/alerts/AlertBanner';
import Badge from '../../components/common/Badge';
import { getRiskColor } from '../../utils/riskCalculator';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { Brain, FileDown, UserCheck, ShieldCheck } from 'lucide-react';
import { ActivityMonitorCard } from '../../components/location/ActivityMonitorCard';
import { LocationStatusCard } from '../../components/location/LocationStatusCard';
import activityData from '../../mock-data/activityStatus.json';
import locationData from '../../mock-data/locationStatus.json';

const TabButton = ({ children, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md ${
            active
                ? 'bg-primary text-primary-foreground'
                : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        {children}
    </button>
);


const FamilyDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        dashboardService.getFamilyDashboard().then(response => {
            setData(response);
            setLoading(false);
        });
    }, []);

    if (loading) return <Spinner />;
    if (!data) return <div>No data available.</div>;

    const { profile, summary, trend, domains, alerts } = data;
    const riskColor = getRiskColor(summary.riskLevel);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Cognitive Health Dashboard for {profile.name}</h1>
                <p className="text-gray-600 mt-1">Monitoring the cognitive wellbeing of your loved one.</p>
            </div>
            
            <div className="flex space-x-2 border-b">
                <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
                    Overview
                </TabButton>
                <TabButton active={activeTab === 'safety'} onClick={() => setActiveTab('safety')}>
                    <div className="flex items-center">
                        <ShieldCheck size={16} className="mr-2"/>
                        Safety & Tracking
                    </div>
                </TabButton>
            </div>


            {alerts && alerts.length > 0 && <AlertBanner alert={alerts[0]} />}
            
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>90-Day Cognitive Trend</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <TrendChart data={trend} />
                                </CardContent>
                            </Card>
                        </div>
                        <div className="space-y-6">
                            <Card className={`border-2 ${riskColor.border}`}>
                                <CardHeader>
                                    <CardTitle>Overall Risk Score</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className={`text-6xl font-bold ${riskColor.text}`}>{summary.riskScore}/100</div>
                                    <Badge riskLevel={summary.riskLevel} className="mt-4 text-lg px-4 py-1">{summary.riskLevel} RISK</Badge>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Link to="/specialists" className="w-full">
                                        <Button variant="secondary" className="w-full"><UserCheck className="mr-2 h-4 w-4"/> Find Specialists</Button>
                                    </Link>
                                    <Button variant="secondary" className="w-full"><FileDown className="mr-2 h-4 w-4"/> Download Report</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Cognitive Domain Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.entries(domains).map(([key, value]) => (
                                <div key={key} className="p-4 rounded-lg bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold capitalize flex items-center"><Brain size={16} className="mr-2 text-primary"/>{key}</h4>
                                        <span className={`font-bold ${value.change < -10 ? 'text-red-500' : 'text-gray-800'}`}>{value.score}</span>
                                    </div>
                                    <p className={`text-sm ${value.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        {value.change.toFixed(1)}% (30d)
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            )}

            {activeTab === 'safety' && (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ActivityMonitorCard 
                        userName={profile.name}
                        activityData={activityData.activity}
                    />
                    <LocationStatusCard 
                         userName={profile.name}
                         locationData={locationData.location}
                         permissionStatus={locationData.permissionStatus}
                    />
                 </div>
            )}
        </div>
    );
};

export default FamilyDashboard;
