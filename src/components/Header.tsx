import React from 'react';
import { Sun, Moon, CloudSun } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="mb-4 md:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-3 sm:mb-0">
          <CloudSun 
            size={32} 
            className={`mr-2 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} sm:size-40`} 
          />
          <h1 className={`text-2xl sm:text-3xl font-bold ${
            theme === 'light' ? 'text-slate-800' : 'text-white'
          }`}>
            Weather Forecast
          </h1>
        </div>
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full ${
            theme === 'light' 
              ? 'bg-slate-200 hover:bg-slate-300' 
              : 'bg-slate-700 hover:bg-slate-600'
          }`}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon size={24} className="text-slate-700" />
          ) : (
            <Sun size={24} className="text-yellow-300" />
          )}
        </button>
      </div>
      <div className={`mt-4 p-3 sm:p-4 rounded-lg ${
        theme === 'light' ? 'bg-white/70 text-slate-700' : 'bg-slate-800 text-slate-200'
      }`}>
        <p className="text-xs sm:text-sm">
          Created by Wen Fu - AI Engineer Intern Technical Assessment
        </p>
        <p className="text-xs sm:text-sm mt-1">
          <a 
            href="https://github.com/WennnO"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              theme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'
            }`}
          >
            GitHub
          </a> - My GitHub Page
        </p>
        <p className="text-xs sm:text-sm mt-1">
          <a 
            href="https://www.linkedin.com/in/fu-wen/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              theme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'
            }`}
          >
            LinkedIn
          </a> - My LinkedIn Page
        </p>
      </div>
    </header>
  );
};

export default Header;