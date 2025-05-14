import React from 'react';

interface LoadingSpinnerProps {
  theme: 'light' | 'dark';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ theme }) => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className={`animate-spin rounded-full h-12 w-12 border-4 border-solid ${
        theme === 'light'
          ? 'border-blue-500/20 border-t-blue-500'
          : 'border-blue-400/20 border-t-blue-400'
      }`}></div>
    </div>
  );
};

export default LoadingSpinner;