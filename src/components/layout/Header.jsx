// src/components/layout/Header.jsx
import React from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../common/DropdownMenu'; // Will create this next

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <header className="h-16 bg-white border-b flex items-center justify-end px-4 sm:px-6 lg:px-8">
      {user && (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                        <UserIcon size={20} />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">{user.name}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

export default Header;
