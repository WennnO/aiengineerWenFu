import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import { Cloud, CloudDrizzle, MapPin } from 'lucide-react';

interface WeatherContainerProps {
  theme: 'light' | 'dark';
}

const API_KEY = 'edc228562ac0a8aa3116d41c0687cf56'; // Free OpenWeatherMap API key

const WeatherContainer: React.FC<WeatherContainerProps> = ({ theme }) => {
  const [location, setLocation] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchWeatherData = async (searchLocation: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${API_KEY}&units=metric`
      );
      
      if (!currentResponse.ok) {
        throw new Error(`Location not found. Please try a different search term.`);
      }
      
      const currentData = await currentResponse.json();
      setCurrentWeather(currentData);
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchLocation}&appid=${API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Error fetching forecast data.');
      }
      
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      setError('Please enter a location.');
      return;
    }
    
    setLocation(searchTerm);
    fetchWeatherData(searchTerm);
  };
  
  const handleGetCurrentLocation = () => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Get location name from coordinates
            const geoResponse = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            );
            
            if (!geoResponse.ok) {
              throw new Error('Error determining your location.');
            }
            
            const geoData = await geoResponse.json();
            if (geoData.length > 0) {
              const locationName = geoData[0].name;
              setLocation(locationName);
              fetchWeatherData(locationName);
            } else {
              throw new Error('Could not determine your location.');
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
            setLoading(false);
          }
        },
        (err) => {
          setError(`Geolocation error: ${err.message}`);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };
  
  return (
    <div className={`mt-8 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
      <SearchBar 
        onSearch={handleSearch} 
        onGetCurrentLocation={handleGetCurrentLocation}
        theme={theme}
      />
      
      {error && <ErrorMessage message={error} theme={theme} />}
      
      {loading && <LoadingSpinner theme={theme} />}
      
      {!loading && !error && !currentWeather && (
        <div className={`text-center p-10 rounded-lg ${
          theme === 'light' ? 'bg-white/80 shadow-md' : 'bg-slate-800/90 shadow-xl'
        }`}>
          <div className="flex flex-col items-center justify-center gap-4">
            {theme === 'light' ? (
              <Cloud size={64} className="text-blue-500" />
            ) : (
              <CloudDrizzle size={64} className="text-blue-400" />
            )}
            <h2 className="text-xl font-semibold">Weather Forecast</h2>
            <p>Enter a location to get the current weather and forecast</p>
            <p className="flex items-center gap-2 text-sm mt-2">
              <MapPin size={16} />
              Or use your current location
            </p>
          </div>
        </div>
      )}
      
      {!loading && currentWeather && (
        <>
          <CurrentWeather data={currentWeather} theme={theme} />
          {forecast && <ForecastWeather data={forecast} theme={theme} />}
        </>
      )}
    </div>
  );
};

export default WeatherContainer;