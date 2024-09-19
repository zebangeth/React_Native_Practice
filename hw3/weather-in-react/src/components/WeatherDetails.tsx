import React from 'react';

interface WeatherDetailsProps {
  data: any;
  isMetric: boolean;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data, isMetric }) => {
  if (!data) {
    return (
      <div className="weather-details">
        <div className="sunrise-sunset">
          <p>Sunrise: -</p>
          <p>Sunset: -</p>
        </div>
        <div className="wind-info">
          <p>Wind</p>
          <p>-</p>
          <p>-</p>
        </div>
      </div>
    );
  }

  const windSpeed = isMetric ? data.current.wind_kph : data.current.wind_mph;
  const windUnit = isMetric ? 'KPH' : 'MPH';

  return (
    <div className="weather-details">
      <div className="sunrise-sunset">
        <p>Sunrise: {data.forecast.forecastday[0].astro.sunrise}</p>
        <p>Sunset: {data.forecast.forecastday[0].astro.sunset}</p>
      </div>
      <div className="wind-info">
        <p>Wind</p>
        <p>{windSpeed} {windUnit}</p>
        <p>{data.current.wind_dir}</p>
      </div>
    </div>
  );
};

export default WeatherDetails;
