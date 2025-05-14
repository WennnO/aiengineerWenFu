import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  theme: 'light' | 'dark';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, theme }) => {
  return (
    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
      theme === 'light' ? 'bg-red-100 text-red-800' : 'bg-red-900/30 text-red-300'
    }`}>
      <AlertCircle className={theme === 'light' ? 'text-red-600' : 'text-red-400'} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;