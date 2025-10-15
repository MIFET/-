<?php
// Конфигурация
$apiKey = "79d0f2dd941f92ec93d232d8e382664c";

// Список ID крупных городов России с русскими названиями
$russianCities = [
    'Москва' => 524901,
    'Санкт-Петербург' => 536203,
    'Новосибирск' => 1496747,
    'Екатеринбург' => 1486209,
    'Казань' => 551487,
    'Нижний Новгород' => 520555,
    'Челябинск' => 1508291,
    'Самара' => 499099,
    'Омск' => 1496153,
    'Ростов-на-Дону' => 501175,
    'Уфа' => 479561,
    'Красноярск' => 1502026,
    'Воронеж' => 472045,
    'Пермь' => 511196,
    'Волгоград' => 472757,
    'Краснодар' => 542420,
    'Саратов' => 498677,
    'Тюмень' => 1488754,
    'Тольятти' => 482283,
    'Ижевск' => 554840,
    'Барнаул' => 1510853,
    'Ульяновск' => 479123,
    'Иркутск' => 2023469,
    'Хабаровск' => 2022890,
    'Ярославль' => 468902,
    'Владивосток' => 2013348,
    'Махачкала' => 532288,
    'Томск' => 1489425,
    'Оренбург' => 515003,
    'Кемерово' => 1503901,
    'Новокузнецк' => 1496990,
    'Рязань' => 500096,
    'Астрахань' => 580497,
    'Набережные Челны' => 523750,
    'Пенза' => 511565,
    'Липецк' => 535121,
    'Киров' => 548408,
    'Чебоксары' => 569696,
    'Тула' => 480562,
    'Калининград' => 554234,
    'Балашиха' => 579464,
    'Курск' => 538560,
    'Ставрополь' => 487846,
    'Улан-Удэ' => 2014407,
    'Тверь' => 480060,
    'Магнитогорск' => 532288,
    'Сочи' => 491422,
    'Иваново' => 555312,
    'Брянск' => 571476,
    'Белгород' => 578072,
    'Сургут' => 1490624
];

// Настройки кеширования (10 минут)
$cacheDir = __DIR__ . '/cache/';
$cacheTime = 10 * 60; // 10 минут в секундах

// Создаем директорию для кеша, если её нет
if (!file_exists($cacheDir)) {
    mkdir($cacheDir, 0755, true);
}

// Функция получения погоды с кешированием
function getWeatherWithCache($cityId, $cityName, $apiKey, $cacheDir, $cacheTime) {
    $cacheFile = $cacheDir . 'weather_' . $cityId . '.json';
    
    // Проверяем кеш
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTime) {
        $cachedData = json_decode(file_get_contents($cacheFile), true);
        return $cachedData;
    }
    
    // Если кеш устарел или отсутствует, делаем запрос к API
    $apiUrl = "http://api.openweathermap.org/data/2.5/weather?id=" . $cityId . "&lang=ru&units=metric&APPID=" . $apiKey;
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_USERAGENT => 'Weather App'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $weatherData = json_decode($response, true);
        $weatherData['city_name'] = $cityName; // Добавляем название города
        $weatherData['last_update'] = time(); // Добавляем время обновления
        
        // Сохраняем в кеш
        file_put_contents($cacheFile, json_encode($weatherData));
        
        return $weatherData;
    }
    
    return null;
}

// Получаем погоду для всех городов
$weatherData = [];
foreach ($russianCities as $cityName => $cityId) {
    $data = getWeatherWithCache($cityId, $cityName, $apiKey, $cacheDir, $cacheTime);
    if ($data) {
        $weatherData[$cityName] = $data;
    }
}

