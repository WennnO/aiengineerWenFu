import React from 'react';
import { getWeatherIcon } from '../utils/weatherUtils';

interface ForecastWeatherProps {
  data: any; // Using any for simplicity, would use proper typing in a production app
  theme: 'light' | 'dark';
}

const ForecastWeather: React.FC<ForecastWeatherProps> = ({ data, theme }) => {
  // Process the 5-day forecast data
  // OpenWeatherMap provides forecast in 3-hour intervals, so we need to aggregate by day
  const dailyForecasts = processForecastData(data.list);
  
  return (
    <div className={`mb-8 rounded-lg shadow-lg ${
      theme === 'light' ? 'bg-white' : 'bg-slate-800'
    }`}>
      <div className={`p-4 ${
        theme === 'light' ? 'border-b border-slate-200' : 'border-b border-slate-700'
      }`}>
        <h3 className="text-xl font-semibold">5-Day Forecast</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dailyForecasts.map((day, index) => (
            <DayForecast 
              key={index} 
              day={day} 
              theme={theme} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface DayForecast {
  date: Date;
  dayName: string;
  icon: string;
  description: string;
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeed: number;
}

const processForecastData = (forecastList: any[]): DayForecast[] => {
  const dailyData: { [key: string]: any[] } = {};
  
  // Group forecast data by day
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toISOString().split('T')[0];
    
    if (!dailyData[day]) {
      dailyData[day] = [];
    }
    
    dailyData[day].push(item);
  });
  
  // Create a forecast object for each day
  return Object.entries(dailyData).slice(0, 5).map(([dateStr, items]) => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Find max and min temperatures for the day
    const temps = items.map(item => item.main.temp);
    const tempMax = Math.max(...temps);
    const tempMin = Math.min(...temps);
    
    // Use the middle of the day for the icon and description (around noon)
    const middayItem = items.find(item => {
      const itemHour = new Date(item.dt * 1000).getHours();
      return itemHour >= 12 && itemHour <= 15;
    }) || items[Math.floor(items.length / 2)];
    
    // Calculate average humidity and wind speed
    const humidity = items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length;
    const windSpeed = items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length;
    
    return {
      date,
      dayName,
      icon: middayItem.weather[0].icon,
      description: middayItem.weather[0].description,
      tempMax,
      tempMin,
      humidity,
      windSpeed
    };
  });
};

interface DayForecastProps {
  day: DayForecast;
  theme: 'light' | 'dark';
}

const DayForecast: React.FC<DayForecastProps> = ({ day, theme }) => {
  const WeatherIcon = getWeatherIcon(day.icon);
  
  return (
    <div className={`p-4 rounded-lg transition-transform hover:scale-[1.02] ${
      theme === 'light' ? 'bg-slate-100' : 'bg-slate-700'
    }`}>
      <div className="text-center">
        <p className="font-semibold">
          {day.date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
        
        <div className="my-4 flex justify-center">
          <WeatherIcon 
            size={48} 
            className={theme === 'light' ? 'text-blue-500' : 'text-blue-400'} 
          />
        </div>
        
        <p className="capitalize text-sm mb-2">{day.description}</p>
        
        <div className="flex justify-center items-center gap-2">
          <span className="text-lg font-bold">{Math.round(day.tempMax)}°</span>
          <span className="text-sm opacity-70">{Math.round(day.tempMin)}°</span>
        </div>
        
        <div className="mt-3 text-sm grid grid-cols-2 gap-1">
          <div className="text-right pr-1">Humidity:</div>
          <div className="text-left pl-1">{Math.round(day.humidity)}%</div>
          
          <div className="text-right pr-1">Wind:</div>
          <div className="text-left pl-1">{Math.round(day.windSpeed * 3.6)} km/h</div>
        </div>
      </div>
    </div>
  );
};

export default ForecastWeather;