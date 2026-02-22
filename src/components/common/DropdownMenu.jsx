// src/components/common/DropdownMenu.jsx
// Basic implementation for demo purposes
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const DropdownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (rootRef.current && !rootRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // This is a simplified context to pass down open/close state
    const context = { isOpen, setIsOpen };
    
    return <div ref={rootRef} className="relative inline-block text-left">{React.Children.map(children, child => React.cloneElement(child, { context }))}</div>;
};

const DropdownMenuTrigger = ({ children, context }) => {
    return React.cloneElement(children, { onClick: () => context.setIsOpen(o => !o) });
};

const DropdownMenuContent = ({ children, context, className, align = 'left' }) => {
    const alignClasses = {
        left: 'origin-top-left left-0',
        right: 'origin-top-right right-0',
    };
    return (
        <AnimatePresence>
            {context.isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className={cn('absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50', alignClasses[align], className)}
                >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {React.Children.map(children, child => React.cloneElement(child, { context }))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const DropdownMenuItem = ({ children, onClick, context }) => {
    const handleClick = (e) => {
        if(onClick) onClick(e);
        context.setIsOpen(false);
    }
    return (
        <a href="#"
            onClick={handleClick}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
        >
            {children}
        </a>
    );
};

const DropdownMenuLabel = ({ children }) => <div className="px-4 py-2 text-xs text-gray-500 uppercase">{children}</div>;
const DropdownMenuSeparator = () => <div className="border-t my-1" />;


export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
