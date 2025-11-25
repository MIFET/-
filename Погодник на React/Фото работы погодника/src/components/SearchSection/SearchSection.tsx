import React from 'react';
import { russianCities } from '../../utils/weatherUtils';
import './SearchSection.css';

interface SearchSectionProps {
  city: string;
  setCity: (city: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  compact?: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({ 
  city, 
  setCity, 
  loading, 
  onSubmit,
  compact = false 
}) => {
  return (
    <div className={`search-section ${compact ? 'search-section--compact' : ''}`}>
      <form onSubmit={onSubmit} className="search-form">
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