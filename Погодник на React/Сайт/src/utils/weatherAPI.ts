import { WeatherData, DailyForecast } from '../types/weather';
import { getWeatherIcon } from './weatherUtils';

export const processWeatherData = (data: any, cityName: string) => {
  const todayData: WeatherData[] = [];
  const forecastData: DailyForecast[] = [];

  // Обрабатываем сегодняшнюю погоду
  const today = data.days[0];
  const targetHours = [9, 12, 15, 18, 21];

  if (today.hours) {
    targetHours.forEach(hour => {
      const hourData = today.hours[hour];
      if (hourData) {
        todayData.push({
          date: new Date(today.datetime).toLocaleDateString('ru-RU'),
          time: `${hour}:00`,
          temperature: Math.round(hourData.temp),
          description: hourData.conditions,
          icon: getWeatherIcon(hourData.icon),
          humidity: Math.round(hourData.humidity),
          windSpeed: hourData.windspeed
        });
      }
    });
  }

  // Обрабатываем прогноз на неделю
  data.days.forEach((day: any, index: number) => {
    if (index < 7) {
      const date = new Date(day.datetime);
      forecastData.push({
        date: date.toLocaleDateString('ru-RU'),
        day: date.toLocaleDateString('ru-RU', { weekday: 'long' }),
        maxTemp: Math.round(day.tempmax),
        minTemp: Math.round(day.tempmin),
        description: day.conditions,
        icon: getWeatherIcon(day.icon)
      });
    }
  });

  return { todayData, forecastData };
};