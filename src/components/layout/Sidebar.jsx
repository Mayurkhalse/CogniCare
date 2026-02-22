// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, User, Users, BarChart2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const Sidebar = () => {
    const { role } = useAuth();

    const navLinks = {
        USER: [
            { to: '/', icon: Home, label: 'Home' },
            { to: '/dashboard', icon: BarChart2, label: 'Dashboard' },
        ],
        FAMILY: [
            { to: '/family-dashboard', icon: BarChart2, label: 'Dashboard' },
            { to: '/specialists', icon: Users, label: 'Find Specialists' },
        ],
        ADMIN: [
            { to: '/admin-panel', icon: Shield, label: 'Demo Control' },
        ]
    };
    
    const links = navLinks[role] || [];

  return (
    <aside className="hidden md:flex w-64 flex-col bg-white border-r">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-primary">CogniCare</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-primary',
                isActive && 'bg-primary/10 text-primary font-semibold'
              )
            }
          >
            <link.icon className="w-5 h-5 mr-3" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
