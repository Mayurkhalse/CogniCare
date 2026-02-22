// src/pages/user/SpecialistFinder.jsx
import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import Spinner from '../../components/common/Spinner';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Star, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const SpecialistCard = ({ specialist, index }) => {
    return (
        <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.1 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>{specialist.name}</CardTitle>
                    <p className="text-sm text-gray-500">{specialist.clinic}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-2"/> {specialist.location} 
                        <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{specialist.distance}</span>
                    </div>
                     <div className="flex items-center text-sm text-gray-600">
                        <Star size={14} className="mr-2 text-yellow-400"/> {specialist.rating.toFixed(1)}
                    </div>
                     <div className="flex items-center text-sm text-gray-600">
                        <Phone size={14} className="mr-2"/> {specialist.phone}
                    </div>
                    <Button className="w-full mt-2">Contact Clinic</Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}


const SpecialistFinder = () => {
    const [specialists, setSpecialists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardService.getSpecialists().then(data => {
            setSpecialists(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                     <h1 className="text-3xl font-bold">Find a Specialist</h1>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {specialists.map((specialist, i) => (
                            <SpecialistCard key={specialist.id} specialist={specialist} index={i} />
                        ))}
                     </div>
                </div>
                <div className="hidden lg:block">
                    <div className="sticky top-24">
                        <Card>
                            <CardHeader>
                                <CardTitle>Map View</CardTitle>
                            </CardHeader>
                             <CardContent>
                                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                                    <p className="text-gray-500">Map Placeholder</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialistFinder;
