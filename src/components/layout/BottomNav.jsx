// src/components/layout/BottomNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, Users, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const BottomNav = () => {
    const { role, isAuthenticated } = useAuth();
    
    if (!isAuthenticated) return null;

    const navLinks = {
        USER: [
            { to: '/', icon: Home, label: 'Home' },
            { to: '/dashboard', icon: BarChart2, label: 'Dashboard' },
        ],
        FAMILY: [
            { to: '/family-dashboard', icon: BarChart2, label: 'Dashboard' },
            { to: '/specialists', icon: Users, label: 'Specialists' },
        ],
        ADMIN: [
            { to: '/admin-panel', icon: Shield, label: 'Demo' },
        ]
    };

    const links = navLinks[role] || [];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center w-full py-2 text-sm text-gray-500',
                isActive && 'text-primary'
              )
            }
          >
            <link.icon className="w-6 h-6 mb-1" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