// Сортируем города по названию на русском
ksort($weatherData);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Погода в городах России</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .weather-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .weather-card {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .weather-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 35px rgba(0,0,0,0.15);
        }
        
        .weather-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #74b9ff, #0984e3);
        }
        
        .city-name {
            font-size: 1.4em;
            font-weight: bold;
            color: #2d3436;
            margin-bottom: 10px;
        }
        
        .weather-main {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .temperature {
            font-size: 2.5em;
            font-weight: bold;
            color: #0984e3;
            margin-right: 15px;
        }
        
        .weather-icon {
            width: 60px;
            height: 60px;
            margin-right: 15px;
        }
        
        .weather-description {
            font-size: 1.1em;
            color: #636e72;
            text-transform: capitalize;
        }
        
        .weather-details {
            border-top: 1px solid #dfe6e9;
            padding-top: 15px;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.9em;
        }
        
        .detail-label {
            color: #636e72;
        }
        
        .detail-value {
            color: #2d3436;
            font-weight: 500;
        }
        
        .feels-like {
            color: #e17055;
            font-weight: 500;
        }
        
        .min-max {
            display: flex;
            gap: 10px;
            font-size: 0.9em;
        }
        
        .min-temp {
            color: #74b9ff;
        }
        
        .max-temp {
            color: #e17055;
        }
        
        .last-update {
            text-align: center;
            color: white;
            font-size: 0.9em;
            opacity: 0.8;
            margin-top: 20px;
        }
        
        .loading {
            text-align: center;
            color: white;
            font-size: 1.2em;
            padding: 40px;
        }
        
        .error {
            background: #e74c3c;
            color: white;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin: 10px 0;
        }

        /* Анимация появления */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease forwards;
        }
        
        @media (max-width: 768px) {
            .weather-grid {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌤️ Погода в городах России</h1>
            <p>Актуальная информация о погоде в крупнейших городах страны</p>
        </div>
        
        <div class="weather-grid">
            <?php if (!empty($weatherData)): ?>
                <?php foreach ($weatherData as $cityName => $data): ?>
                    <div class="weather-card fade-in">
                        <div class="city-name"><?php echo htmlspecialchars($cityName); ?></div>
                        
                        <div class="weather-main">
                            <div class="temperature"><?php echo round($data['main']['temp']); ?>°C</div>
                            <?php if (isset($data['weather'][0]['icon'])): ?>
                                <img class="weather-icon" 
                                     src="http://openweathermap.org/img/wn/<?php echo $data['weather'][0]['icon']; ?>@2x.png" 
                                     alt="<?php echo $data['weather'][0]['description']; ?>">
                            <?php endif; ?>
                            <div class="weather-description">
                                <?php echo $data['weather'][0]['description']; ?>
                            </div>
                        </div>
                        
                        <div class="weather-details">
                            <div class="detail-row">
                                <span class="detail-label">Ощущается как:</span>
                                <span class="detail-value feels-like"><?php echo round($data['main']['feels_like']); ?>°C</span>
                            </div>
                            
                            <div class="detail-row">
                                <span class="detail-label">Диапазон:</span>
                                <span class="min-max">
                                    <span class="min-temp"><?php echo round($data['main']['temp_min']); ?>°C</span>
                                    <span>-</span>
                                    <span class="max-temp"><?php echo round($data['main']['temp_max']); ?>°C</span>
                                </span>
                            </div>
                            
                            <div class="detail-row">
                                <span class="detail-label">💧 Влажность:</span>
                                <span class="detail-value"><?php echo $data['main']['humidity']; ?>%</span>
                            </div>
                            
                            <div class="detail-row">
                                <span class="detail-label">💨 Ветер:</span>
                                <span class="detail-value"><?php echo round($data['wind']['speed']); ?> м/с</span>
                            </div>
                            
                            <div class="detail-row">
                                <span class="detail-label">📊 Давление:</span>
                                <span class="detail-value"><?php echo $data['main']['pressure']; ?> гПа</span>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <div class="loading">
                    <p>Загрузка данных о погоде...</p>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="last-update">
            <p>Данные обновляются каждые 10 минут</p>
        </div>
    </div>
    
    <script>
        // Автоматическое обновление каждые 10 минут
        setTimeout(function() {
            window.location.reload();
        }, 600000); // 10 минут
        
        // Добавляем анимацию появления карточек
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.weather-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = (index * 0.1) + 's';
                card.classList.add('fade-in');
            });
        });
    </script>
</body>
</html>