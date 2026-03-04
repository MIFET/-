import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import './WelcomeSection.css';

const WelcomeSection: React.FC = () => {
  return (
    <div className="welcome-section">
      <div className="welcome-card">
        <h2>Добро пожаловать!</h2>
        <p className="welcome-text">Введите название города России, чтобы узнать погоду</p>
        
        <SearchSection />

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