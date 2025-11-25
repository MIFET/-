export interface WeatherData {
  date: string;
  time: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface DailyForecast {
  date: string;
  day: string;
  maxTemp: number;
  minTemp: number;
  description: string;
  icon: string;
}