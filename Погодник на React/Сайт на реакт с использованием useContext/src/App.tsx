import React from 'react';
import './App.css';
import { WeatherProvider } from './components/context/WeatherContext';
import WelcomeSection from './components/WelcomeSection/WelcomeSection';
import SearchSection from './components/SearchSection/SearchSection';
import TodayWeather from './components/TodayWeather/TodayWeather';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import { useWeather } from './components/context/WeatherContext';

const AppContent: React.FC = () => {
  const { weather, loading, error, dailyForecast } = useWeather();

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="title">🌤️ Погода в России</h1>
          <p className="subtitle">Узнайте актуальный прогноз погоды для любого города</p>
        </header>

        {weather.length === 0 && !loading && !error && <WelcomeSection />}

        {(weather.length > 0 || loading || error) && <SearchSection compact />}

        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Загружаем данные о погоде...</p>
          </div>
        )}

        {weather.length > 0 && <TodayWeather />}
        {dailyForecast.length > 0 && <WeeklyForecast />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
};

export default App;