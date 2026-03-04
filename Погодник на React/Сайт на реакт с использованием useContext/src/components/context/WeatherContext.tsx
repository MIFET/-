import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WeatherData, DailyForecast } from '../../types/weather'
import { processWeatherData } from '../../utils/weatherAPI'
import axios from 'axios';

const API_KEY = '5XSJTWM5R3264UYDKFVZNM6XZ';

// Тип для значения контекста
interface WeatherContextValue {
  city: string;
  setCity: (city: string) => void;
  weather: WeatherData[];
  dailyForecast: DailyForecast[];
  loading: boolean;
  error: string;
  currentCity: string;
  getWeather: (cityName: string) => Promise<void>;
}

// Создаём контекст
const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

// Провайдер контекста
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentCity, setCurrentCity] = useState<string>('');

  const getWeather = async (cityName: string) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(cityName)}?unitGroup=metric&key=${API_KEY}&contentType=json&lang=ru`
      );

      const { todayData, forecastData } = processWeatherData(response.data, cityName);
      setWeather(todayData);
      setDailyForecast(forecastData);
      setCurrentCity(cityName);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError('Город не найден. Проверьте правильность написания.');
      } else {
        setError('Ошибка при получении данных о погоде');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const value: WeatherContextValue = {
    city,
    setCity,
    weather,
    dailyForecast,
    loading,
    error,
    currentCity,
    getWeather,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

// Хук для удобного использования контекста
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};