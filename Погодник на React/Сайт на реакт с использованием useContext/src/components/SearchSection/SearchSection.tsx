import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { russianCities } from '../../utils/weatherUtils'
import './SearchSection.css';

interface SearchSectionProps {
  compact?: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({ compact = false }) => {
  const { city, setCity, loading, getWeather } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <div className={`search-section ${compact ? 'search-section--compact' : ''}`}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={compact ? "Введите город России..." : "Например: Москва, Санкт-Петербург..."}
            list="russianCities"
            className="search-input"
          />
          <datalist id="russianCities">
            {russianCities.map((cityName) => (
              <option key={cityName} value={cityName} />
            ))}
          </datalist>
          <button type="submit" disabled={loading} className="search-button">
            {loading ? '⏳ Поиск...' : '🔍 Найти'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchSection;