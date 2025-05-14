import React, { useState } from 'react';
import Header from './components/Header';
import WeatherContainer from './components/WeatherContainer';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${
      theme === 'light' ? 'bg-blue-50' : 'bg-slate-900'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <WeatherContainer theme={theme} />
      </div>
    </div>
  );
}

export default App;