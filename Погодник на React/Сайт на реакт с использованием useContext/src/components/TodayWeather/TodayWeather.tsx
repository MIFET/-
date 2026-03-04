import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { getTimeOfDay } from '../../utils/weatherUtils'
import './TodayWeather.css';

const TodayWeather: React.FC = () => {
  const { currentCity, weather } = useWeather();

  return (
    <div className="weather-section">
      <h2 className="section-title">
        Погода в {currentCity} сегодня
        <span className="current-date">
          {new Date().toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </h2>
      <div className="today-weather">
        {weather.map((item, index) => (
          <div key={index} className="weather-card">
            <h3>{getTimeOfDay(item.time)}</h3>
            <div className="time-badge">{item.time}</div>
            <div className="weather-icon">
              <span className="icon">{item.icon}</span>
            </div>
            <div className="temperature">{item.temperature}°C</div>
            <div className="description">{item.description}</div>
            <div className="details">
              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <span>{item.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <span>{item.windSpeed} м/с</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayWeather;