import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import './WelcomeSection.css';

interface WelcomeSectionProps {
  city: string;
  setCity: (city: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ city, setCity, loading, onSubmit }) => {
  return (
    <div className="welcome-section">
      <div className="welcome-card">
        <h2>Добро пожаловать!</h2>
        <p className="welcome-text">Введите название города России, чтобы узнать погоду</p>
        
        <SearchSection 
          city={city}
          setCity={setCity}
          loading={loading}
          onSubmit={onSubmit}
        />

        <div className="features">
          <div className="feature-item">
            <span className="feature-icon">⏰</span>
            <span>Погода на текущий день</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📅</span>
            <span>Прогноз на 7 дней</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;