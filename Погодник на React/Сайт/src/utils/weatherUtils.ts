export const getWeatherIcon = (icon: string): string => {
  const iconMap: { [key: string]: string } = {
    'snow': '❄️',
    'rain': '🌧️',
    'fog': '🌫️',
    'wind': '💨',
    'cloudy': '☁️',
    'partly-cloudy-day': '⛅',
    'partly-cloudy-night': '☁️',
    'clear-day': '☀️',
    'clear-night': '🌙',
    'thunder-rain': '⛈️',
    'thunder-showers-day': '⛈️',
    'thunder-showers-night': '⛈️',
    'showers-day': '🌦️',
    'showers-night': '🌦️'
  };
  
  return iconMap[icon] || '🌈';
};

export const getTimeOfDay = (time: string): string => {
  const hour = parseInt(time.split(':')[0]);
  if (hour < 12) return 'Утро';
  if (hour < 18) return 'День';
  return 'Вечер';
};

export const formatDayName = (day: string): string => {
  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long' });
  const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('ru-RU', { weekday: 'long' });
  
  if (day === today) return 'Сегодня';
  if (day === tomorrow) return 'Завтра';
  
  return day.charAt(0).toUpperCase() + day.slice(1);
};

export const russianCities = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород',
  'Казань', 'Челябинск', 'Омск', 'Самара', 'Ростов-на-Дону', 'Уфа', 'Красноярск',
  'Воронеж', 'Пермь', 'Волгоград', 'Краснодар', 'Саратов', 'Тюмень', 'Тольятти',
  'Ижевск', 'Барнаул', 'Ульяновск', 'Иркутск', 'Хабаровск', 'Ярославль', 'Владивосток',
  'Махачкала', 'Томск', 'Оренбург', 'Кемерово', 'Новокузнецк', 'Рязань', 'Астрахань',
  'Пенза', 'Липецк', 'Киров', 'Чебоксары', 'Тула', 'Калининград', 'Брянск'
];