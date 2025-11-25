import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Components
import WelcomeSection from './components/WelcomeSection/WelcomeSection';
import SearchSection from './components/SearchSection/SearchSection';
import TodayWeather from './components/TodayWeather/TodayWeather';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';

// Types & Utils
import { WeatherData, DailyForecast } from './types/weather';
import { processWeatherData } from './utils/weatherAPI';

const App: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentCity, setCurrentCity] = useState<string>('');

  const API_KEY = '5XSJTWM5R3264UYDKFVZNM6XZ';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="title">🌤️ Погода в России</h1>
          <p className="subtitle">Узнайте актуальный прогноз погоды для любого города</p>
        </header>

        {weather.length === 0 && !loading && !error && (
          <WelcomeSection
            city={city}
            setCity={setCity}
            loading={loading}
            onSubmit={handleSubmit}
          />
        )}

        {(weather.length > 0 || loading || error) && (
          <SearchSection
            city={city}
            setCity={setCity}
            loading={loading}
            onSubmit={handleSubmit}
            compact={true}
          />
        )}

        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Загружаем данные о погоде...</p>
          </div>
        )}

        {weather.length > 0 && (
          <TodayWeather currentCity={currentCity} weather={weather} />
        )}

        {dailyForecast.length > 0 && (
          <WeeklyForecast dailyForecast={dailyForecast} />
        )}
      </div>
    </div>
  );
};

export default App;