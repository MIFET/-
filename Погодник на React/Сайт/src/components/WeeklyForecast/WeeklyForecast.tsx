import React from 'react';
import { DailyForecast } from '../../types/weather';
import { formatDayName } from '../../utils/weatherUtils';
import './WeeklyForecast.css';

interface WeeklyForecastProps {
  dailyForecast: DailyForecast[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ dailyForecast }) => {
  return (
    <div className="forecast-section">
      <h2 className="section-title">Прогноз на неделю</h2>
      <div className="weekly-forecast">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="day-header">
              <div className="day">{formatDayName(day.day)}</div>
              <div className="date">{day.date}</div>
            </div>
            <div className="weather-icon">
              <span className="icon">{day.icon}</span>
            </div>
            <div className="temp-range">
              <span className="max-temp">{day.maxTemp}°</span>
              <span className="min-temp">{day.minTemp}°</span>
            </div>
            <div className="description">{day.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;