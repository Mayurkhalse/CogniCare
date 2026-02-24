// src/pages/user/UserHome.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Gamepad2, Brain, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LocationRequestModal } from '../../components/location/LocationRequestModal';

const gameCards = [
    { title: 'Memory Match', description: 'Test your recall with this classic card matching game.', icon: Gamepad2, link: '/play/memory-match', lastPlayed: 'Yesterday' },
    { title: 'Word Recall', description: 'Memorize a list of words and see how many you can remember.', icon: Brain, link: '/play/word-recall', lastPlayed: '3 days ago' },
];

const UserHome = () => {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(true); // Show modal on component load for demo

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <LocationRequestModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
                    <p className="text-gray-600 mt-1">Here are your cognitive games for today. Stay sharp!</p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <div className="text-5xl">🔥</div>
                            <div>
                                <p className="text-3xl font-bold">24 Days</p>
                                <p className="text-gray-500">Keep it up to build a strong cognitive baseline!</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Your Games</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {gameCards.map((game, index) => (
                             <Link to={game.link} key={index}>
                                <Card className="h-full flex flex-col">
                                    <CardHeader className="flex-row items-start space-x-4">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <game.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle>{game.title}</CardTitle>
                                            <p className="text-sm text-gray-500">Last played: {game.lastPlayed}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-gray-600">{game.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UserHome;
