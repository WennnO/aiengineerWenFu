import React from 'react';
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, CloudSun as SunCloud, Moon, CloudMoon } from 'lucide-react';

// A mapping from OpenWeatherMap icon codes to Lucide React icons
export const getWeatherIcon = (iconCode: string): React.FC<any> => {
  const isDayTime = !iconCode.includes('n');
  
  switch (iconCode.slice(0, 2)) {
    case '01': // Clear sky
      return isDayTime ? Sun : Moon;
    case '02': // Few clouds
      return isDayTime ? SunCloud : CloudMoon;
    case '03': // Scattered clouds
    case '04': // Broken clouds / overcast
      return Cloud;
    case '09': // Shower rain
      return CloudDrizzle;
    case '10': // Rain
      return CloudRain;
    case '11': // Thunderstorm
      return CloudLightning;
    case '13': // Snow
      return CloudSnow;
    case '50': // Mist / fog / haze
      return CloudFog;
    default:
      return Cloud;
  }
};

// Function to get a color based on temperature
export const getTempColor = (temp: number): string => {
  if (temp <= 0) return 'text-blue-500';
  if (temp <= 10) return 'text-blue-400';
  if (temp <= 20) return 'text-green-500';
  if (temp <= 30) return 'text-yellow-500';
  return 'text-red-500';
};