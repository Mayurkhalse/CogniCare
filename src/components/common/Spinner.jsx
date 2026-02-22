// src/components/common/Spinner.jsx
import React from 'react';
import { Loader } from 'lucide-react';

const Spinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex justify-center items-center py-10">
      <Loader className={`animate-spin text-primary ${sizeClasses[size]}`} />
    </div>
  );
};

export default Spinner;
