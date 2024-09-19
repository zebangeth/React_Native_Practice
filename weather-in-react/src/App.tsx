import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherSearch from './components/WeatherSearch';
import CurrentWeather from './components/CurrentWeather';
import FavoritesManager from './components/FavoritesManager';
import UnitToggle from './components/UnitToggle';
import WeatherDetails from './components/WeatherDetails';
import ForecastList from './components/Forecast';
import { getWeatherData } from './api/weatherApi';

const App: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isMetric, setIsMetric] = useState<boolean>(false);

  useEffect(() => {
    if (zipCode) {
      fetchWeatherData();
    }
  }, [zipCode]);

  const fetchWeatherData = async () => {
    try {
      const data = await getWeatherData(zipCode);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleSearch = (newZipCode: string) => {
    setZipCode(newZipCode);
  };

  const toggleUnit = () => {
    setIsMetric(!isMetric);
  };

  const handleSelectFavorite = (selectedZipCode: string) => {
    setZipCode(selectedZipCode);
  };

  return (
    <div className="App">
      <Header />
      <WeatherSearch onSearch={handleSearch} />
      {weatherData && (
        <>
          <CurrentWeather 
            data={weatherData.current} 
            location={weatherData.location}
            isMetric={isMetric} 
          />
          <FavoritesManager
            currentZipCode={zipCode}
            currentLocation={`${weatherData.location.name}, ${weatherData.location.region}`}
            onSelectFavorite={handleSelectFavorite}
          />
          <UnitToggle isMetric={isMetric} onToggle={toggleUnit} />
          <WeatherDetails data={weatherData} isMetric={isMetric} />
          <ForecastList forecast={weatherData.forecast.forecastday} isMetric={isMetric} />
        </>
      )}
    </div>
  );
};

export default App;
