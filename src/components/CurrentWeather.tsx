import React from 'react';
import { 
  Thermometer, Droplets, Wind, Compass, 
  Sunrise, Sunset, Eye, MapPin
} from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherUtils';

interface CurrentWeatherProps {
  data: any; // Using any for simplicity, would use proper typing in a production app
  theme: 'light' | 'dark';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, theme }) => {
  // Convert Unix timestamps to readable time
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const WeatherIcon = getWeatherIcon(data.weather[0].icon);
  
  return (
    <div className={`mb-8 rounded-lg shadow-lg overflow-hidden ${
      theme === 'light' ? 'bg-white' : 'bg-slate-800'
    }`}>
      {/* Header with location and current time */}
      <div className={`p-6 ${
        theme === 'light' ? 'bg-blue-500 text-white' : 'bg-blue-700 text-white'
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <MapPin size={20} className="mr-2" />
              {data.name}, {data.sys.country}
            </h2>
            <p className="text-sm opacity-90 mt-1">
              {new Date().toLocaleDateString([], { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Updated just now</p>
          </div>
        </div>
      </div>

      {/* Main weather display */}
      <div className="p-6">
        <div className="flex flex-wrap md:flex-nowrap items-center gap-6">
          {/* Temperature and main weather */}
          <div className="flex items-center gap-4">
            <WeatherIcon size={80} className={
              theme === 'light' ? 'text-blue-500' : 'text-blue-400'
            } />
            <div>
              <div className="text-4xl font-bold">
                {Math.round(data.main.temp)}°C
              </div>
              <div className="capitalize font-medium">
                {data.weather[0].description}
              </div>
              <div className="text-sm mt-1">
                Feels like {Math.round(data.main.feels_like)}°C
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 md:mt-0 md:ml-auto">
            <DetailItem 
              icon={<Thermometer size={18} />}
              label="High/Low"
              value={`${Math.round(data.main.temp_max)}°/${Math.round(data.main.temp_min)}°`}
              theme={theme}
            />
            <DetailItem 
              icon={<Droplets size={18} />}
              label="Humidity"
              value={`${data.main.humidity}%`}
              theme={theme}
            />
            <DetailItem 
              icon={<Wind size={18} />}
              label="Wind"
              value={`${Math.round(data.wind.speed * 3.6)} km/h`} // Convert m/s to km/h
              theme={theme}
            />
            <DetailItem 
              icon={<Compass size={18} />}
              label="Direction"
              value={`${data.wind.deg}°`}
              theme={theme}
            />
            <DetailItem 
              icon={<Sunrise size={18} />}
              label="Sunrise"
              value={formatTime(data.sys.sunrise)}
              theme={theme}
            />
            <DetailItem 
              icon={<Sunset size={18} />}
              label="Sunset"
              value={formatTime(data.sys.sunset)}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  theme: 'light' | 'dark';
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value, theme }) => {
  return (
    <div className={`p-3 rounded-lg ${
      theme === 'light' ? 'bg-slate-100' : 'bg-slate-700'
    }`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={theme === 'light' ? 'text-blue-600' : 'text-blue-400'}>
          {icon}
        </span>
        <span className="text-sm opacity-80">{label}</span>
      </div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
};

export default CurrentWeather;